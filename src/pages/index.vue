<script setup lang="ts">
/* eslint-disable no-console */
import { MainPart, SidePart, SideSplit } from '~/lib/components'
const vertical = ref(false)
</script>

<template>
  <div>
    <label whitespace-nowrap text-base>
      vertical
      <input v-model="vertical" type="checkbox" hidden>
      <div v-if="vertical" i="carbon-checkbox-checked" vertical-text-bottom inline-block />
      <div v-else i="carbon-checkbox" vertical-text-bottom inline-block />
    </label>
  </div>
  <SideSplit w-full h-100 border :vertical="vertical">
    <SidePart :min="0" :init="10" :max="50">
      side1
    </SidePart>
    <SidePart :min="0" :init="20" :max="50">
      side2
    </SidePart>
    <SidePart :min="0" :init="30" :max="50">
      side3
    </SidePart>
    <MainPart type="main">
      main
    </MainPart>
    <SidePart :min="0" :init="30" :max="50">
      side3
    </SidePart>
    <SidePart :min="0" :init="20" :max="50">
      side2
    </SidePart>
    <SidePart :min="0" :init="10" :max="50">
      side1
    </SidePart>
  </SideSplit>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
