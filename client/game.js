var game = {
	canvas: null,
	before: {x: 0, y: 0},
	drawing: false,
	ispainter: false,
	allcolor : ['#FF0000','#00FFFF', '#C0C0C0',
							'#0000FF', '#808080' , '#0000A0', '#000000',
							'#ADD8E6', '#FFA500' , '#800080', '#A52A2A',
							'#FFFF00', '#800000' , '#00FF00', '#008000',
							'#FF00FF', '#808000'],
	draw_line: function( x, y ) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.color;
		this.ctx.moveTo( this.before.x, this.before.y );
		this.ctx.lineTo( x, y );
		this.ctx.stroke();
		this.before.x = x;
		this.before.y = y;
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
		}
	},

	pen_move: function( ev ) {
		if(game.ispainter){
			var x = ev.layerX;
			var y = ev.layerY;

			if( !game.drawing ) return;
			if( x == game.before.x && y == game.before.y ) return;

			game.draw_line(x, y);
			socket.emit( 'pen_move', game.before );
		}
	},

	pen_up: function( ev ) {
		game.drawing = false;
	}
}

