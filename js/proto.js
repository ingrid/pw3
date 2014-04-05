// A collection of helpful snippets for prototyping in jam.

define(["jam"], function(jam) {
  Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };

  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };

  var proto = {};
  proto.rect = function(w, h, r, g, b) {
    if (r == undefined){
      r = g = b = 0;
    }

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);

    return canvas;
  };

  proto.sq = function(s, r, g, b) {
    return proto.rect(s, s, r, g, b);
  };

  proto.cir = function(r, r, g, b) {

  };

  proto.text = function(x, y, txt){
    jam.Sprite.call(this, x, y);

    this.text = txt || "";
    this.font = "";
    this.color = ""
    this.alpha = 1.0;

    this.render = function(context, camera){
	  if(!this.visible) { return; }

      context.save();

	  if(this.alpha !== 1.0){ context.globalAlpha = this.alpha; }

      context.font = this.font;
      context.fillStyle = this.color;

      context.fillText(this.text,
                       this.x,
                       this.y);

	context.restore();
    };
  };

  proto.text.prototype = new jam.Sprite(0, 0);

  proto.iso = function(w, h, r, g, b){
    // Isosceles
    if (r == undefined){
      r = g = b = 0;
    }

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(Math.floor(w/2), 0);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    return canvas;
  }

  return proto;
});
