/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h } from 'vue'
import type { PropType, StyleValue } from 'vue'
import { createSideSplitContext, provideContext, useContext } from './logic'

export const SideSplit = defineComponent({
  name: 'SideSplit',
  props: {
    vertical: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = createSideSplitContext()
    watch(() => props.vertical, (v) => {
      context.vertical.value = v
    })
    provideContext(context)
    context.left.config.value = [
      { min: 0, max: 150, init: 20 },
      { min: 0, max: 150, init: 20 },
      { min: 0, max: 150, init: 20 },
    ]
    context.right.config.value = [
      { min: 0, max: 150, init: 20 },
      { min: 0, max: 150, init: 20 },
      { min: 0, max: 150, init: 20 },
    ]
    const { vertical, dragging } = context
    const style = computed<StyleValue>(() => {
      return {
        display: 'flex',
        userSelect: dragging.value ? 'none' : undefined,
        ...(vertical.value && { flexDirection: 'column' }),
      }
    })
    return () => {
      const children = slots.default?.() ?? []
      return h('div', { style: style.value }, children)
    }
  },
})

export const SidePart = defineComponent({
  name: 'SidePart',
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const style = computed<StyleValue>(() => {
      return {
        flexBasis: `${props.width}px`,
        flexGrow: 0,
        flexShrink: 0,
        border: '1px solid red',
        overflow: 'hidden',
      }
    })
    return () => {
      const children = slots.default?.() ?? []
      return h('div', { style: style.value }, children)
    }
  },
})

export const MainPart = defineComponent({
  name: 'MainPart',
  setup(_, { slots }) {
    const { gap } = useContext()
    const style = computed<StyleValue>(() => {
      return {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: `${gap.value}px`,
        border: '1px solid blue',
        overflow: 'hidden',
      }
    })
    return () => {
      const children = slots.default?.() ?? []
      return h('div', { style: style.value }, children)
    }
  },
})

export const SplitterPart = defineComponent({
  name: 'SplitterPart',
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<'left' | 'right'>,
      required: true,
    },
  },
  setup(props) {
    const { vertical, gap, startDrag } = useContext()
    const style = computed<StyleValue>(() => {
      const statics: StyleValue = {
        zIndex: 1,
        background: 'green',
        flexShrink: 0,
      }
      if (vertical.value) {
        return {
          height: `${gap.value}px`,
          width: '100%',
          margin: `-${gap.value / 2}px 0`,
          cursor: 'row-resize',
          ...statics,
        }
      }
      else {
        return {
          height: '100%',
          width: `${gap.value}px`,
          margin: `0 -${gap.value / 2}px`,
          cursor: 'col-resize',
          ...statics,
        }
      }
    })
    return () => {
      return h('div', {
        style: style.value,
        onMousedown: () => startDrag(props.id, props.type),
      })
    }
  },
})

export const Panel = defineComponent({
  name: 'Panel',
  props: {
    id: Number,
    type: {
      type: String as PropType<'left'|'right'|'main'>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = useContext()
    return () => {
      const children = slots.default?.() ?? []
      switch (props.type) {
        case 'main':
          return h(MainPart, () => children)
        case 'left':
        case 'right':
          return h(SidePart, {
            width: context[props.type].width.value[props.id!],
          }, () => children)
        default:
          break
      }
    }
  },
})
