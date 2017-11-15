exports.POSITIONING_ABSOLUTE = 'absolute';
exports.POSITIONING_RELATIVE = 'relative';
  
exports.Point = class {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
};

exports.Border = class {
  /**
   * Create a new Border object to be assigned to an Shape.border property
   * @param {string} color The border color
   * @param {number} width The border width
   */
  constructor (color = '#000', width = 1) {
    this.color = color;
    this.width = width;
  }
};

exports.Shadow = class {
  /**
   * Creates a new Shadow object to be assigned to an Shape.shadow property
   * @param {string} color         The shadow color
   * @param {number} blur          The blur amount; context.shadowBlur
   * @param {number} offsetX       Shadow offset x; context.shadowOffsetX
   * @param {number} offsetY       Shadow offset y; context.shadowOffsetY
   */
  constructor (color = '#000', blur = 0, offsetX = 0, offsetY = 0) {
    this.color = color;
    this.blur = blur;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
};