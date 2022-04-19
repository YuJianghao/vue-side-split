import type { Ref } from 'vue'
import { ref } from 'vue'
import { useEventListener, useMouse } from '@vueuse/core'

export interface Point{
  x: number
  y: number
}

export function useDrag({ onDrag, onDragEnd }: {
  onDrag(source: Point, target: Point): void
  onDragEnd(source: Point, target: Point): void
}) {
  const dragging = ref(false)
  const { x, y } = useMouse()
  const source = ref<Point>({ x: 0, y: 0 })
  const target = ref<Point>({ x: 0, y: 0 })
  useEventListener(window, 'mousemove', () => {
    if (!dragging.value)
      return
    target.value = { x: x.value, y: y.value }
    onDrag(source.value, target.value)
  })
  useEventListener(window, 'mouseleave', () => {
    if (!dragging.value)
      return
    onDragEnd(source.value, target.value)
    resetDrag()
  })
  useEventListener(window, 'mouseup', () => {
    if (!dragging.value)
      return
    onDragEnd(source.value, target.value)
    resetDrag()
  })
  function resetDrag() {
    dragging.value = false
    source.value = { x: 0, y: 0 }
    target.value = { x: 0, y: 0 }
  }
  function startDrag() {
    dragging.value = true
    source.value = { x: x.value, y: y.value }
  }
  return { startDrag, resetDrag }
}

export function useAxisDrag(axis: Ref<'x'|'y'>, cbs: {
  onDrag(source: number, target: number): void
  onDragEnd(source: number, target: number): void
}) {
  const drag = useDrag({
    onDrag(source, target) {
      cbs.onDrag(source[axis.value], target[axis.value])
    },
    onDragEnd(source, target) {
      cbs.onDragEnd(source[axis.value], target[axis.value])
    },
  })
  watch(axis, () => {
    drag.resetDrag()
  })
  return drag
}
