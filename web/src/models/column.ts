import { Card } from "@/models/card";

export class Column {
  id: number;
  pos: number;
  title: String;
  cards: Card[];

  constructor(id: number, pos: number, title: String, cards: Card[]) {
    this.id = id;
    this.pos = pos;
    this.title = title;
    this.cards = cards;
  }

  addNewCard(cardId: number, cardTitle: String, cardText: String) {
    const nextPos = Math.max(...this.cards.map((c) => c.pos), -1) + 1;

    const newCard = new Card(cardId, this.id, nextPos, cardTitle, cardText);

    this.cards.push(newCard);
  }
}
