<template>
  <v-card
    align="left"
    class="mx-auto my-1"
    variant="outlined"
    :flat="true"
    :width="200"
  >
    <v-toolbar color="rgba(0, 0, 0, 0)">
      <v-toolbar-title>
        {{ card.title }}
      </v-toolbar-title>
      <template v-slot:append>
        <v-btn icon="mdi-minus-thick" @click="removeCard"> </v-btn>
      </template>
    </v-toolbar>
    <v-card-text v-if="card.text !== null && card.text.trim() !== ''">
      {{ card.text }}</v-card-text
    >
    <v-card-actions>
      <v-btn
        icon="mdi-arrow-left"
        @click="moveCard(Direction.Left)"
        :disabled="moveLeftDisabled"
      ></v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-arrow-right"
        @click="moveCard(Direction.Right)"
        :disabled="moveRightDisabled"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { Card } from "@/models/card";
import { reactive, ref } from "vue";

export interface Props {
  card: Card;
  moveLeftDisabled: boolean;
  moveRightDisabled: boolean;
}

enum Direction {
  Left = -1,
  Right = 1,
}

const emit = defineEmits<{
  (e: "move-card", cardId: number, direction: number): void;
  (e: "remove-card", cardId: number): void;
}>();
const props = defineProps<Props>();

const card = reactive(props.card);
const moveLeftDisabled = ref(props.moveLeftDisabled);
const moveRightDisabled = ref(props.moveRightDisabled);

function moveCard(direction: Direction) {
  emit("move-card", card.id, direction);
}

function removeCard() {
  emit("remove-card", card.id);
}
</script>
