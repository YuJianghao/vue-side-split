<script setup lang="ts">
/* eslint-disable no-console */
import { MainPart, SidePart, SideSplit, SplitterPart } from '~/lib/components'
import { definePart, partMap, startDrag } from '~/lib/logic'
definePart(ref([
  { min: 0, max: 150, init: 100 },
  { min: 0, max: 150, init: 100 },
  { min: 0, max: 150, init: 100 },
]), 'left')
const left = partMap.get('left')!
</script>

<template>
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
  </SideSplit>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
