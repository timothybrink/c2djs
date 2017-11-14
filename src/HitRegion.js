const Shape = require('./Shape');
const { Point } = require('./utils');

module.exports = class HitRegion extends Shape {
  /**
   * HitRegion constructor.
   * @param {Number} x Distance from left
   * @param {Number} y Distance from top
   * @param {Number} w Width of rectangle
   * @param {Number} h Height of rectangle
   */
  constructor(x, y, w, h) {
    super('HitRegion');
    this.pos = new Point(x, y);
    this.height = h;
    this.width = w;
    // Used as the event string in canvas.addEventListener.
    this.triggeredOn = 'mouseover';
    // function used as the event handler in canvas.addEventListener.
    this.handler = null;
    this.context.canvas.addEventListener(this.triggeredOn, e => {
      let pos = this.getPos();
      if (e.offsetX > pos.x && e.offsetX < pos.x + this.width && e.offsetY > pos.y && e.offsetY < pos.y + this.height) {
        this.handler(e);
      }
    });
  }
}