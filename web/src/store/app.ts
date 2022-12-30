// Utilities
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const localTheme = localStorage.getItem("theme");
  const theme = ref(localTheme ?? "light");

  watch(theme, () => {
    localStorage.setItem("theme", theme.value);
  });

  return { theme };
});
