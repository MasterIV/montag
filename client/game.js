var game = {
	canvas: null,
	before: {x: 0, y: 0},
	mouse: {x: 0, y: 0},
	drawing: false,
	ispainter: false,
	interval: null,
	countdown: 0,

	allcolor : ['#FF0000', '#00FFFF', '#C0C0C0', '#0000FF',
							'#808080', '#0000A0', '#000000', '#ADD8E6',
							'#FFA500', '#800080', '#FFFF00', '#B27A11' ,
							'#00FF00', '#008000', '#FF00FF', '#808000'],

	draw_line: function( x, y ) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.color;
		this.ctx.moveTo( this.before.x, this.before.y );
		this.ctx.lineTo( x, y );
		this.ctx.stroke();
		this.before.x = x;
		this.before.y = y;
	},

	start: function( timer ) {
		this.countdown = timer ? timer : 120;
		this.tick();
		this.interval = setInterval( function() { game.tick(); }, 1000 );
	},

	tick: function() {
		var min = (this.countdown/60)|0;
		var sec = (this.countdown%60)+'';
		if( sec.length == 1 ) sec = '0'+sec;

		$( '#countdown' ).text( min+':'+sec );

		if( this.countdown < 1 )
			clearInterval( this.interval );
		this.countdown--;

	},

	end: function() {
		clearInterval( this.interval );
		$( '#countdown' ).text( '0:00' );
	},

	screen_clear: function() {
		this.canvas.width = this.canvas.width;
	},

	pen_down: function( ev ) {
		if(game.ispainter){
				var x = ev.layerX;
				var y = ev.layerY;

				game.before.x = x;
				game.before.y = y;
				game.drawing = true;

				socket.emit( 'pen_down', game.before );
				setTimeout( game.pen_get, 50 );
		}
	},

	pen_get: function() {
		if(game.ispainter){
			if( !game.drawing ) return;

			if( game.mouse.x != game.before.x || game.mouse.y != game.before.y ) {
				game.draw_line(game.mouse.x, game.mouse.y);
				socket.emit( 'pen_move', game.before );
			}

			setTimeout( game.pen_get, 50 );
		}
	},

	pen_move: function( ev ) {
		if(game.ispainter){
			game.mouse.x = ev.layerX;
			game.mouse.y = ev.layerY;
		}
	},

	pen_up: function( ev ) {
		game.drawing = false;
	}
}

