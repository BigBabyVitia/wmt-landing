import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// Наследуем react-plugin + alias `@` + dedupe three из основного vite-конфига,
// чтобы тесты резолвили модули так же, как прод-сборка.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      globals: false,
    },
  }),
)
