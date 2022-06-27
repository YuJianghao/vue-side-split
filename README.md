# vue-side-split

## Why

Because I need to add some sidebars easily.

## Install

```bash
pnpm i @winwin/vue-side-split
# or npm i @winwin/vue-side-split
```

## Demo

[demo](./playground/src/pages/index.vue)

## Usage

```ts
import { MainPart, SidePart, SideSplit } from '@winwin/vue-side-split'
```

```html
<SideSplit class="my-class" :vertical="vertical">
  <SidePart v-model="sep.l1" :min="0" :max="50">
    <!--  -->
  </SidePart>
  <SidePart v-model="sep.l2" :min="0" :max="50">
    <!--  -->
  </SidePart>
  <!-- More -->
  <MainPart>
    <!--  -->
  </MainPart>
  <!-- More -->
  <SidePart v-model="sep.r1" :min="0" :max="50">
    <!--  -->
  </SidePart>
  <SidePart v-model="sep.r2" :min="0" :max="50">
    <!--  -->
  </SidePart>
</SideSplit>
```

## Custom Splitter Style

```less
.my-class > .splitter {
  background: rgba(127, 127, 127, 0.1);
  transition: background .2s ease-in-out;
  &:hover {
    background: rgba(127, 127, 127, 0.5);
    backdrop-filter: blur(2px);
  }
}
```

## Looking for split-panel feature?

Use [splitpanes](https://antoniandre.github.io/splitpanes/)!

## License

[MIT](./LICENSE) © winwin2011
