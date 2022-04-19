<script setup lang="ts">
/* eslint-disable no-console */
import { Panel, SideSplit, SplitterPart } from '~/lib/components'
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
    <Panel :id="0" type="left">
      side1
    </Panel>
    <SplitterPart :id="0" type="left" />
    <Panel :id="1" type="left">
      side2
    </Panel>
    <SplitterPart :id="1" type="left" />
    <Panel :id="2" type="left">
      side3
    </Panel>
    <SplitterPart :id="2" type="left" />
    <Panel type="main">
      main
    </Panel>
    <SplitterPart :id="2" type="right" />
    <Panel :id="2" type="right">
      side3
    </Panel>
    <SplitterPart :id="1" type="right" />
    <Panel :id="1" type="right">
      side2
    </Panel>
    <SplitterPart :id="0" type="right" />
    <Panel :id="0" type="right">
      side1
    </Panel>
  </SideSplit>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
