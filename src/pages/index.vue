<script setup lang="ts">
import { MainPart, SidePart, SideSplit } from '~/lib'
import Board from '~/components/Board.vue'
import Container from '~/components/Container.vue'
const vertical = ref(false)
const { t } = useI18n()
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
      {{ t('button.demo') }}
    </RouterLink>
  </div>
  <Container>
    <SideSplit class="index-page" w-full h-100 border border-gray-500:50 :vertical="vertical">
      <SidePart :min="0" :init="30" :max="50">
        <Board>
          1
        </Board>
      </SidePart>
      <SidePart :min="0" :init="30" :max="50">
        <Board>
          2
        </Board>
      </SidePart>
      <SidePart :min="0" :init="30" :max="50">
        <Board>
          3
        </Board>
      </SidePart>
      <MainPart type="main">
        <Board>
          Hi SideSplit
        </Board>
      </MainPart>
      <SidePart :min="0" :init="30" :max="50">
        <Board>
          3
        </Board>
      </SidePart>
      <SidePart :min="0" :init="30" :max="50">
        <Board>
          2
        </Board>
      </SidePart>
      <SidePart :min="0" :init="30" :max="50">
        <Board>
          1
        </Board>
      </SidePart>
    </SideSplit>
  </Container>
</template>
<style lang="less">
.index-page > .splitter{
  background: rgba(127, 127, 127, 0.1);
  transition: background .2s ease-in-out;
  &:hover{
    background: rgba(127, 127, 127, 0.5);
    backdrop-filter: blur(2px);
  }
}
</style>
