<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center">
        <h1>{{ board.name }}</h1>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col class="text-center" align-self="start" cols="1" width="100">
        <AddColumn
          :board-name="board.name"
          @add-column="
            (columnTitle) => {
              addColumn(columnTitle, Direction.Left);
            }
          "
        />
      </v-col>
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

      <v-col
        v-if="needsSecondAddColumnButton"
        class="text-center"
        align-self="start"
        cols="1"
        width="100"
      >
        <AddColumn
          :board-name="board.name"
          @add-column="
            (columnTitle) => {
              addColumn(columnTitle, Direction.Right);
            }
          "
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import Column from "@/components/Column.vue";
import AddColumn from "@/components/AddColumn.vue";
import { Board } from "@/models/board";
import { ColumnService } from "@/services/column";
import { reactive, computed } from "vue";
import { BoardService } from "@/services/board";
import { Direction } from "@/services/helpers";

export interface Props {
  board: Board;
}

const props = defineProps<Props>();
const board = reactive(props.board);
const maxColumnPos = computed(() =>
  Math.max(...board.columns.map((c) => c.pos), -1)
);
const needsSecondAddColumnButton = computed(
  () => (board.columns?.length ?? 0) > 0
);

function addNewCard(columnId: number, cardTitle: String, cardText: String) {
  board.addNewCard(columnId, cardTitle, cardText);
}

function addColumn(columnTitle: String, direction: Direction) {
  BoardService.insertColumn(board, columnTitle, direction);
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
