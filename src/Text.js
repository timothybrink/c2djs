const Shape = require('./Shape');
const { Point } = require('./utils');

module.exports = class Text extends Shape {
  constructor (text = '', x = 0, y = 0) {
    super('Text');
    this.pos = new Point(x, y);
    this.text = text;
    this.fontSize = '12px';
    this.fontFamily = 'Arial';
  }
  _renderSelf () {
    var pos = this.getPos(), c = this.context;
    c.save();
    this.transformContext();
    c.font = this.fontSize + ' ' + this.fontFamily;
    if (this.border) {
      c.strokeStyle = this.border.color;
      // lineWidth does not appear to work, but it does not seem entirely necessary.
      c.lineWidth = this.border.width;
      c.strokeText(this.text, pos.x, pos.y);
    }
    c.fillStyle = this.color;
    c.fillText(this.text, pos.x, pos.y);
    c.restore();
  }
  get center () {
    /**
     * This doesn't actually return the center, but whatever. I don't know how I would get
     * the actual center, not to mention the fact that I don't think Text is the sort of 
     * shape with which it really matters.
     */
    return this.getPos();
  }
};