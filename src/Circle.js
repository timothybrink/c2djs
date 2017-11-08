const Shape = require('./Shape');
const { Point } = require('./utils');

class Circle extends Shape {
    constructor (x, y, r) {
      super('Circle');
      // Position (in this class the position is in the centre of the circle)
      this.pos = new Point(x, y);
      // Radius
      this.r = r;
    }
    _renderSelf () {
      var pos = this.getPos(), c = this.context;
      c.save();
      this.transformContext();
      if (this.shadow) {
        c.shadowBlur = this.shadow.blur;
        c.shadowColor = this.shadow.color;
        c.shadowOffsetX = this.shadow.offsetX;
        c.shadowOffsetY = this.shadow.offsetY;
      }
      if (this.border) {
        c.beginPath();
        c.arc(pos.x, pos.y, this.r + this.border.width / 2, 0, 2 * Math.PI);
        c.closePath();
        c.strokeStyle = this.border.color;
        c.lineWidth = this.border.width;
        c.stroke();
      }
      c.fillStyle = this.color;
      c.beginPath();
      c.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
      c.closePath();
      c.fill();
      c.restore();
    }
    get center () {
      return this.getPos();
    }
  }

module.exports = Circle;