import pubsub from "../module/pubsub";

export default class CanvasContainer {
  static #container = document.querySelector(".canvas-container");

  static init() {
    pubsub.sub("new_grid_size_set", this.displayGrid.bind(this));
  }

  static displayGrid(grid) {
    grid.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "cell-row";
      row.forEach((cell) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.dataset.x = cell.x;
        div.dataset.y = cell.y;
        div.dataset.hex = cell.hex;

        rowDiv.append(div);
      });

      this.#container.append(rowDiv);
    });
  }
}
