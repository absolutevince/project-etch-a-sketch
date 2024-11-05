const canvas = document.querySelector(".canvas");
const sizesBtn = document.querySelectorAll("button[data-size]");
const colorsBtn = document.querySelectorAll("button[data-color]");
const randomColorButton = document.querySelector("button[data-color='random']");

let size = 4;
let activeColor = colorsBtn[0].dataset.color;

generateGrid(size);

function generateGrid(size) {
  canvas.innerHTML = "";
  const blockSize = canvas.clientWidth / (size / 2);
  for (let i = 0; i < size ** 2; i++) {
    const div = document.createElement("div");
    div.style.width = `${blockSize / 2}px`;
    div.style.height = `${blockSize / 2}px`;
    div.className = "block";
    div.addEventListener("mouseover", () => {
      if (activeColor === "random") {
        const rnd = Math.floor(Math.random() * colorsBtn.length);
        console.log(rnd);
        div.style.backgroundColor = colorsBtn[rnd].dataset.color;
      } else {
        div.style.backgroundColor = activeColor;
      }
    });
    canvas.appendChild(div);
  }
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
