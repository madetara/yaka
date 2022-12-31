<template>
  <Board :board="boardStore.board" />
</template>

<script lang="ts" setup>
import Board from "@/components/Board.vue";
import { useActiveBoardStore, useBoardStore } from "@/store/app";

const boardStore = useBoardStore();
const activeBoardIdStore = useActiveBoardStore();

activeBoardIdStore.activeBoardId = boardStore.board.id;
</script>
