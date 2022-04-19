import { ref } from 'vue'
import type { Ref } from 'vue'
import { useAxisDrag } from './composeables'

export interface PartConfig {
  min: number
  max: number
  init: number
}

export const partMap = new Map<string, Part>()

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

export function definePart(config: Ref<PartConfig[]>, key: string) {
  const part = createPart(config)
  partMap.set(key, part)
}

export type Part = ReturnType<typeof createPart>

export const split = ref<{ idx: number; key: string } | null>(null)

const drag = useAxisDrag(ref('x'), {
  onDrag(source, target) {
    if (!split.value)
      return
    const key = split.value?.key
    const part = partMap.get(key)!
    console.log('drag', { source, target })
  },
  onDragEnd(source, target) {
    if (!split.value)
      return
    console.log('dragEnd', { source, target })
  },
})

export const startDrag = (idx: number, key: string) => {
  split.value = { idx, key }
  drag.startDrag()
}
