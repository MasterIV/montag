// dependencys
var game = null
  , db = null
  , fb= null
  , io = null;

var protocol = {
	/**
	 * Initializing function for dependency injection
	 */
	init: function( setgame, setdb, setio, setfbfunk ) {
		db = setdb;
		game = setgame;
		io = setio;
		fb = setfbfunk;
		return this;
	},

	/**
	 * This function reggisters all commands on a new connected socket
	 */
	register: function( user ) {
		for( var f in this.commands )
			user.on( f, this.commands[f] );
	},

	/**
	 * Command callbacks for all commands the server is able to handle
	 */
	commands: {
		login : function (data) {
			// User wants to login using facebook
			fb.login( this, data );
		},

		name: function( data ) {
			// User wants to change his name
			this.data.name = data.name;
			io.sockets.emit( 'name', {user: this.data.id, name: data.name});
			if( this.data.fbuid ) fb.setname( this.data.fbuid, data.name );
		},

		say: function( data ) {
			// User wrote something in the chat
			this.broadcast.emit( 'say', {user: this.data.id, text: data});
			game.check( this, data );
		},

		painter_request: function( data ) {
			// User checked or unchecckd the painter checkbox
			game.request( this, data );
		},

		screen_clear: function( data ) {
			// User pressed clrear screen button
			if( game.ispainter( this ))
				this.broadcast.emit( 'screen_clear', data );
		},

		color_set: function( data ) {
			// User picked another color
			if( game.ispainter( this )){
				game.color = data.color;
				io.sockets.emit( 'color_set', data );
			}
		},

		pen_down: function( data ) {
			// User startet drawing by pressing the mousbutton on the canvas
			if( game.ispainter( this ))
				this.broadcast.emit( 'pen_down', data );
		},

		pen_move: function( data ) {
			// User moved the mouse to draw
			if( game.ispainter( this ))
				this.broadcast.emit( 'pen_move', data );
		}
	}
}

module.exports = protocol;
