import { Card } from "@/models/card";
import { Column } from "@/models/column";

export class ColumnService {
  static removeCard(column: Column, cardId: number) {
    column.cards = column.cards.filter((c) => c.id !== cardId);
  }

  static insertCard(column: Column, card: Card) {
    const nextPos = Math.max(...column.cards.map((c) => c.pos), -1) + 1;

    card.pos = nextPos;
    card.columnId = column.id;
    column.cards.push(card);
  }
}
