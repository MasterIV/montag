var game = require( './game.js' );

var protocol = {
	name: function( user, data, io ) {
		io.sockets.emit( 'name', { user: user.data.id, name: data });
	},

	say: function( user, data, io ) {
		user.broadcast.emit( 'say', { user: user.data.id, text: data });
	},

	painter_request: function( user, data, io ) {
		game.request(user);
	},

	screen_clear: function( user, data, io ) {
		//if( user.data.id == game.painter.id )
			user.broadcast.emit( 'screen_clear', data );
	},

	color_set: function( user, data, io ) {
		//if( user.data.id == game.painter.id )
			user.broadcast.emit( 'color_set', data );
	},

	pen_down: function( user, data, io ) {
		//if( user.data.id == game.painter.id )
			user.broadcast.emit( 'pen_down', data );
	},

	pen_move: function( user, data, io ) {
		//if( user.data.id == game.painter.id )
			user.broadcast.emit( 'pen_move', data );
	}
}

module.exports = protocol;

