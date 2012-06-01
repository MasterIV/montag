// load the required nodejs modules
var connect = require('connect')
	, http = require('http')
	, mysql = require( 'mysql' );

// load own logger and congiguration
var logger = require( './server/logger.js' )
	, config = require( './server/config.js' );

// configure http server
var app = connect()
		.use(connect.static(__dirname + '/client'))
		.use(connect.compress())
		.use(connect.staticCache());

// init db, http server and websocket
var db = mysql.createClient( config );
var server = http.createServer(app).listen(8080);
var io = require('socket.io').listen(server);

// configure loglevel
io.set('log level', 1 );
logger.level = 2;

var connections = [];
var usercount = 0;

// init facebook, game and protocol object by injecting dependencys
var fb = require( './server/fb.js' ).init( db );
var game = require( './server/game.js' ).init( db, logger, io, fb );
var protocol = require( './server/protocol.js' ).init( game, db, io, fb );

// handler for incoming connections
io.sockets.on('connection', function( user ) {
	connections.push( user );

	// init user data
	user.data = {id: ++usercount, name: 'Player '+usercount, points: 0 };

	// bind disconnect handler
	user.on( 'disconnect', function() {
		user.broadcast.emit( 'leave', user.data );
		game.disconnect(user);
		connections.splice( connections.indexOf( user ), 1 );
	});

	// register protocol and send join message
	protocol.register( user );
	user.broadcast.emit( 'join', user.data );

	// send welcome message
	var msg = {id: user.data.id, users: [], color: game.color, countdown: game.countdown };
	for( var i = 0; i < connections.length; i++ ) msg.users.push( connections[i].data );
	user.emit( 'init', msg );
});

