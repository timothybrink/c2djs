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

/**
 * THIS HAS NOT YET BEEN IMPLEMENTED ANY FURTHER THAN THE CLASS BELOW.
 * I'm thinking to add a function that determines if a given point is within that shape instance,
 * and use that for the basic mouse events (click, mouseover, mousedown, mouseup)
 * when the Scene is created, add to the context.canvas the master event listeners that use a shapes function to determine if the mouse's position
 * is within their area, and then trigger events accordingly
 * don't bother with too many events
 * add a note somewhere that using css percent vals would be result in unpredictable (to say the least) behaviour for everything.
 * Also, try to use a native method of event creation/etc.
 * e.g. new Event
 */
exports.Listener = class {
  /**
   * Creates a new Listener object to be pushed to Shape.listeners
   * @param {string}   eventType Listener type (e.g. 'click', 'hover', etc.)
   * @param {function} handler   Function to call when the event is fired
   */
  constructor (eventType, handler) {
    if (typeof eventType === 'undefined' || typeof handler === 'undefined') {
      throw new Error('Listener constructor requires two arguments!');
    } else {
      this.eventType = eventType;
      this.handler = handler;
    }
  }
}