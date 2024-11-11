import pubsub from "../module/pubsub";

export default class CanvasSizeSelect {
  static #setButton = document.querySelector(".set-canvas-size-button");
  static #sizeSelect = document.querySelector(".set-canvas-size-select");

  static init() {
    this.listen();
  }

  static listen() {
    this.#setButton.addEventListener("click", () => {
      pubsub.publish("grid_size_set", this.#sizeSelect.value);
    });
  }
}
