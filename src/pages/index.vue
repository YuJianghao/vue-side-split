<script setup lang="ts">
import { MainPart, SidePart, SideSplit } from '~/lib/components'
</script>

<template>
  <SideSplit w-full h-100 border>
    <SidePart :width="100">
      side1
    </SidePart>
    <SidePart :width="100">
      side2
    </SidePart>
    <SidePart :width="100">
      side3
    </SidePart>
    <MainPart>
      main
    </MainPart>
  </SideSplit>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
