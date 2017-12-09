const { Point, POSITIONING_ABSOLUTE, POSITIONING_RELATIVE } = require('./utils');

/**
 * This is the parent class for all shapes. It mostly
 * just provides a hierarchical foundation for the other shapes.
 * It also defines the base render() function.
 */
class Shape {
  /**
   * The constructor just defines some variables to null/default values.
   * @param {string} shapeName   The class name of the shape
   */
  constructor(shapeName) {
    this.children = [];
    /**
     * Each shape has its own context, which is
     * inherited from its parent (see appendChild()). This
     * behind-the-scenes ._ctx property is to falicitate
     * a getter/setter for the frontend .context property.
     */
    this._ctx = null;
    /**
     * The .positioning property determines whether coordinates
     * will be determined relative to the parent element (relative) or
     * relative to the canvas (absolute).
     */
    this.positioning = 'relative';
    this.pos = new Point(0, 0);
    this.parent = null;
    /**
     * Rotation values are in radians.
     */
    this.rotation = 0;
    /**
     * The default colors are defined here.
     * The border and shadow properties are null; if you desire to render a
     * border or shadow, assign a new instance of the Border/Shadow class
     * to these properties.
     */
    this.color = '#000000';
    this.border = null;
    this.shadow = null;
    /**
     * The ._shapeName is a programmatic way to determine what a
     * shape is.
     */
    this._shapeName = shapeName;
  }
  /**
   * This function appends a child to .children.
   */
  appendChild(child) {
    this.children.push(child);
    child.context = this.context;
    child.parent = this;
  }
  /**
   * Same as appendChild, but the child is inserted so that it recieves
   * the index specified.
   */
  insertChild(child, index) {
    this.children = this.children.slice(0, index).concat(child).concat(this.children.slice(index));
    child.context = this.context;
    child.parent = this;
  }
  /**
   * This setter function is called when the shape is added to a
   * parent; it simply sets its own ._ctx property and the .context
   * properties of all its children.
   */
  set context(ctx) {
    this._ctx = ctx;
    this.children.forEach(child => {
      child.context = ctx;
    });
  }
  get context() {
    return this._ctx;
  }
  /**
   * The render function calls _renderSelf() and render() for each
   * of this shape's children.
   * Because of the order in which everything is rendered, it ends
   * up that 2D stacking will occur in a slightly confusing order.
   * In this family tree:
   *            Scene
   *           /     \
   *     parent0      parent1
   *    /       \    /       \
   * child0 child1 child2 child3
   * The shapes will be rendered in this order:
   * Scene, parent0, child0, child1, parent1, child2, child3
   */
  render() {
    // Check if this shape has a context:
    if (this.context === null) {
      throw new Error('Shape has no context!');
    }
    // If we are rendering a Scene, clear() it first:
    if (this._shapeName === 'Scene') {
      this.clear();
    }

    // renderSelf(context) is the new rendering function, which does some basic
    // tasks outside the renderSelf function rather than making them mandatory inside.
    if (typeof this.renderSelf === 'undefined') {
      // Call _renderSelf() (deprecated) if it exists:
      if (this._renderSelf) {
        if (!this._hasWarnedRenderSelf) {
          this._hasWarnedRenderSelf = true;
          console.warn('_renderSelf() is deprecated! Use renderSelf(context, pos) instead. (' + this._shapeName + ')');
        }
        this._renderSelf();
      }
    } else {
      let c = this.context;
      c.save();
      this.transformContext();
      this.renderSelf(c, this.getPos());
      c.restore();
    }

    // Render children:
    this.children.forEach(function (child) {
      child.render();
    });
  }
  /**
   * Function to get position relative to canvas.
   * It performs the positioning checks.
   * This position is what the shape must be drawn relative to.
   */
  getPos() {
    if (this.positioning === POSITIONING_RELATIVE) {
      let absPos = new Point();
      let parentAbsPos;
      if (this.parent) {
        parentAbsPos = this.parent.getPos();
      } else {
        parentAbsPos = new Point(0, 0);
      }
      absPos.x = parentAbsPos.x + this.pos.x;
      absPos.y = parentAbsPos.y + this.pos.y;
      return absPos;
    } else if (this.positioning === POSITIONING_ABSOLUTE) {
      return this.pos;
    } else {
      throw new Error(`'${this.positioning}' positioning does not exist!`);
    }
  }
  /**
   * This is called by a render() function to position the context properly.
   */
  transformContext() {
    if (this._shapeName === 'Scene') {
      return;
    }
    this.parent.transformContext();
    /**
     * This just checks if we actually need to rotate anything.
     * (NEW in 1.3)
     */
    if (this.rotation !== 0) {
      let c = this.context, center = this.center;
      c.translate(center.x, center.y);
      c.rotate(this.rotation);
      c.translate(-center.x, -center.y);
    }
  }
}

module.exports = Shape;