var game = {
	canvas: null,
	before: {x: 0, y: 0},
	drawing: false,


	draw_line: function( x, y ) {
		this.ctx.beginPath();
		this.ctx.moveTo( this.before.x, this.before.y );
		this.ctx.lineTo( x, y );
		this.ctx.stroke();
		this.before.x = x;
		this.before.y = y;
	},

	pen_down: function( ev ) {
		var x = ev.layerX;
		var y = ev.layerY;

		game.before.x = x;
		game.before.y = y;
		game.drawing = true;

		socket.emit( 'pen_down', game.before );
	},

	pen_move: function( ev ) {
		var x = ev.layerX;
		var y = ev.layerY;

		if( !game.drawing ) return;
		if( x == game.before.x && y == game.before.y ) return;

		game.draw_line(x, y);
		socket.emit( 'pen_move', game.before );
	},

	pen_up: function( ev ) {
		game.drawing = false;
	}
}

