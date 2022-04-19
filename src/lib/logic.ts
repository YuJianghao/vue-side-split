import { ref } from 'vue'
import type { Ref } from 'vue'

export interface PartConfig{
  min: number
  max: number
  init: number
}

export function createParts(config: Ref<PartConfig[]>, id: Ref<string>) {
  const raw = ref<number[]>([])
  const tmp = ref<(number|undefined)[]>([])
  const width = computed(() => {
    return tmp.value.map((t, idx) => t ?? raw.value[idx])
  })
  watch(config, () => {
    raw.value = config.value.map(c => c.init)
    tmp.value = config.value.map(_ => undefined)
  }, { deep: true, immediate: true })
  return { raw, tmp, config, id, width }
}

export type Parts = ReturnType<typeof createParts>
