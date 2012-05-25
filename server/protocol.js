
var game = null
  , db = null
  , fb= null
  , io = null;

var protocol = {
	init: function( setgame, setdb, setio, setfbfunk ) {
		db = setdb;
		game = setgame;
		io = setio;
		fb = setfbfunk;
		return this;
	},

	register: function( user ) {
		for( var f in this.commands )
			user.on( f, this.commands[f] );
	},

	commands: {
		login : function (data) {
			fb.login( this, data );
		},

		name: function( data ) {
			this.data.name = data.name;
			io.sockets.emit( 'name', {user: this.data.id, name: data.name});
			if( this.data.fbuid ) fb.setname( this.data.fbuid, data.name );
		},

		say: function( data ) {
			this.broadcast.emit( 'say', {user: this.data.id, text: data});
			game.check( this, data );
		},

		painter_request: function( data ) {
			game.request( this, data );
		},

		screen_clear: function( data ) {
			if( game.ispainter( this ))
				this.broadcast.emit( 'screen_clear', data );
		},

		color_set: function( data ) {
			if( game.ispainter( this )){
				game.color = data.color;
				io.sockets.emit( 'color_set', data );
			}
		},

		pen_down: function( data ) {
			if( game.ispainter( this ))
				this.broadcast.emit( 'pen_down', data );
		},

		pen_move: function( data ) {
			if( game.ispainter( this ))
				this.broadcast.emit( 'pen_move', data );
		}
	}
}

module.exports = protocol;
