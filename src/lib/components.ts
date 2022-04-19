/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h } from 'vue'
import type { StyleValue } from 'vue'
import { gap, vertical } from './logic'

export const SideSplit = defineComponent({
  name: 'SideSplit',
  setup(_, { slots }) {
    const style = computed<StyleValue>(() => {
      return {
        display: 'flex',
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
    const style = computed<StyleValue>(() => {
      return {
        flexGrow: 1,
        flexShrink: 1,
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
  setup() {
    const style = computed<StyleValue>(() => {
      const statics: StyleValue = {
        zIndex: 1,
        background: 'green',
      }
      if (vertical.value) {
        return {
          height: `${gap.value}px`,
          width: '100%',
          margin: `-${gap.value / 2}px 0`,
          ...statics,
        }
      }
      else {
        return {
          height: '100%',
          width: `${gap.value}px`,
          margin: `0 -${gap.value / 2}px`,
          ...statics,
        }
      }
    })
    return () => {
      return h('div', { style: style.value })
    }
  },
})
