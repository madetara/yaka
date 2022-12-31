<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center">
        <h1>{{ board.name }}</h1>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <template v-for="column in board.columns.values()" :key="column">
        <v-col align-self="start" cols="3" class="mx-1" width="200">
          <Column
            @add-new-card="addNewCard"
            @move-card="moveCard"
            :column="column"
            :is-most-left="column.pos === 0"
            :is-most-right="column.pos === maxColumnPos"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import Column from "@/components/Column.vue";
import { Board } from "@/models/board";
import { ColumnService } from "@/services/column";
import { reactive, computed } from "vue";

export interface Props {
  board: Board;
}

const props = defineProps<Props>();
const board = reactive(props.board);
const maxColumnPos = computed(() =>
  Math.max(...board.columns.map((c) => c.pos), -1)
);

function addNewCard(columnId: number, cardTitle: String, cardText: String) {
  board.addNewCard(columnId, cardTitle, cardText);
}

function moveCard(cardId: number, columnId: number, direction: number) {
  const currentColumn = board.columns.find((c) => c.id === columnId);

  if (currentColumn === null || currentColumn === undefined) {
    console.error("column not found, id: {columnId}", columnId);
    return;
  }

  const newPos = currentColumn.pos + direction;
  const card = currentColumn.cards.find((c) => c.id === cardId);

  if (card === null || card === undefined) {
    console.error("card not found, id: {cardId}", cardId);
    return;
  }

  const newColumn = board.columns.find((c) => c.pos === newPos);

  if (newColumn === null || newColumn === undefined) {
    console.error("column not found, id: {columnId}", columnId);
    return;
  }

  ColumnService.removeCard(currentColumn, cardId);
  ColumnService.insertCard(newColumn, card);
}
</script>
