import ColorPallete from "../class/ColorPallete";
import pubsub from "../module/pubsub";

export default class ColorButtons {
  static #buttons = document.querySelectorAll(".colors button[data-color]");
  static #colorWheel = document.querySelector(".colors .color-wheel");
  static #activeColorIndicator = document.querySelector(
    ".colors .active-color-indicator",
  );

  static init() {
    pubsub.sub("color_added", this.displayColors.bind(this));
    pubsub.sub("color_selected", this.displayColors.bind(this));
    this.listen();
  }

  static displayColors(colors) {
    const temp = [...colors];
    this.#buttons.forEach((button) => {
      if (temp.length === 0) return;
      const c = temp.shift();
      button.dataset.color = c.hex;
      button.dataset.id = c.id;
      button.style.backgroundColor = c.hex;
      button.dataset.active = c.activeStatus;

      if (c.activeStatus) {
        button.classList.add("active-color");
        this.setActiveColorIndicator(c.hex);
      } else {
        button.classList.remove("active-color");
      }
    });
  }

  static setActiveColorIndicator(hex) {
    this.#activeColorIndicator.style.backgroundColor = hex;
  }

  static listen() {
    this.#buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.color === "") return;
        pubsub.publish("select_color", button.dataset.id);
      });
    });

    this.#colorWheel.addEventListener("change", (e) => {
      pubsub.publish("add_color", e.target.value);
    });
  }
}
