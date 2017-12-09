const Shape = require('./Shape');
const { Point } = require('./utils');

/**
 * Utility function to find last member of array.
 * @param {Array} arr Input array
 */
function arrayLast(arr) {
  return arr[arr.length - 1];
}

class PathSection {
  /**
   * PathSection constructor
   * @param {String} action The type of action performed on the Pen
   * @param {Point} pos The point where this action will end
   * @param {Boolean} penDown Whether or not the pen is currently down
   */
  constructor(action, pos = new Point(), penDown = true) {
    this.action = action;
    this.pos = pos;
    this.penDown = penDown;
  }
}

module.exports = class Pen extends Shape {
  /**
   * Pen.constructor
   * @param {String} width The width of the line.
   * @param {String} color The color of the line.
   */
  constructor(width, color) {
    super('Pen');

    this.lineWidth = width;
    this.color = color;

    this.pos = new Point();

    this._path = [new PathSection('start', this.pos)];
  }
  /**
   * renderSelf
   * @param {CanvasRenderingContext2D} c 
   * @param {Point} pos 
   */
  renderSelf(c, pos) {
    c.lineWidth = this.lineWidth;
    c.strokeStyle = this.color;

    if (this.shadow) {
      c.shadowBlur = this.shadow.blur;
      c.shadowColor = this.shadow.color;
      c.shadowOffsetX = this.shadow.offsetX;
      c.shadowOffsetY = this.shadow.offsetY;
    }

    this._path[0].pos = pos;
    c.beginPath();
    this._path.forEach(this._pathSectionDrawer(c, pos));
    c.stroke();
  }
  /**
   * Closure returning function to draw path section.
   * @param {CanvasRenderingContext2D} c The canvas context
   * @param {Point} pos The absolute position of the Path object
   */
  _pathSectionDrawer(c, pos) {
    return function (pathSection, index, path) {
      if (pathSection.action === 'penState'|| pathSection.action === 'start') return;
      if (pathSection.penDown) {
        c.lineTo(pos.x + pathSection.pos.x, pos.y + pathSection.pos.y);
      } else {
        c.moveTo(pos.x + pathSection.pos.x, pos.y + pathSection.pos.y);
      }
    };
  }
  up() {
    this._path.push(new PathSection('penState', arrayLast(this._path).pos, false));
    return this;
  }
  down() {
    this._path.push(new PathSection('penState', arrayLast(this._path).pos, true));
    return this;
  }
  to(x, y) {
    this._path.push(new PathSection('to', new Point(x, y), arrayLast(this._path).penDown));
    return this;
  }
  by(x, y) {
    let prev = arrayLast(this._path);
    this._path.push(new PathSection('by', new Point(x + prev.pos.x, y + prev.pos.y), prev.penDown));
    return this;
  }
  get center() {
    return this.getPos();
  }
};