import pubsub from "../module/pubsub";
import Cell from "./Cell";

export default class Canvas {
  static #grid = [];
  static #gridSize = 4;

  static init() {
    pubsub.sub("grid_size_set", this.generateGrid.bind(this));
    this.generateGrid(this.#gridSize);
  }

  static generateGrid(size) {
    this.#grid = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(new Cell(i, j));
      }
      this.#grid.push(row);
    }

    pubsub.publish("new_grid_size_set", this.#grid);
  }
}
