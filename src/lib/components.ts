/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h } from 'vue'
import type { StyleValue } from 'vue'

export const SideSplit = defineComponent({
  name: 'SideSplit',
  setup(_, { slots }) {
    const style = computed<StyleValue>(() => {
      return {
        display: 'flex',
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
      }
    })
    return () => {
      const children = slots.default?.() ?? []
      return h('div', { style: style.value }, children)
    }
  },
})