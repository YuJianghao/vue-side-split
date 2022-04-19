import { computed, inject, provide, ref, watch } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import { useAxisDrag } from './composeables'

export interface PartConfig {
  min: number
  max: number
  init: number
}

function createPart(config: Ref<PartConfig[]>) {
  const raw = ref<number[]>([])
  const tmp = ref<(number | undefined)[]>([])
  const width = computed(() => {
    return tmp.value.map((t, idx) => t ?? raw.value[idx])
  })
  watch(
    config,
    () => {
      raw.value = config.value.map(c => c.init)
      tmp.value = config.value.map(_ => undefined)
    },
    { deep: true, immediate: true },
  )
  return { raw, tmp, config, width }
}

export type PartKey = 'left' | 'right'
export type Part = ReturnType<typeof createPart>
export type SideSplitContext = ReturnType<typeof createSideSplitContext>
export const key: InjectionKey<SideSplitContext> = Symbol('side-split')
export const provideContext = (ctx: SideSplitContext) => provide(key, ctx)
export const useContext = () => inject(key)!

export function createSideSplitContext() {
  const partMap = new Map<PartKey, Part>()

  function definePart(config: Ref<PartConfig[]>, key: PartKey) {
    const part = createPart(config)
    partMap.set(key, part)
    return part
  }

  const left = definePart(ref([]), 'left')
  const right = definePart(ref([]), 'right')

  const split = ref<{ idx: number; key: PartKey } | null>(null)
  const gap = ref<number>(10)
  const axis = ref<'x' | 'y'>('x')
  const vertical = ref(false)
  watch(vertical, (v) => {
    axis.value = v ? 'y' : 'x'
  })

  function getSign(key: PartKey) {
    switch (key) {
      case 'left':
        return 1
      case 'right':
        return -1
    }
  }

  const drag = useAxisDrag(axis, {
    onDrag(source, target) {
      if (!split.value)
        return
      const key = split.value.key
      const idx = split.value.idx
      const part = partMap.get(key)!
      const delta = (target - source) * getSign(key)
      function update(delta: number, idx: number) {
        if (idx < 0 || idx >= part.config.value.length)
          return
        const min = Math.max(
          part.config.value[idx].min,
          idx ? gap.value : gap.value / 2,
        )
        const max = part.config.value[idx].max
        const current = part.raw.value[idx]
        const next = current + delta
        if (next < min) {
          part.tmp.value[idx] = min
          update(next - min, idx - 1)
        }
        else if (next > max) {
          part.tmp.value[idx] = max
          update(next - max, idx - 1)
        }
        else {
          part.tmp.value[idx] = next
          update(0, idx - 1)
        }
      }
      update(delta, idx)
    },
    onDragEnd() {
      if (!split.value)
        return
      const part = partMap.get(split.value.key)!
      part.raw.value = part.tmp.value.map((v, idx) => v ?? part.raw.value[idx])
    },
  })

  const dragging = drag.dragging

  const startDrag = (idx: number, key: PartKey) => {
    split.value = { idx, key }
    drag.startDrag()
  }

  return {
    left, right, split, gap, vertical, dragging, startDrag,
  }
}