var connect = require('connect')
	, http = require('http')
	, https = require('https')
	, mysql = require( 'mysql' );

var logger = require( './server/logger.js' )
  , config = require( './server/config.js' );

var app = connect()
		.use(connect.static(__dirname + '/client'))
		.use(connect.compress())
		.use(connect.staticCache());

var db = mysql.createClient( config );
var server = http.createServer(app).listen(8080);

var io = require('socket.io').listen(server);

io.set('log level', 1 );
logger.level = 2;

var connections = [];
var usercount = 0;

var fbfunk = require( './server/fb.js' ).init( https, logger, db );
var game = require( './server/game.js' ).init( db, logger, io, https, fbfunk );
var protocol = require( './server/protocol.js' ).init( game, db, io, fbfunk );

io.sockets.on('connection', function( user ) {
	connections.push( user );

	user.data = {id: ++usercount, name: 'Player '+usercount, points: 0 };
	user.on( 'disconnect', function() {
		user.broadcast.emit( 'leave', user.data );
		game.disconnect(user);
		connections.splice( connections.indexOf( user ), 1 );
	});

	protocol.register( user );
	user.broadcast.emit( 'join', user.data );

	var msg = {id: user.data.id, users: [], color: game.color, countdown: game.countdown };
	for( var i = 0; i < connections.length; i++ ) msg.users.push( connections[i].data );
	user.emit( 'init', msg );
});


