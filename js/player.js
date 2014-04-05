define(["jam", "./proto", "./util", "./bullet"], function(jam, proto, util, bullet) {
  var w = 20;
  var h = 10;

  var player = function(o, s){
	jam.Sprite.call(this, o.x, o.y);
    var p_img = new proto.iso(w, h, o.r, o.g, o.b);

    this.setImage(p_img.toDataURL(), w, h);

    this.justHit = false;

    this.max_speed = 100;
    this.min_speed = -100;
    this.speed = 0;
    this.health = 3;
    this.bullets = [];
    this.s = s;

    this.on("update", function(dt) {
      if (this.speed !== 0){
        var fac = this.speed/Math.abs(this.speed);
        this.speed = Math.abs(this.speed) - 1;
        this.speed *= fac;
      }
      /**/
	  if (jam.Input.down(o.c.u)){
        this.speed = Math.min(this.speed + 2, this.max_speed);
	  }
	  if (jam.Input.down(o.c.d)){
        this.speed = Math.max(this.speed - 2, this.min_speed);
	  }
	  if (jam.Input.down(o.c.l)){
        this.angle -= 10;
	  }
	  if (jam.Input.down(o.c.r)){
        this.angle += 10;
	  }

      var v = {};
      var rad = Math.radians(this.angle)
      v.x = Math.sin(rad);
      v.y = -Math.cos(rad);

      this.velocity.x = v.x * this.speed;
      this.velocity.y = v.y * this.speed;

	  if (jam.Input.justPressed(o.c.s)){
        var mag = 200;

        var bx = this.x + 10 + (v.x * 5);
        var by = this.y + 5 + (v.y * 5);

        var b = new bullet(bx, by, o.r, o.g, o.b, v.x * mag, v.y * mag);
        //b.ship = this;
        this.bullets.push(b);
        s.add(b);
	  }

      if (this.justHit){
        if (this.hitTimer <= 0){
          this.alpha = 1;
          this.justHit = 0;
        } else {
          this.hitTimer -= dt;
          this.alpha = this.hitTimer % 1;
        }
      }

      /**/
    });
  };

  player.prototype = new jam.Sprite(0, 0);

  player.prototype.hit = function(){
    if (this.justHit){
      return;
    }
    console.log(this.health);
    if (this.health <= 1){
      this.s.remove(this);
      this.s.players.splice(this.s.players.indexOf(this), 1);
    } else {
      this.health -= 1;
      this.justHit = true;
      this.hitTimer = 2;
    }
  };

  return player;
});
