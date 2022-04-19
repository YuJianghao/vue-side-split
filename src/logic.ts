import { computed, inject, provide, ref, watch } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import { useAxisDrag } from './composeables'

export interface PartConfig {
  min: number
  max: number
  modelValue: number
  update: (value: number) => void
}

function createPart(config: Ref<PartConfig[]>) {
  const tmp = ref<(number | undefined)[]>([])
  const width = computed(() => {
    return tmp.value.map((t, idx) => t ?? config.value[idx].modelValue)
  })
  watch(
    config,
    () => {
      tmp.value = config.value.map(_ => undefined)
    },
    { deep: true, immediate: true },
  )
  function setTmp(idx: number, value: number | undefined) {
    tmp.value[idx] = value
  }
  function setValue(idx: number, value: number) {
    config.value[idx].modelValue = value
    config.value[idx].update(value)
  }
  function getValue(idx: number) {
    return config.value[idx].modelValue
  }
  function getTmp(idx: number) {
    return tmp.value[idx]
  }
  function flash() {
    tmp.value.forEach((v, idx) => {
      const value = v ?? getValue(idx)
      setValue(idx, value)
    })
  }
  return {
    config,
    width,
    getTmp,
    setTmp,
    setValue,
    getValue,
    flash,
  }
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
        const current = part.getValue(idx)
        const next = current + delta
        if (next < min) {
          part.setTmp(idx, min)
          update(next - min, idx - 1)
        }
        else if (next > max) {
          part.setTmp(idx, max)
          update(next - max, idx - 1)
        }
        else {
          part.setTmp(idx, next)
          update(0, idx - 1)
        }
      }
      update(delta, idx)
    },
    onDragEnd() {
      if (!split.value)
        return
      const part = partMap.get(split.value.key)!
      part.flash()
    },
  })

  const dragging = drag.dragging

  const startDrag = (idx: number, key: PartKey) => {
    split.value = { idx, key }
    drag.startDrag()
  }

  return {
    left,
    right,
    split,
    gap,
    vertical,
    dragging,
    startDrag,
  }
}
