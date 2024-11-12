import pubsub from "../module/pubsub";
import Color from "./Color";

export default class ColorPallete {
  static #COLOR_ARRAY = [];

  static init() {
    pubsub.sub("add_color", this.addColor.bind(this));
    pubsub.sub("select_color", this.selectColor.bind(this));
    this.addColor("#000000");
    this.selectColor(0);
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
    if (this.#COLOR_ARRAY.length === 11) {
      const c = new Color(color, this.selectedColor().id());
      this.replaceActiveColor(c);
      this.selectColor(c.id);
      console.log(this.#COLOR_ARRAY);
    } else {
      this.#COLOR_ARRAY.push(new Color(color, this.#COLOR_ARRAY.length));
    }
    pubsub.publish("color_added", this.#COLOR_ARRAY);
  }

  static selectedColor() {
    return {
      hex: () =>
        this.#COLOR_ARRAY.filter((color) => color.activeStatus).shift().hex,
      id: () =>
        this.#COLOR_ARRAY.filter((color) => color.activeStatus).shift().id,
    };
  }

  static replaceActiveColor(color) {
    this.#COLOR_ARRAY.splice(color.id, 1, color);
  }
}
