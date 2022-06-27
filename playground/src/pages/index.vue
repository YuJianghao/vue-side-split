<script setup lang="ts">
import { MainPart, SidePart, SideSplit } from '~/../../src'
import Board from '~/components/Board.vue'
import Container from '~/components/Container.vue'
const vertical = ref(false)
const { t } = useI18n()
const sep = reactive({
  l1: 30,
  l2: 30,
  l3: 30,
  r1: 30,
  r2: 30,
  r3: 30,
})
</script>

<template>
  <div p6 select-none>
    <label whitespace-nowrap text-base>
      vertical
      <input v-model="vertical" type="checkbox" hidden>
      <div v-if="vertical" i="carbon-checkbox-checked" icon />
      <div v-else i="carbon-checkbox" icon />
    </label>

    <RouterLink class="icon-btn mx-2" to="/vscode" btn>
      {{ t("button.demo") }}
    </RouterLink>
  </div>
  <Container>
    <SideSplit
      class="index-page"
      w-full
      h-100
      border
      border-gray-500:50
      :vertical="vertical"
    >
      <SidePart v-model="sep.l1" :min="0" :max="50">
        <Board> 1 </Board>
      </SidePart>
      <SidePart v-model="sep.l2" :min="0" :max="50">
        <Board> 2 </Board>
      </SidePart>
      <SidePart v-model="sep.l3" :min="0" :max="50">
        <Board> 3 </Board>
      </SidePart>
      <MainPart>
        <Board> Hi SideSplit </Board>
      </MainPart>
      <SidePart v-model="sep.r1" :min="0" :max="50">
        <Board> 3 </Board>
      </SidePart>
      <SidePart v-model="sep.r2" :min="0" :max="50">
        <Board> 2 </Board>
      </SidePart>
      <SidePart v-model="sep.r3" :min="0" :max="50">
        <Board> 1 </Board>
      </SidePart>
    </SideSplit>
  </Container>
</template>
<style lang="less">
.index-page > .splitter {
  background: rgba(127, 127, 127, 0.1);
  transition: background 0.2s ease-in-out;
  &:hover {
    background: rgba(127, 127, 127, 0.5);
    backdrop-filter: blur(2px);
  }
}
</style>
