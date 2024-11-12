import ColorPallete from "../class/ColorPallete";
import pubsub from "../module/pubsub";

export default class CanvasContainer {
  static #container = document.querySelector(".canvas-container");
  static #drawing = false;

  static init() {
    pubsub.sub("new_grid_size_set", this.displayGrid.bind(this));

    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

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
    // e.which refers to the mouse buttons (0 === left button, 3 right mouse button)
    cell.addEventListener("mouseover", (e) => {
      if (this.#drawing) {
        if (e.which === 1) {
          cell.style.background = ColorPallete.selectedColor().hex();
        } else if (e.which === 3) {
          cell.style.background = "#fff";
        }
      }
    });

    cell.addEventListener("mousedown", (e) => {
      if (e.which === 1) {
        cell.style.background = ColorPallete.selectedColor().hex();
      } else if (e.which === 3) {
        cell.style.background = "#fff";
      }
    });
  }
}
