<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import Container from '~/components/Container.vue'
import { MainPart, SidePart, SideSplit } from '~/lib'
import Board from '~/components/Board.vue'
const { t } = useI18n()
</script>
<template>
  <div p6>
    <RouterLink class="icon-btn mx-2" to="/" btn>
      {{ t('button.home') }}
    </RouterLink>
  </div>
  <Container>
    <SideSplit
      class="vscode" fit
      vertical
      :gap="6"
      style="color: #eeeeee"
    >
      <SidePart :min="24" :init="24" :max="24">
        <div
          fit
          flex
          items-center
          flex-gap-2
          px2
          select-none
          style="background-color: #3c3c3c; "
        >
          <div class="menu-item">
            File
          </div>
          <div class="menu-item">
            Edit
          </div>
          <div class="menu-item">
            Selection
          </div>
          <div flex-1 />
          <div>
            <div i="fluent-minimize-24-regular" px3 text-xs />
          </div>
          <div>
            <div i="fluent-maximize-24-regular" px3 text-xs />
          </div>
          <div>
            <div i="fluent-dismiss-24-regular" px3 text-xs />
          </div>
        </div>
      </SidePart>
      <MainPart type="main">
        <SideSplit fit :gap="6">
          <SidePart :min="46" :init="46" :max="46">
            <div style="background-color: #333333;" fit />
          </SidePart>
          <SidePart :init="200" :max="500">
            <div style="background-color: #252526;" fit />
          </SidePart>
          <MainPart>
            <div style="background-color: #1e1e1e;" fit>
              <Board>Hi SideSplit</Board>
            </div>
          </MainPart>
        </SideSplit>
      </MainPart>
      <SidePart :min="24" :init="24" :max="24">
        <div fit style="background-color: #007acc" flex items-center>
          <div style="background-color: #16825d" h-full flex items-center px4>
            <div i="fluent-remote-20-regular" text-sm mr2 />
          </div>
        </div>
      </SidePart>
    </SideSplit>
  </Container>
</template>
<style lang="less">
.vscode .splitter {
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #007fd4;
  }
}
.menu-item {
  @apply px1;
}
</style>
