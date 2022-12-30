<template>
  <Board :board="boardStore.board" />
</template>

<script lang="ts" setup>
import Board from "@/components/Board.vue";
import { useBoardStore } from "@/store/app";

const boardStore = useBoardStore();
</script>
