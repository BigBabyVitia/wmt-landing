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

/* ── Управляемый requestAnimationFrame: сами продвигаем кадры на нужный timestamp ── */
function makeRaf() {
  let cbs = new Map<number, FrameRequestCallback>()
  let nextId = 1
  const host = {
    requestAnimationFrame: (cb: FrameRequestCallback) => { const id = nextId++; cbs.set(id, cb); return id },
    cancelAnimationFrame: (id: number) => { cbs.delete(id) },
  }
  const frame = (t: number) => {
    const current = [...cbs.values()]
    cbs = new Map()
    current.forEach((cb) => cb(t))
  }
  return { host, frame, pending: () => cbs.size }
}

function makeManualApp() {
  return {
    play: vi.fn(),
    stop: vi.fn(),
    requestRender: vi.fn(),
    renderMode: 'auto' as 'auto' | 'manual' | 'continuous',
  }
}

function setup(opts: { visibility?: DocumentVisibilityState; manual?: boolean; fps?: number } = {}) {
  const { visibility = 'visible', manual = true, fps = 30 } = opts
  FakeIntersectionObserver.instances = []
  const raf = makeRaf()
  const doc = makeDoc(visibility)
  const app = makeManualApp()
  if (!manual) delete (app as Partial<typeof app>).requestRender // → путь-фолбэк play()/stop()
  const el = {} as Element
  const cleanup = createRenderActivityController(el, app, {
    IO, doc: doc as unknown as Document, win: raf.host, fps,
  })
  const io = FakeIntersectionObserver.instances[0]
  return { app, doc, io, raf, cleanup }
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

describe('createRenderActivityController — FPS-кэп по видимости', () => {
  it('переводит сцену в manual-режим при старте', () => {
    const { app } = setup()
    expect(app.renderMode).toBe('manual')
  })

  it('гонит кадры не чаще заданного fps, пока робот на экране и вкладка видима', () => {
    const { app, raf } = setup({ fps: 30 }) // интервал ≈33.3 мс
    raf.frame(0)   // первый кадр — рисуем сразу
    raf.frame(10)  // <33 мс — пропускаем
    raf.frame(20)  // <33 мс — пропускаем
    raf.frame(40)  // ≥33 мс — рисуем
    expect(app.requestRender).toHaveBeenCalledTimes(2)
  })

  it('полностью прекращает рендер, когда робот ушёл за экран, и возобновляет при возврате', () => {
    const { app, io, raf } = setup()
    raf.frame(0)
    expect(app.requestRender).toHaveBeenCalledTimes(1)

    io.emit(false) // проскроллили мимо hero
    expect(raf.pending()).toBe(0) // цикл отменён — GPU простаивает
    raf.frame(100)
    raf.frame(200)
    expect(app.requestRender).toHaveBeenCalledTimes(1) // ни одного нового кадра

    io.emit(true) // вернулись к hero
    raf.frame(300)
    expect(app.requestRender).toHaveBeenCalledTimes(2) // сразу первый кадр после возврата
  })

  it('прекращает рендер, когда вкладка скрыта/свёрнута, и возобновляет при возврате', () => {
    const { app, doc, raf } = setup()
    raf.frame(0)
    expect(app.requestRender).toHaveBeenCalledTimes(1)

    doc.visibilityState = 'hidden'
    doc.fire('visibilitychange')
    expect(raf.pending()).toBe(0)
    raf.frame(100)
    expect(app.requestRender).toHaveBeenCalledTimes(1)

    doc.visibilityState = 'visible'
    doc.fire('visibilitychange')
    raf.frame(200)
    expect(app.requestRender).toHaveBeenCalledTimes(2)
  })

  it('не рендерит, если сцена догрузилась в фоновой (скрытой) вкладке', () => {
    const { app, raf } = setup({ visibility: 'hidden' })
    expect(raf.pending()).toBe(0)
    raf.frame(0)
    expect(app.requestRender).not.toHaveBeenCalled()
  })

  it('cleanup: отменяет цикл, отключает observer, снимает слушатель и возвращает renderMode', () => {
    const { app, io, doc, raf, cleanup } = setup()
    raf.frame(0)
    expect(doc.listenerCount('visibilitychange')).toBe(1)

    cleanup()
    expect(io.disconnected).toBe(true)
    expect(doc.listenerCount('visibilitychange')).toBe(0)
    expect(raf.pending()).toBe(0)
    expect(app.renderMode).toBe('auto') // восстановлен исходный режим
    raf.frame(100)
    expect(app.requestRender).toHaveBeenCalledTimes(1) // после cleanup новых кадров нет
  })

  it('фолбэк без manual-рендера: play() на экране, stop() вне экрана', () => {
    const { app, io } = setup({ manual: false })
    expect(app.renderMode).toBe('auto') // manual не трогаем
    expect(app.play).toHaveBeenCalledTimes(1) // исходно на экране → play

    io.emit(false)
    expect(app.stop).toHaveBeenCalledTimes(1)
    io.emit(true)
    expect(app.play).toHaveBeenCalledTimes(2)
  })
})
