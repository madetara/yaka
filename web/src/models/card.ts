export class Card {
  id: number;
  columnId: number;
  pos: number;
  title: String;
  text: String;

  constructor(
    id: number,
    columnId: number,
    pos: number,
    title: String,
    text: String
  ) {
    this.id = id;
    this.columnId = columnId;
    this.pos = pos;
    this.title = title;
    this.text = text;
  }
}
