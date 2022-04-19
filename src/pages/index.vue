<script setup lang="ts">
import { MainPart, SidePart, SideSplit, SplitterPart } from '~/lib/components'
</script>

<template>
  <SideSplit w-full h-100 border>
    <SidePart :width="100">
      side1
    </SidePart>
    <SplitterPart />
    <SidePart :width="100">
      side2
    </SidePart>
    <SplitterPart />
    <SidePart :width="100">
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
