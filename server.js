var connect = require('connect')
	, http = require('http')
	, mysql = require( 'db-mysql' );

var logger = require( './server/logger.js' );

var app = connect()
		.use(connect.static(__dirname + '/client'))
		.use(connect.compress())
		.use(connect.staticCache());

var db = new mysql.Database({
	hostname: 'localhost',
	user: 'montag',
	password: 'bruttoinlandsprodukt',
	database: 'dev_montag'
});

db.on('error', function(error) {
	logger.log( 0, error);
}).on('ready', function(server) {
	logger.log( 2, 'Connected to ' + server.hostname + ' (' + server.version + ')');
}).connect();

var server = http.createServer(app).listen(8080);
var io = require('socket.io').listen(server);
io.set('log level', 1 );

var connections = [];
var usercount = 0;

var game = require( './server/game.js' ).init( db, logger, io );
var protocol = require( './server/protocol.js' ).init( game, db, io );

io.sockets.on('connection', function( user ) {
	connections.push( user );

	user.data = {id: ++usercount, name: 'Player '+usercount};
	user.on( 'disconnect', function() {
		user.broadcast.emit( 'leave', user.data );
		game.disconnect(user);
		connections.splice( connections.indexOf( user ), 1 );
	});

	protocol.register( user );

	user.broadcast.emit( 'join', user.data );

	var msg = {id: user.data.id, users: []};
	for( var i = 0; i < connections.length; i++ ) msg.users.push( connections[i].data );
	user.emit( 'init', msg );
});

