/**
 * c2d.js v1.4
 * c2d.js is a low-level 2D canvas wrapper that makes working with simple shapes
 * and sprites simple and easy. It uses a heirarchical object-oriented approach
 * to creating and manipulating shapes.
 * Ideas/todo:
 *  - Add Gradient, Polygon, and Arc (to Pen) (in order of importance) classes
 *  - Possibly introduce methods for transforming the coordinate matrix through
 *    the Scene class, or have some useful presets (e.g. designate the visible area
 *    as the 1st or 1st and 2nd quadrants of a Cartesian coordinate plane rather
 *    than the 4th).
 *  - Shadows and borders don't work together well (i.e. shadows are rendered on top of borders);
 *    try to fix this.
 */
'use strict';
window.c2d = {};
(function () {
  window.c2d.Scene = require('./Scene');
  window.c2d.Shape = require('./Shape');

  const utils = require('./utils');
  window.c2d.POSITIONING_ABSOLUTE = utils.POSITIONING_ABSOLUTE;
  window.c2d.POSITIONING_RELATIVE = utils.POSITIONING_RELATIVE;
  window.c2d.Point = utils.Point;
  window.c2d.Shadow = utils.Shadow;
  window.c2d.Border = utils.Border;
  
  /**
   * Here we define all the Shape sub-classes.
   */  
  window.c2d.Circle = require('./Circle');
  window.c2d.Rectangle = require('./Rectangle');
  window.c2d.Image = require('./Image');
  window.c2d.Text = require('./Text');
  window.c2d.HitRegion = require('./HitRegion');
  window.c2d.Pen = require('./Pen');
})();