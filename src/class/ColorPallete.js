import pubsub from "../module/pubsub";
import Color from "./Color";

export default class ColorPallete {
  static #COLOR_ARRAY = [];

  static init() {
    pubsub.sub("add_color", this.addColor.bind(this));
    pubsub.sub("select_color", this.selectColor.bind(this));
  }

  static selectColor(id) {
    this.#COLOR_ARRAY = this.#COLOR_ARRAY.map((color) => {
      if (color.id === +id) {
        color.setActive();
      } else {
        color.setInactive();
      }
      return color;
    });

    pubsub.publish("color_selected", this.#COLOR_ARRAY);
  }

  static addColor(color) {
    this.#COLOR_ARRAY.push(new Color(color, this.#COLOR_ARRAY.length));
    pubsub.publish("color_added", this.#COLOR_ARRAY);
  }

  static getSelectedColor() {
    return this.#COLOR_ARRAY.filter((color) => color.activeStatus).shift();
  }
}
