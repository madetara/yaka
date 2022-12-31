<template>
  <v-dialog width="400" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-plus-thick" v-bind="props"> </v-btn>
    </template>
    <v-card class="mx-auto">
      <v-card-title
        >Adding new column to board "{{ props.boardName }}"</v-card-title
      >
      <v-container>
        <v-row>
          <v-col md="12">
            <v-text-field
              autofocus
              label="Title"
              required
              v-model="columnTitle"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="text-center mb-2">
        <v-spacer></v-spacer>
        <v-btn @click="addColumn" variant="outlined">Submit</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

export interface Props {
  boardName: String;
}

const emit = defineEmits<{
  (e: "add-column", columnTitle: String): void;
}>();
const props = defineProps<Props>();
const dialog = ref(false);
const columnTitle = ref("");

function addColumn() {
  dialog.value = false;

  emit("add-column", columnTitle.value);

  columnTitle.value = "";
}
</script>
