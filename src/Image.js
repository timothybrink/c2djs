const Shape = require('./Shape');
const { Point } = require('./utils');

class Image extends Shape {
  /**
   * The Image class allows Images to be drawn onto the Scene.
   * @param {object} img The image that will be drawn to the canvas
   * @param {number} x   x position
   * @param {number} y   y position
   * @param {number} w   Optional. Width to scale image to.
   * @param {number} h   Optional. Height to scale image to.
   */
  constructor (img, x, y, w, h) {
    super('Image');
    /**
     * The position in this class is in the top left.
     * Other than the fact that this class has an image capability,
     * it is almost identical to the Rectangle class.
     */
    this.pos = new Point(x, y);
    /**
     * Here we check if the image passed to the constructor is complete
     * (loaded). If it is not, send a warning to the console, but still
     * go ahead with setting this.image.
     * (unloaded images will not draw to the canvas)
     */
    if (img.complete === false) {
      console.warn('c2d.Image - HTMLImageElement not loaded! This may prevent image rendering.');
    }
    this.image = img;
    /**
     * If the height or width is undefined, set it to the image height/width.
     */
    if (typeof h === 'undefined') {
      h = img.height;
    }
    if (typeof w === 'undefined') {
      w = img.width;
    }
    this.height = h;
    this.width = w;
    /**
     * By default, set the color property (background color) to transparent.
     * It provides a way to set a solid background color for the image.
     */
    this.color = 'rgba(0, 0, 0, 0)';
  }
  renderSelf (c, pos) {
    if (this.shadow) {
      c.shadowBlur = this.shadow.blur;
      c.shadowColor = this.shadow.color;
      c.shadowOffsetX = this.shadow.offsetX;
      c.shadowOffsetY = this.shadow.offsetY;
    }
    // Only draw the background if it is not transparent
    if (this.color !== 'rgba(0, 0, 0, 0)') {
      c.fillStyle = this.color;
      c.fillRect(pos.x, pos.y, this.width, this.height);
    }
    if (this.border) {
      c.strokeStyle = this.border.color;
      c.strokeRect(pos.x - this.border.width / 2, pos.y - this.border.width / 2, this.width + this.border.width, this.height + this.border.width);
    }
    c.drawImage(this.image, pos.x, pos.y, this.width, this.height);
  }
  get center () {
    var pos = this.getPos();
    return new Point(pos.x + this.width / 2, pos.y + this.height / 2);
  }
}

module.exports = Image;