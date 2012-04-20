var connect = require('connect')
	, http = require('http');

var app = connect()
		.use(connect.static(__dirname + '/client'))
		.use(connect.compress())
		.use(connect.staticCache());

var server = http.createServer(app).listen(8080);
var io = require('socket.io').listen(server);

var connections = [];
var protocol = require( './server/protocol.js' );
var usercount = 0;

protocol.io = io;
io.sockets.on('connection', function( user ) {
	connections.push( user );

	user.data = { id: ++usercount, name: 'Player '+usercount };
	user.on( 'disconnect', function() {
		user.broadcast.emit( 'leave', user.data );
		connections.splice( connections.indexOf( user ), 1 );
	});

	// black magic - do not touch
	// some very evil things according to javascript scopes...
	// they drive me crazy...
	for( var f in protocol ) (function() {
		var func = protocol[f];
		user.on( f, function( data ) {
			func( user, data, io );
		});
	})();

	user.broadcast.emit( 'join', user.data );

	var msg = { id: user.data.id, users: [] };
	for( var i = 0; i < connections.length; i++ ) msg.users.push( connections[i].data );
	user.emit( 'init', msg );
});

