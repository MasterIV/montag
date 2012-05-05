var db = null
  , logger = null
  , io = null
	, painter = null
	, queue = []
	, timeout = null
	, word = null;

var game = {

	init: function( setdb, setlogger, setio ) {
		db = setdb;
		logger = setlogger;
		io = setio;
		return this;
	},

	ispainter: function( user ) {
		return user == painter;
	},

	disconnect: function( user ) {
		if( user == painter ) {
			this.end();
		}

		//@todo remove disconnected user from queue
	},

	check: function( user, guess ) {
		if( !painter || user == painter ) return false;
		if( guess.toLowerCase() == word.toLowerCase() ) this.end( user )
	},

	request: function( user ) {
		var queuepos = queue.indexOf( user );

		if( queuepos != -1 ){
			if( queuepos ) user.emit( 'info', { text: ('Du befindest dich bereits in der Warteschlange. Vor dir sind noch '+queuepos+' Personen an der Reihe.') });
			else user.emit( 'info', { text: ('Du befindest dich bereits in der Warteschlange. Du bist als nächstes an der Reihe.') });
			return;
		}

		queue.push( user );
		queuepos = queue.length-1;

		if( !painter ){
			this.start();
		} else {
			if( queuepos ) user.emit( 'info', { text: ('Du wurdest als Zeichner vorgemerkt. Vor dir sind noch '+queuepos+' Personen an der Reihe.') });
			else user.emit( 'info', { text: ('Du wurdest als Zeichner vorgemerkt. Du bist als nächstes an der Reihe.') });
		}
	},

	start: function() {
		if( !queue.length ) return false;
		logger.log( 2, 'Starting a new Game' );

		db.query( "SELECT * FROM words ORDER BY occured, RAND() LIMIT 1" ).execute( function(error, rows, cols) {
			if(error) {
				logger.log( 0, error );
			} else {
				word = rows[0].word;

				db.query( "UPDATE words SET occured = occured + 1 WHERE id = "+rows[0].id ).execute( function(error, rows, cols) {
					if(error) { logger.log( 0, error ); }
				} );

				painter = queue.shift();
				timeout = setTimeout( function() { game.end(); }, 120000 );

				io.sockets.emit( 'screen_clear', {} );
				painter.broadcast.emit( 'info', { text: ('Eine neue Runde hat begonnen, der Maler ist '+painter.data.name), color: '#000088' });
				painter.emit( 'game_word', { word: word });
			}
		});
	},

	end: function( user ) {
		clearTimeout( timeout );

		if( user ) {
			io.sockets.emit( 'game_resolve', { user: user.data.id, word: word } );
		} else {
			io.sockets.emit( 'game_end', { word: word } );
		}

		painter = null;
		this.start();
	}
}

module.exports = game;
