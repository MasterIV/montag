var socket;
var self;
var mouse = { x: 0, y: 0 };

function getcoords( ev ) {
	mouse.x = ev.layerX;
	mouse.y = ev.layerY;
}

$( function() {
	game.canvas = document.getElementById( 'game_screen' );
	game.ctx = game.canvas.getContext( '2d' );

	socket = io.connect('http://172.16.22.58:8080/');
	canvas.onmousemove = getcoords;

	socket.on( 'connect', function() {
		$( '#chat_users div' ).remove();
		$( '#chat_content > div > div' ).remove();
	});

	for( var i in protocol )
		socket.on( i, protocol[i] );
});