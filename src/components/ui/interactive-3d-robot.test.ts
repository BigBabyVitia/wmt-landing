import { describe, it, expect, vi, afterEach } from 'vitest'
import { shouldLoad3D, createRenderActivityController } from './interactive-3d-robot'

/* ── Управляемый фейк IntersectionObserver: сами дёргаем колбэк (isIntersecting) ── */
class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = []
  callback: IntersectionObserverCallback
  observed: Element[] = []
  disconnected = false
  root: Element | null = null
  rootMargin = ''
  thresholds: ReadonlyArray<number> = []
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
    FakeIntersectionObserver.instances.push(this)
  }
  observe(el: Element) { this.observed.push(el) }
  unobserve() {}
  disconnect() { this.disconnected = true }
  takeRecords(): IntersectionObserverEntry[] { return [] }
  emit(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }
}
const IO = FakeIntersectionObserver as unknown as typeof IntersectionObserver

/* ── Минимальный фейк Document ── */
function makeDoc(visibility: DocumentVisibilityState = 'visible') {
  const listeners = new Map<string, Set<() => void>>()
  return {
    visibilityState: visibility,
    addEventListener(type: string, cb: () => void) {
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type)!.add(cb)
    },
    removeEventListener(type: string, cb: () => void) { listeners.get(type)?.delete(cb) },
    fire(type: string) { listeners.get(type)?.forEach((cb) => cb()) },
    listenerCount(type: string) { return listeners.get(type)?.size ?? 0 },
  }
}

/* ── Управляемый rAF-хост + слушатели pointermove: сами продвигаем кадры и события ── */
function makeWin() {
  let cbs = new Map<number, FrameRequestCallback>()
  let nextId = 1
  const listeners = new Map<string, Set<() => void>>()
  return {
    requestAnimationFrame: (cb: FrameRequestCallback) => { const id = nextId++; cbs.set(id, cb); return id },
    cancelAnimationFrame: (id: number) => { cbs.delete(id) },
    addEventListener: (type: string, cb: () => void) => {
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type)!.add(cb)
    },
    removeEventListener: (type: string, cb: () => void) => { listeners.get(type)?.delete(cb) },
    // тестовые хелперы
    frame: (t = 0) => { const cur = [...cbs.values()]; cbs = new Map(); cur.forEach((cb) => cb(t)) },
    flush: (n: number) => { for (let i = 0; i < n; i++) { const cur = [...cbs.values()]; cbs = new Map(); cur.forEach((cb) => cb(i)) } },
    dispatch: (type: string) => { listeners.get(type)?.forEach((cb) => cb()) },
    listenerCount: (type: string) => listeners.get(type)?.size ?? 0,
    pending: () => cbs.size,
  }
}

function makeManualApp() {
  return {
    play: vi.fn(),
    stop: vi.fn(),
    requestRender: vi.fn(),
    renderMode: 'auto' as 'auto' | 'manual' | 'continuous',
  }
}

const SETTLE = 3 // маленький «досвет» для детерминированных тестов

function setup(opts: { visibility?: DocumentVisibilityState; manual?: boolean } = {}) {
  const { visibility = 'visible', manual = true } = opts
  FakeIntersectionObserver.instances = []
  const win = makeWin()
  const doc = makeDoc(visibility)
  const app = makeManualApp()
  if (!manual) delete (app as Partial<typeof app>).requestRender // → путь-фолбэк play()/stop()
  const el = {} as Element
  const cleanup = createRenderActivityController(el, app, {
    IO, doc: doc as unknown as Document, win, settleFrames: SETTLE,
  })
  const io = FakeIntersectionObserver.instances[0]
  return { app, doc, io, win, cleanup }
}

describe('shouldLoad3D — гейтинг тяжёлой 3D-сцены', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('грузит 3D на нормальном устройстве', () => {
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    expect(shouldLoad3D()).toBe(true)
  })
  it('НЕ грузит 3D в режиме экономии трафика (saveData)', () => {
    vi.stubGlobal('navigator', { connection: { saveData: true } })
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    expect(shouldLoad3D()).toBe(false)
  })
  it('НЕ грузит 3D на слабом ОЗУ (<4 ГБ)', () => {
    vi.stubGlobal('navigator', { deviceMemory: 2 })
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    expect(shouldLoad3D()).toBe(false)
  })
  it('уважает prefers-reduced-motion', () => {
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduced-motion') }))
    expect(shouldLoad3D()).toBe(false)
  })
})

describe('createRenderActivityController — рендер по требованию', () => {
  it('переводит сцену в manual-режим при старте', () => {
    const { app } = setup()
    expect(app.renderMode).toBe('manual')
  })

  it('на активации рисует короткий «досвет» и ЗАМИРАЕТ (не крутит рендер постоянно)', () => {
    const { app, win } = setup()
    win.flush(SETTLE)               // досвет позы: ровно SETTLE кадров
    expect(app.requestRender).toHaveBeenCalledTimes(SETTLE)
    expect(win.pending()).toBe(0)   // цикл остановлен → 0% GPU в покое
    win.flush(5)                    // время идёт — новых кадров нет
    expect(app.requestRender).toHaveBeenCalledTimes(SETTLE)
  })

  it('движение курсора будит рендер, потом снова замирает', () => {
    const { app, win } = setup()
    win.flush(SETTLE)                              // отыграли стартовый досвет
    app.requestRender.mockClear()

    win.dispatch('pointermove')                    // курсор двинулся
    expect(win.pending()).toBe(1)                  // рендер проснулся
    win.flush(SETTLE)
    expect(app.requestRender).toHaveBeenCalledTimes(SETTLE)
    expect(win.pending()).toBe(0)                  // снова замер
  })

  it('вне экрана — снимает слушатель курсора и НЕ рисует на движение', () => {
    const { app, win, io } = setup()
    win.flush(SETTLE)
    app.requestRender.mockClear()

    io.emit(false)                                 // hero уехал за экран
    expect(win.listenerCount('pointermove')).toBe(0)
    win.dispatch('pointermove')                    // событие уже некому ловить
    win.flush(SETTLE)
    expect(app.requestRender).not.toHaveBeenCalled()
  })

  it('скрытая вкладка — то же (рендер не будится)', () => {
    const { app, win, doc } = setup()
    win.flush(SETTLE)
    app.requestRender.mockClear()

    doc.visibilityState = 'hidden'
    doc.fire('visibilitychange')
    expect(win.listenerCount('pointermove')).toBe(0)
    win.dispatch('pointermove')
    win.flush(SETTLE)
    expect(app.requestRender).not.toHaveBeenCalled()
  })

  it('возврат на экран — снова ловит курсор и рисует', () => {
    const { app, win, io } = setup()
    win.flush(SETTLE)
    io.emit(false)
    app.requestRender.mockClear()

    io.emit(true)                                  // вернулись к hero
    expect(win.listenerCount('pointermove')).toBe(1)
    win.flush(SETTLE)
    expect(app.requestRender).toHaveBeenCalledTimes(SETTLE) // досвет позы при возврате
  })

  it('cleanup: снимает слушатели, гасит цикл и возвращает renderMode', () => {
    const { app, win, doc, io, cleanup } = setup()
    expect(doc.listenerCount('visibilitychange')).toBe(1)
    expect(win.listenerCount('pointermove')).toBe(1)

    cleanup()
    expect(io.disconnected).toBe(true)
    expect(doc.listenerCount('visibilitychange')).toBe(0)
    expect(win.listenerCount('pointermove')).toBe(0)
    expect(win.pending()).toBe(0)
    expect(app.renderMode).toBe('auto') // восстановлен исходный режим
  })

  it('фолбэк без manual-рендера: play() на экране, stop() вне экрана', () => {
    const { app, io } = setup({ manual: false })
    expect(app.renderMode).toBe('auto') // manual не трогаем
    expect(app.play).toHaveBeenCalledTimes(1)

    io.emit(false)
    expect(app.stop).toHaveBeenCalledTimes(1)
    io.emit(true)
    expect(app.play).toHaveBeenCalledTimes(2)
  })
})
