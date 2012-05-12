
var game = null
  , db = null
  , io = null;

var protocol = {
	init: function( setgame, setdb, setio ) {
		db = setdb;
		game = setgame;
		io = setio;
		return this;
	},

	register: function( user ) {
		for( var f in this.commands )
			user.on( f, this.commands[f] );
	},

	commands: {
		fbstate : function (data) {
			game.checkfb(this, data, function(user ,data){
				var Jsondata = JSON.parse(data);
				user.emit('vaildfbstate',{'fbname' : Jsondata.first_name, "vaild": Jsondata.verified});
			});
			
		},
		
		name: function( data ) {
			this.data.name = data;
			io.sockets.emit( 'name', {user: this.data.id, name: data});
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
