const c2d = window.c2d || {};
let rect, scene, circle, image, isCancelled = false;
let fps = 0, noOfFrames = 0;
let img = new Image();
img.src = 'data:image/png;base64,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'; //'/archives/ancient/tb.tb/files/tb%20(110x78).png';
img.addEventListener('load', function () {
  'use strict';
  // styling
  document.body.style.margin = 0;
  
  let canvas = document.createElement('canvas');
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 4;
  document.body.append(canvas);
  scene = new c2d.Scene(canvas);
  init();
  window.requestAnimationFrame(animate);
});

function init() {
  'use strict';
  rect = new c2d.Rectangle(0, 0, 100, 50);
  rect.pos = new c2d.Point(20, 20);                          // <-- the pos is set by the constructor as specified by the first
  rect.rotation = (Math.PI / 180) * 15; //about the centre   // two arguments of the Rectangle contstructor, so this is not
  let rect2 = new c2d.Rectangle(10, 10, 80, 30);             // necessary practically speaking.
  rect2.shadow = new c2d.Shadow('white', 10, 0, 0);
  rect2.color = '#f00';
  rect2.border = new c2d.Border('blue', 2);
  rect.appendChild(rect2);
  scene.appendChild(rect);
  
  circle = new c2d.Circle(60, 60, 30);
  let rotInd = new c2d.Rectangle(10, 10, 10, 10);
  rotInd.shadow = new c2d.Shadow('#aaf', 5, 0, 0);
  let hitRegCircle = new c2d.HitRegion(0, 0, 60, 60);
  hitRegCircle.addEventListener('click', function () {
    location.reload();
  });
  hitRegCircle.addEventListener('c2d-mouseinout', function (e, type) {
    if (type === 'mousein') {
      rotInd.color = '#777';
      e.target.style.cursor = 'pointer';
    } else {
      rotInd.color = 'black';
      e.target.style.cursor = 'default';
    }
  });
  rotInd.appendChild(hitRegCircle);
  circle.appendChild(rotInd);
  circle.color = '#888';
  //   circle.border = new c2d.Border('blue', 2);
  //   circle.shadow = new c2d.Shadow('red', 10, 3, 3);
  scene.appendChild(circle);
  hitRegCircle.listen();
  
  circle.v = {
    x: 2,
    y: 4
  };
  
  image = new c2d.Image(img, 130, 10);
  image.border = new c2d.Border('blue');
  image.color = '#0f0';
  image.rotation = -0.5;
  let box = new c2d.Rectangle(5, 5, 50, 50);
  box.color = 'red';
  box.rotation = 0.5;
  image.appendChild(box);
  let rect3 = new c2d.Rectangle(10, 10, 30, 10);
  box.appendChild(rect3);
  rect3.rotation = 0.5;
  scene.insertChild(image, 1);

  let text = new c2d.Text('testing', 100, 200);
  text.fontSize = '20px';
  text.fontFamily = 'serif';
  text.color = 'red';
  text.rotation = 0.1;
  text.border = new c2d.Border('blue');
  text.shadow = new c2d.Shadow('green', 10, 10, 10);
  scene.appendChild(text);

  let hitRegRect = new c2d.Rectangle(200, 200, 200, 200);
  hitRegRect.color = 'black';
  let hitReg = new c2d.HitRegion(0, 0, 200, 200);
  hitReg.addEventListener('click', function () {
    location.reload();
  });
  hitReg.addEventListener('c2d-mouseinout', function (e, type) {
    if (type === 'mousein') {
      hitRegRect.color = '#777';
      e.target.style.cursor = 'pointer';
    } else {
      hitRegRect.color = 'black';
      e.target.style.cursor = 'default';
    }
  });
  hitRegRect.appendChild(hitReg);
  scene.appendChild(hitRegRect);
  hitReg.listen();
  
  let pen = new c2d.Pen(2, '#ff0000');
  pen.up()
    .to(20, 327)
    .down()
    .to(10, 337)
    .by(10, 10)
    .by(-10, 5);
  scene.appendChild(pen);

  // background color
  scene.backgroundColor = '#e0e0e0';
}

function moveCircle() {
  'use strict';
  circle.rotation += (Math.PI / 180) * 1;
  if (circle.pos.y - circle.r <= 0 || circle.pos.y + circle.r >= circle.context.canvas.height) {
    circle.v.y = -circle.v.y;
  }
  if (circle.pos.x <= 0 + circle.r || circle.pos.x + circle.r >= circle.context.canvas.width) {
    circle.v.x = -circle.v.x;
  }
  /*
  if (circle.v.y > 0) {
    circle.v.y *= 1.02;
  } else {
    circle.v.y *= .98;
  }
  */
  // apply speed
  circle.pos.x += circle.v.x;
  circle.pos.y += circle.v.y;
}

function animate() {
  'use strict';
  // rect.pos.x += speed;
  moveCircle();
  scene.render();
  if (!isCancelled) {
    noOfFrames++;
    window.requestAnimationFrame(animate);
  }
}

function calcFPS () {
  'use strict';
  fps = noOfFrames;
  noOfFrames = 0;
}
window.setInterval(calcFPS, 1000);