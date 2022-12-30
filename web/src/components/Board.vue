<template>
  <div>{{ board.name }}</div>
  <v-container>
    <v-row justify="center" no-gutters>
      <template v-for="column in board.columns.values()" :key="column">
        <v-col align-self="start" cols="3" class="mx-1" width="200">
          <Column @add-new-card="addNewCard" :column="column" />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import Column from "@/components/Column.vue";
import { Board } from "@/models/board";
import { reactive } from "vue";

export interface Props {
  board: Board;
}

const props = defineProps<Props>();
const board = reactive(props.board);

function addNewCard(columnId: number, cardTitle: String, cardText: String) {
  board.addNewCard(columnId, cardTitle, cardText);
}
</script>
