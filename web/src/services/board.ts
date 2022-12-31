import { Board } from "@/models/board";
import { Column } from "@/models/column";
import { Direction } from "./helpers";

export class BoardService {
  static insertColumn(board: Board, columnTitle: String, direction: Direction) {
    const nextColumnPos =
      direction === Direction.Left
        ? Math.min(...board.columns.map((c) => c.pos), 0) - 1
        : Math.max(...board.columns.map((c) => c.pos), -1) + 1;

    const nextId = Math.max(...board.columns.map((c) => c.id), -1) + 1;

    const newColumn = new Column(nextId, nextColumnPos, columnTitle, []);

    board.columns.push(newColumn);
    board.columns.sort((a, b) => a.pos - b.pos);

    if (nextColumnPos < 0) {
      board.columns = board.columns.map(
        (c) => new Column(c.id, c.pos - nextColumnPos, c.title, c.cards)
      );
    }
  }
}
