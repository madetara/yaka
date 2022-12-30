// Utilities
import { Board } from "@/models/board";
import { Card } from "@/models/card";
import { Column } from "@/models/column";
import { defineStore } from "pinia";
import { ref, watch, reactive } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const localTheme = localStorage.getItem("theme");
  const theme = ref(localTheme ?? "light");

  watch(theme, () => {
    localStorage.setItem("theme", theme.value);
  });

  return { theme };
});

export const useBoardStore = defineStore("board", () => {
  // TODO delete
  const testingBoard = new Board("Test board", [
    new Column(1, 1, "NEW", [new Card(1, 1, 1, "foo", "bar")]),
    new Column(2, 2, "DONE", [new Card(2, 2, 2, "baz", "quux")]),
  ]);

  const localBoardString = localStorage.getItem("board");
  const localBoardData: Board =
    localBoardString !== null ? JSON.parse(localBoardString) : null;

  const localBoard: Board =
    localBoardData !== null
      ? new Board(
          localBoardData.name,
          localBoardData.columns.map(
            (column) =>
              new Column(column.id, column.pos, column.title, column.cards)
          )
        )
      : testingBoard;

  localBoard?.columns.sort((a, b) => a.pos - b.pos);
  localBoard?.columns.forEach((column) =>
    column.cards.sort((a, b) => a.pos - b.pos)
  );

  const board = reactive(localBoard ?? new Board("Default board", []));

  watch(board, () => {
    localStorage.setItem("board", JSON.stringify(board));
  });

  return { board };
});
