
var game = null
  , db = null
  , fbfunk= null
  , io = null;

var protocol = {
	init: function( setgame, setdb, setio, setfbfunk ) {
		db = setdb;
		game = setgame;
		io = setio;
		fbfunk = setfbfunk;
		return this;
	},

	register: function( user ) {
		for( var f in this.commands )
			user.on( f, this.commands[f] );
	},

	commands: {
		fbstate : function (data) {
			
			fbfunk.checkfb(this, data, function( user, resp ){
				if(resp.verified) {
					db.query( "SELECT * FROM  user WHERE fb_uid = "+db.escape(resp.id), function(error, rows, cols) {
						if(error) {
							console.log( 0, error );
						}
						else {
							if(rows[0] == null){
								db.query( "INSERT INTO user (fb_uid,score,name) VALUES("+db.escape(resp.id)+",0,"+db.escape(user.data.name)+");", function(error, rows, cols) {
									if(error) {console.log( 0, error );}
								} );
							}
							else {
								user.data.name = rows[0].name;
								user.data.points = rows[0].score;
								io.sockets.emit( 'name', {user: user.data.id, name: user.data.name});
								io.sockets.emit( 'point_update', {id: user.data.id, points: user.data.points});
							}
						}
								
					} );
				}
				user.emit('vaildfbstate',{'fbname' : (resp.first_name) ? resp.first_name : null, "vaild": resp.verified});
				
			});
			
		},
		
		name: function( data ) {
			if(data.token != null && data.token == this.data.fbtoken) {
				db.query( "UPDATE user SET name = "+db.escape(data.name)+" WHERE fb_uid  = "+db.escape(this.data.fbuid), function(error, rows, cols) {
					if(error) {console.log( 0, error );}
				} );
		}
			this.data.name = data.name;
			io.sockets.emit( 'name', {user: this.data.id, name: data.name});
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
