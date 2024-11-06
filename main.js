const canvas = document.querySelector(".canvas");
const sizesBtn = document.querySelectorAll("button[data-size]");
const colorsBtn = document.querySelectorAll("button[data-color]");
const randomColorButton = document.querySelector("button[data-color='random']");

let size = 4;
let activeColor = colorsBtn[0].dataset.color;

generateGrid(size);

function generateGrid(size) {
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  canvas.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.className = "grid-row";
    row.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let j = 0; j < size; j++) {
      const div = document.createElement("div");
      div.className = "block";
      addHoverEvent(div);
      row.appendChild(div);
    }
    canvas.appendChild(row);
  }
}

function addHoverEvent(element) {
  element.addEventListener("mouseover", () => {
    if (activeColor === "random") {
      const rnd = Math.floor(Math.random() * colorsBtn.length);
      element.style.backgroundColor = colorsBtn[rnd].dataset.color;
    } else {
      element.style.backgroundColor = activeColor;
    }
  });
}

colorsBtn.forEach((button) => {
  if (button.dataset.color !== "random") {
    button.style.backgroundColor = button.dataset.color;
  }
  button.addEventListener("click", () => (activeColor = button.dataset.color));
});

sizesBtn.forEach((button) => {
  button.addEventListener("click", () => {
    size = Number(button.dataset.size);
    generateGrid(size);
  });
});
