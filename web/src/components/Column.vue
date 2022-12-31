<template>
  <div align="center">{{ column.title }}</div>
  <v-container>
    <template v-for="card in column.cards.values()" :key="card">
      <v-row no-gutters>
        <v-col>
          <Card
            :card="card"
            :move-left-disabled="props.isMostLeft"
            :move-right-disabled="props.isMostRight"
            @move-card="moveCard"
          />
        </v-col>
      </v-row>
    </template>
    <v-row no-gutters justify="center" class="text-center">
      <v-col align-self="center">
        <v-dialog width="400" v-model="addCardDialog">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-plus-thick" flat v-bind="props"> </v-btn>
          </template>
          <v-card class="mx-auto">
            <v-card-title
              >Adding new card to column "{{ column.title }}"</v-card-title
            >
            <v-container>
              <v-row>
                <v-col md="12">
                  <v-text-field
                    autofocus
                    label="Title"
                    required
                    v-model="newCardTitle"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12">
                  <v-textarea label="Additional info" v-model="newCardText">
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions class="text-center mb-2">
              <v-spacer></v-spacer>
              <v-btn @click="addNewCard" variant="outlined">Submit</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import Card from "@/components/Card.vue";
import { Column } from "@/models/column";
import { ref, reactive } from "vue";

export interface Props {
  column: Column;
  isMostLeft: boolean;
  isMostRight: boolean;
}

const emit = defineEmits<{
  (
    e: "add-new-card",
    columnId: number,
    cardTitle: String,
    cardText: String
  ): void;
  (e: "move-card", cardId: number, columnId: number, direction: number): void;
}>();
const props = defineProps<Props>();

const addCardDialog = ref(false);
const newCardTitle = ref("");
const newCardText = ref("");
const column = reactive(props.column);

function addNewCard() {
  addCardDialog.value = false;

  emit("add-new-card", column.id, newCardTitle.value, newCardText.value);

  newCardTitle.value = "";
  newCardText.value = "";
}

function moveCard(cardId: number, direction: number) {
  emit("move-card", cardId, column.id, direction);
}
</script>
