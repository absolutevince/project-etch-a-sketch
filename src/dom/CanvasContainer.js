import ColorPallete from "../class/ColorPallete";
import pubsub from "../module/pubsub";

export default class CanvasContainer {
  static #container = document.querySelector(".canvas-container");
  static #drawing = false;

  static init() {
    pubsub.sub("new_grid_size_set", this.displayGrid.bind(this));

    window.addEventListener("mousedown", () => {
      this.#drawing = true;
    });

    window.addEventListener("mouseup", () => {
      this.#drawing = false;
    });
  }

  static displayGrid(grid, size) {
    this.#container.innerHTML = "";
    this.#container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "cell-row";
      rowDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      row.forEach((cell) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.dataset.x = cell.x;
        div.dataset.y = cell.y;
        div.dataset.hex = cell.hex;

        this.listenForCellHover(div);
        rowDiv.append(div);
      });
      this.#container.append(rowDiv);
    });
  }

  static listenForCellHover(cell) {
    cell.addEventListener("mouseover", () => {
      if (this.#drawing) {
        cell.style.background = ColorPallete.selectedColor().hex();
      }
    });

    cell.addEventListener("mousedown", () => {
      cell.style.background = ColorPallete.selectedColor().hex();
    });
  }
}
