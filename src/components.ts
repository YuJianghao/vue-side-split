/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h, watch } from 'vue'
import type { PropType, StyleValue } from 'vue'
import type { PartConfig } from './logic'
import { createSideSplitContext, provideContext, useContext } from './logic'
export const SidePart = defineComponent({
  name: 'SidePart',
  props: {
    min: Number,
    max: Number,
    modelValue: {
      type: Number,
      required: true,
    },
  },
  render() {
    return this.$slots.default?.() ?? []
  },
})

export const MainPart = defineComponent({
  name: 'MainPart',
  render() {
    return this.$slots.default?.() ?? []
  },
})

const RenderSidePart = defineComponent({
  name: 'RenderSidePart',
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { dragging } = useContext()
    const style = computed<StyleValue>(() => {
      return {
        flexBasis: `${props.width}px`,
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden',
        userSelect: dragging.value ? 'none' : undefined,
      }
    })
    return () => {
      const children = slots.default?.() ?? []
      return h('div', { class: 'side-part', style: style.value }, children)
    }
  },
})

const RenderMainPart = defineComponent({
  name: 'RenderMainPart',
  setup(_, { slots }) {
    const { gap, dragging } = useContext()
    const style = computed<StyleValue>(() => {
      return {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: `${gap.value}px`,
        overflow: 'hidden',
        userSelect: dragging.value ? 'none' : undefined,
      }
    })
    return () => {
      const children = slots.default?.() ?? []
      return h('div', { class: 'main-part', style: style.value }, children)
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
        class: 'splitter',
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
      type: String as PropType<'left' | 'right' | 'main'>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = useContext()
    return () => {
      const children = slots.default?.() ?? []
      switch (props.type) {
        case 'main':
          return h(RenderMainPart, () => children)
        case 'left':
        case 'right':
          return h(
            RenderSidePart,
            {
              width: context[props.type].width.value[props.id!],
            },
            () => children,
          )
        default:
          break
      }
    }
  },
})
function parseNumber(value: any, init?: number): number | undefined {
  if (value === undefined)
    return init
  if (typeof value === 'number')
    return value
  return parseInt(value, 10)
}

export const SideSplit = defineComponent({
  name: 'SideSplit',
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
    gap: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { slots }) {
    const context = createSideSplitContext()
    watch(
      () => props.vertical,
      (v) => {
        context.vertical.value = v
      },
      { immediate: true },
    )
    watch(
      () => props.gap,
      (v) => {
        context.gap.value = v
      },
      { immediate: true },
    )
    provideContext(context)
    const { vertical } = context
    const style = computed<StyleValue>(() => {
      return {
        display: 'flex',
        ...(vertical.value && { flexDirection: 'column' }),
      }
    })
    return () => {
      const children = slots.default?.() ?? []
      const panels = children.filter(
        ch => ch.type === SidePart || ch.type === MainPart,
      )

      const mainCount = panels.filter(ch => ch.type === MainPart).length
      if (mainCount !== 1) {
        throw new Error(
          `Must provide one ${MainPart.name} component, but found ${mainCount}`,
        )
      }

      function parseConfig(props: any, key: string): PartConfig {
        const min = parseNumber(props.min, 0)!
        const max = parseNumber(props.max, Infinity)!
        const propsModelValue = parseNumber(
          props.modelValue ?? props['model-value'],
        )
        if (propsModelValue === undefined)
          throw new Error('must provide init prop')
        const updateVModel = props['onUpdate:modelValue']
        const updateSepStore = (value: number) => {
          context.sepStore.set(key, value)
        }
        if (!updateVModel) {
          if (!context.sepStore.has(key))
            context.sepStore.set(key, propsModelValue)
        }
        const sepStoreModelValue = context.sepStore.get(key)!
        const update = updateVModel ?? updateSepStore
        return {
          min,
          max,
          modelValue: updateVModel ? propsModelValue : sepStoreModelValue,
          update,
        }
      }

      const mainPanel = panels.find(ch => ch.type === MainPart)!
      const mainPanelIdx = panels.indexOf(mainPanel)
      const leftPanel = panels.slice(0, mainPanelIdx)
      const leftConfig = leftPanel.map((ch, idx) =>
        parseConfig(ch.props, `left-${idx}`),
      )
      const rightPanel = panels.slice(mainPanelIdx + 1)
      const rightConfig = rightPanel
        .map((ch, idx) => parseConfig(ch.props, `right-${idx}`))
        .reverse()
      context.left.config.value = leftConfig
      context.right.config.value = rightConfig
      const content = [
        ...leftPanel.map((ch, id) => [
          // @ts-expect-error todo
          h(Panel, { id, type: 'left' }, ch.children),
          h(SplitterPart, { id, type: 'left' }),
        ]),
        // @ts-expect-error todo
        h(Panel, { type: 'main' }, mainPanel.children),
        ...rightPanel
          .map((ch, id) =>
            [
              // @ts-expect-error todo
              h(Panel, { id, type: 'right' }, ch.children),
              h(SplitterPart, { id, type: 'right' }),
            ].reverse(),
          )
          .reverse(),
      ]
      return h('div', { style: style.value }, content)
    }
  },
})
