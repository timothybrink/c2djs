const Shape = require('./Shape');
const { Point } = require('./utils');

// The Scene class.
class Scene extends Shape {
  /**
   * The constructor for the Scene class takes a non-mandatory
   * canvas argument, which is used to get and set a context.
   * However, the context must be set before rendering or an
   * error is thrown.
   */
  constructor (canvas) {
    super('Scene');
    /**
     * The default color and rotation properties are useless in the Scene
     * class, so they are set to null.
     */
    this.color = null;
    this.rotation = null;
    /**
     * This backgroundColor property is the substitute for the color prop.
     */
    this.backgroundColor = 'rgba(0, 0, 0, 0)';
    this.context = canvas.getContext('2d');
  }
  /**
   * This function clears the Scene's canvas completely; it is
   * either called by Scene.prototype.render() or manually.
   */
  clear () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }
  _renderSelf () {
    var c = this.context;
    c.save();
    c.fillStyle = this.backgroundColor;
    c.fillRect(0, 0, c.canvas.width, c.canvas.height);
    c.restore();
  }
}

module.exports = Scene;