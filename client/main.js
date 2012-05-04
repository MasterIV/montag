var socket;
var self;

$( function() {
	game.canvas = document.getElementById( 'game_screen' );
	game.ctx = game.canvas.getContext( '2d' );

	socket = io.connect('/');

	socket.on( 'connect', function() {
		$( '#chat_users div' ).remove();
		$( '#chat_content > div > div' ).remove();
	});

	for( var i in protocol )
		socket.on( i, protocol[i] );

	game.canvas.onmousemove = game.pen_move;
	game.canvas.onmousedown = game.pen_down;
	game.canvas.onmouseup = game.pen_up;
	game.ctx.strokeStyle = '#000000';

});