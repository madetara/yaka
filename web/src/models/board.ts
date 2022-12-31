import { Column } from "@/models/column";

export class Board {
  name: String;
  columns: Column[];

  constructor(name: String, columns: Column[]) {
    this.name = name;
    this.columns = columns;
  }

  addNewCard(columnId: number, cardTitle: String, cardText: String) {
    const nextId =
      Math.max(
        ...this.columns
          .flatMap((column) => column.cards)
          .map((card) => card.id),
        -1
      ) + 1;

    this.columns
      .find((column) => column.id === columnId)
      ?.addNewCard(nextId, cardTitle, cardText);
  }
}
