const Shape = require('./Shape');
const { Point } = require('./utils');

/**
 * Block comments from here to the end of the exports.Rectangle
 * class detail what is required in a new Shape class, using
 * Rectangle as an example.
 */
/**
 * All shapes must extend exports.Shape.
 */
// A simple Rectangle shape class
class Rectangle extends Shape {
  /** 
   * The constructor defines all the Shape's properties.
   * The constructor must call super(shapeName).
   * The only mandatory property that the constructor has to set
   * is .pos, which is set to a Point as explained below.
   */
  constructor (x, y, w, h) {
    /**
     * The shapeName that must be passed to the super() function
     * is just the class name (here, 'Rectangle').
     */
    super('Rectangle');
    /**
     * The position (.pos) in any shape is at a location determined
     * by the shape. This position is what children and the shape
     * itself are rendered relative to. In this case, the position
     * is in the top left corner of the visible rectangle (but inside
     * the border).
     * This is a mandatory property.
     */
    this.pos = new Point(x, y);
    /**
     * Other rendering properties can also be set, as shown here.
     */
    this.height = h;
    this.width = w;
  }
  /**
   * If you wish your shape to be rendered, you must have a
   * _renderSelf() function defined here, in your class definition.
   */
  _renderSelf () {
    /**
     * The conventions for context and position within _renderSelf()
     * are as shown here. This is both to avoid multiple function/
     * getter calls, as well as for brevity and simplicity.
     * Also, when rendering areas and borders, try to make the code
     * as simple and short as possible.
     */
    var pos = this.getPos(), c = this.context;
    /**
     * Save and restore the context as shown to avoid conflicts.
     * Make sure it is saved before you make any changes to it.
     */
    c.save();
    
    /**
     * Call this.transformContext() to rotate the context properly.
     * It must be called after you save the context and before you
     * draw anything.
     */
    this.transformContext();
    
    /**
     * Note that the shadow and border are drawn if they are not null
     */
    if (this.shadow) {
      c.shadowBlur = this.shadow.blur;
      c.shadowColor = this.shadow.color;
      c.shadowOffsetX = this.shadow.offsetX;
      c.shadowOffsetY = this.shadow.offsetY;
    }
    /**
     * Borders must be rendered immediately outside of the shape's area.
     * That is, they cannot overlap with the shape's area color, nor can
     * there be any gap between the border and the area.
     */
    if (this.border) {
      c.strokeStyle = this.border.color;
      c.lineWidth = this.border.width;
      c.strokeRect(pos.x - (this.border.width / 2), pos.y - (this.border.width / 2), this.width + this.border.width, this.height + this.border.width);
    }
    /**
     * Note that the area is drawn regardless of if the user wants it
     * there or not. If you want, you can check to see if the color is
     * transparent (as in the Image class) for performance reasons,
     * but that is not mandatory.
     */
    c.fillStyle = this.color;
    c.fillRect(pos.x, pos.y, this.width, this.height);
    c.restore();
  }
  /**
   * You must have a center getter that gives the centre of your object.
   * (using getPos() to get the absolute position)
   */
  get center () {
    var pos = this.getPos();
    return new Point(pos.x + this.width / 2, pos.y + this.height / 2);
  }
}

module.exports = Rectangle;