export default class Color {
  constructor(hex, id) {
    this.hex = hex;
    this.id = id;
    this.activeStatus = false;
  }

  setActive() {
    this.activeStatus = true;
  }

  setInactive() {
    this.activeStatus = false;
  }
}
