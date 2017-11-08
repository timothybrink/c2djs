const Shape = require('./Shape');
const { Point } = require('./utils');

module.exports = class Text extends Shape {
  constructor (x, y, text = '') {
    super('Text');
    this.pos = new Point(x, y);
    this.text = text;
    this.font = 'Arial';
  }
  _renderSelf () {
    var pos = this.getPos(), c = this.context;
    // TODO: render
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