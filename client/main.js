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
	document.onmouseup = game.pen_up;
	game.color = '#000000';
	fbini();
	send_fb_login();
	
	FB.Event.subscribe('auth.authResponseChange', function(response) {
		response = (response.status == "unknown") ? false : response;
		client_respons_fb(response);
	});
	FB.Event.subscribe('auth.login', function(response) {
		client_respons_fb(response);
	});
});