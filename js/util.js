define([], function() {
  var util = {};

  // To nearest twentieth.
  util.approx = function(n) {
    var t = Math.floor(n);
    var p = n % 1;

    p = p * 100;
    p = (Math.floor(p / 5) * 5)/100

    t += p;

    return t;
  };

  // 360, 100, 100
  util.hsv_to_rgb = function(h, s, v){
    var r, g, b;

    if(s === 0) {
      // Achromatic
      r = g = b = v;
    } else {
      // Figure out hue 'sector'.
      var i = Math.floor(h/60);
      // A whole lot of magic.
      var f = h - i;
      /** /
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));
      /**/
      var c = v * s;
      var x = c * (1 - Math.abs(((h/60) % 2) - 1));
      var m = v - c;

      switch(i){
      case 0:
        r = c;
        g = x;
        b = 0;
        break;
      case 1:
        r = x;
        g = c;
        b = 0;
        break;
      case 2:
        r = 0;
        g = c;
        b = x;
        break;
      case 3:
        r = 0;
        g = x;
        b = c;
        break;
      case 4:
        r = x;
        g = 0;
        b = c;
        break;
      default:
        r = c;
        g = 0;
        b = x;
        break;
      }
    }

    var ret = {
      r: Math.floor(255 * (r + m)),
      g: Math.floor(255 * (g + m)),
      b:  Math.floor(255 * (g + m))
    }

    return ret;
  };

  return util;
})
