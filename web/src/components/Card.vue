<template>
  <v-card
    align="left"
    class="mx-auto my-1"
    variant="outlined"
    :flat="true"
    :width="200"
  >
    <v-card-title>
      {{ card.title }}
    </v-card-title>
    <v-card-text> {{ card.text }}</v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { Card } from "@/models/card";
import { reactive } from "vue";

export interface Props {
  card: Card;
}

const props = defineProps<Props>();

const card = reactive(props.card);
</script>
