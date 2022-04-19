<script setup lang="ts">
import { MainPart, SidePart, SideSplit, SplitterPart } from '~/lib/components'
import { createParts } from '~/lib/logic'
const parts = createParts(ref([
  { min: 50, max: 150, init: 100 },
  { min: 50, max: 150, init: 100 },
  { min: 50, max: 150, init: 100 },
]), ref('left'))
</script>

<template>
  <SideSplit w-full h-100 border>
    <SidePart :width="parts.width.value[0]">
      side1
    </SidePart>
    <SplitterPart />
    <SidePart :width="parts.width.value[1]">
      side2
    </SidePart>
    <SplitterPart />
    <SidePart :width="parts.width.value[2]">
      side3
    </SidePart>
    <SplitterPart />
    <MainPart>
      main
    </MainPart>
  </SideSplit>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
