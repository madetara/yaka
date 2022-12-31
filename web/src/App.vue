<template>
  <v-app :theme="themeStore.theme">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>yaka</v-app-bar-title>

      <template v-if="activeBoardIdStore.activeBoardId !== -1">
        <v-spacer></v-spacer>

        <v-app-bar-title>{{ activeBoardName }}</v-app-bar-title>
      </template>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <v-switch
          style="margin-top: 17%"
          align="right"
          v-model="themeStore.theme"
          true-value="light"
          false-value="dark"
          :prepend-icon="'mdi-weather-night'"
          :append-icon="'mdi-weather-sunny'"
        ></v-switch>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary>
    </v-navigation-drawer>

    <v-main scrollable>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { Ref, ref, computed } from "vue";
import { RouterView } from "vue-router";
import { useActiveBoardStore, useBoardStore, useThemeStore } from "./store/app";

const themeStore = useThemeStore();
const boardStore = useBoardStore();
const activeBoardIdStore = useActiveBoardStore();
const activeBoardName = computed(() => {
  return boardStore.board.name;
});

const drawer: Ref<boolean> = ref(false);
</script>
