<script setup lang="ts">
/* eslint-disable no-console */
import { MainPart, SidePart, SideSplit, SplitterPart } from '~/lib/components'
import { createSideSplitContext, provideContext } from '~/lib/logic'
const context = createSideSplitContext()
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
const vertical = context.vertical
const left = context.left
const right = context.right
const startDrag = context.startDrag
provideContext(context)
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
  <SideSplit w-full h-100 border>
    <SidePart :width="left.width.value[0]">
      side1
    </SidePart>
    <SplitterPart @mousedown="startDrag(0,'left')" />
    <SidePart :width="left.width.value[1]">
      side2
    </SidePart>
    <SplitterPart @mousedown="startDrag(1,'left')" />
    <SidePart :width="left.width.value[2]">
      side3
    </SidePart>
    <SplitterPart @mousedown="startDrag(2,'left')" />
    <MainPart>
      main
    </MainPart>
    <SplitterPart @mousedown="startDrag(2,'right')" />
    <SidePart :width="right.width.value[2]">
      side3
    </SidePart>
    <SplitterPart @mousedown="startDrag(1,'right')" />
    <SidePart :width="right.width.value[1]">
      side2
    </SidePart>
    <SplitterPart @mousedown="startDrag(0,'right')" />
    <SidePart :width="right.width.value[0]">
      side1
    </SidePart>
  </SideSplit>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
