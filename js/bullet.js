define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var bullet = function(x, y, r, g, b, vx, vy){
    jam.Sprite.call(this, x, y);

    var b_img = new proto.sq(2, 255, 255, 255);

    this.setImage(b_img.toDataURL(), 2, 2);

    this.velocity.x = vx;
    this.velocity.y = vy;
  };

  bullet.prototype = new jam.Sprite(0, 0);

  return bullet;
});
