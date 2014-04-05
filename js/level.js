define(["jam", "../js/proto"], function(jam, proto) {
  // Tile size;
  var s = 44;
  var ps = 100;

  var pipe = function(x, y, l, o){
	jam.Sprite.call(this, x, y);
    var sprite = new proto.rect(s, s * l, 0, 255, 255).toDataURL();
    this.setImage(sprite, s, s * l);

    var tx;
    if (o){
      ty = Math.floor((s * l) / 2);
    } else {
      ty = -Math.floor((s * l) / 2);
    }

    var trim = new jam.Sprite(-32, ty);
    var ts = new proto.rect(s + 20, 20, 0, 255, 255).toDataURL();
    trim.setImage(ts, s + 20, 20);

    this.add(trim);
    console.log(ty);
  }

  pipe.prototype = new jam.Sprite(0, 0);

  var level = function(g, p){
    this.pipes = [];
    this.g = g;
    this.curr = {
      x: 0,
      g: 5
    };

    var scene = g.root.scene;

    this.grass = new jam.Sprite(p.x - 320 - 20, 460);
    var g_img = new proto.rect(680, 20, 0, 255, 0);
    this.grass.setImage(g_img.toDataURL(), 680, 40);
    this.grass.immovable = true;
    var grass = this.grass;

    scene.add(this.grass);

    this.ciel = new jam.Sprite(-20, 0);
    var s_img = new proto.rect(680, 20, 0, 0, 255);
    this.ciel.setImage(s_img.toDataURL(), 680, 40);
    this.ciel.immovable = true;
    var ciel = this.ciel;

    scene.add(this.ciel);

    this.s = scene;

    this.g.on("update", function(dt) {
      var nx = p.x - 320 - 20;
      grass.x = nx;
      ciel.x = nx;
    });
  };

  level.prototype.gen_pipe = function(){
    console.log("Generating a pipe pair.");
    // var d = Math.floor(Math.random()*7) - 3;
    var d = Math.floor(Math.random()*3) + 1;

    if (Math.random() > 0.5){
      d = -d;
    }

    var g = this.curr.g + d;
    if (g <= 0){
      if (this.curr.g !== 1){
        g = 1;
      } else {
        g = 2;
      }
    } else if (g >= 7) {
      if (this.curr.g !== 6){
        g = 6;
      } else {
        g = 5;
      }
    }

    var n = {
      x: this.curr.x + (s * 3),
      g: g
    };

    var top = new pipe(n.x, 20, n.g, 1);
    var bot = new pipe(n.x, (s * (n.g + 3)) + 20, 10 - (n.g + 3), 0);

    this.s.add(top);
    this.s.add(bot);

    this.pipes.push(top);
    this.pipes.push(bot);

    this.curr = n;
  };

  level.prototype.cull = function(x, s){
    var p;
    for (p in this.pipes){
      if (this.pipes[p].x <= x - 400){
        s.remove(this.pipes[p]);
        delete this.pipes[p];
        this.pipes.splice(p, 1);
      }
    }
  };

  var cloud = function(x, y){
  }

  cloud.prototype = new jam.Sprite(0, 0);

  return level;
});
