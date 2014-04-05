require.config({
  baseUrl:"jam/",
});

var p;

require(["jam", "../lib/sylvester", "../js/proto", "../js/player", "../js/level", "../js/util", "../js/players"], function(jam, syl, proto, player, level, util, player_config){
  jam.config({dataDir:"data/"});

  var g = new jam.Game(640, 480, document.body);

  var main = function() {
    g.started = false;

    var start_text = new proto.text(100, 100, "");
    start_text.font = "monospace";
    start_text.color = "rgb(255, 255, 255)";

    g.tdt = 0.0;
	var s = g.root.scene;

    var players = [];
    s.players = players;
    var i;
    for (i in player_config){
      var p = new player(player_config[i], s);
      players.push(p);
      s.add(p);
    }


    s.add(start_text);

    g.bgColor = "rgb(55, 55, 55)";

    s.on("update", function(dt) {
      var i;
      for (i in players){
        var pl = players[i];
        var b;
        for (b in pl.bullets){
          var bull = pl.bullets[b];
          if ((bull.x > 700) || (bull.x < -20) || (bull.y > 500) || (bull.y < -20)){
            console.log("Culling...");
            s.remove(pl.bullets[b]);
            delete pl.bullets[b];
            pl.bullets.splice(b, 1);
          }
          var j;
          for (j in players)
            if (j === i){
              continue;
            }
          if (jam.Rect.overlap(bull, players[j])){
            players[j].hit();
          }
        }
      }


      g.tdt += dt;

      if (g.started){

      } else {
//		if(jam.Input.justPressed("UP") || jam.Input.justPressed("SPACE")) {
		if(true) {
          g.started = true;
          g.tdt = 0.0;
        } else {
          // Not started
          start_text.alpha = g.tdt % 1;
        }
      }
    });

    s.on("render", function(ctx){
      /** /
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillRect(p.x, p.y, 1, 1);
      ctx.strokeStyle = 'rgb(255, 255, 255)';

      var radius = 5;

      var cx = p.x + 10;
      var cy = p.y + 5;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
      ctx.lineWidth = 1;
      ctx.stroke();
      /**/
    });

	g.run();
  };

  var preload = function() {
	jam.showPreloader(main);
  };

  preload();

  /**/
  window.setTimeout(function(){
    console.log("STOPPED LOGGING.");
    window.console.log = function(){
    };
  }, 30000);
  /**/
});
