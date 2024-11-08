import { colorButtons, colorPickerElement } from "../utils/domElements";

export default (function colorPicker() {
  let COLORS_ARRAY = [];
  let SELECTED_COLOR = "";

  function ColorObject(hex, id = COLORS_ARRAY.length) {
    let selectStatus = false;
    return {
      hex,
      selectStatus,
      id,
    };
  }

  function selectColor(colorId) {
    COLORS_ARRAY = COLORS_ARRAY.map((clr) => {
      if (clr.id === colorId) {
        clr.selectStatus = true;
      } else {
        clr.selectStatus = false;
      }
      return clr;
    });
  }

  function setButtonColors() {
    if (COLORS_ARRAY.length === 0) return;
    const temp = [...COLORS_ARRAY];
    colorButtons.forEach((btn) => {
      if (temp.length === 0) return;
      const color = temp.shift();
      btn.dataset.color = color.hex;
      btn.dataset.id = color.id;
      btn.style.backgroundColor = color.hex;
    });
  }

  function getSelectedColor() {
    let selectedColor = "";
    COLORS_ARRAY.forEach((clr) => {
      if (clr.selectStatus === true) {
        selectedColor = clr.hex;
      }
    });
    return selectedColor;
  }

  return {
    getSelectedColor,
    init: () => {
      // INIT COLOR BUTTONS
      setButtonColors();

      colorButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!btn.dataset.color) return;
          selectColor(+btn.dataset.id);
        });
      });

      colorPickerElement.addEventListener("change", () => {
        const color = ColorObject(colorPickerElement.value);
        COLORS_ARRAY.push(color);
        selectColor(color.id);
        setButtonColors();
      });
    },
  };
})();
