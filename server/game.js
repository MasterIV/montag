var db = null
  , logger = null
  , io = null;

var painter = null
  , queue = []
  , timeout = null
	, interval = null
  , word = null
	, points = 0;

var timelimit = 120;

var game = {
	color : 6,
	countdown: 0,

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
		var index = queue.indexOf( user );
		user.data.requeue = false;

		if( -1 != index ) {
			queue.splice( index, 1 );
		}

		if( user == painter ) {
			this.end();
		}
	},

	check: function( user, guess ) {
		if( !painter || user == painter ) return false;
		logger.log( 3, user.data.name+' - >'+guess.toLowerCase()+'< - >'+word.toLowerCase()+'<' );
		if( guess.toLowerCase() == word.toLowerCase() ) this.end( user )
	},

	request: function( user, requeue ) {
		user.data.requeue = requeue;

		if( requeue ) {
			var queuepos = queue.indexOf( user );

			if( queuepos != -1 ){
				if( queuepos ) user.emit( 'info', {text: ('Du befindest dich bereits in der Warteschlange. Vor dir sind noch '+queuepos+' Personen an der Reihe.')});
				else user.emit( 'info', {text: ('Du befindest dich bereits in der Warteschlange. Du bist als nächstes an der Reihe.')});
				return;
			}

			queue.push( user );
			queuepos = queue.length-1;

			if( !painter ){
				this.start();
			} else {
				if( queuepos ) user.emit( 'info', {text: ('Du wurdest als Zeichner vorgemerkt. Vor dir sind noch '+queuepos+' Personen an der Reihe.')});
				else user.emit( 'info', {text: ('Du wurdest als Zeichner vorgemerkt. Du bist als nächstes an der Reihe.')});
			}
		} else {
			queue.splice( queue.indexOf( user ), 1 );
			user.emit( 'info', {text: ('Du wurdest aus der Warteschleife entfernt.')});
		}
	},

	start: function() {
		if( queue.length < 1 ) return false;
		logger.log( 3, 'Starting a new Game' );

		db.query( "SELECT * FROM words ORDER BY occured, RAND() LIMIT 1", function(error, rows, cols) {
			if(error) {
				logger.log( 0, error );
			} else {
				painter = queue.shift();
				word = rows[0].word;
				points = 250; // points = word.points
				game.countdown = timelimit;

				db.query( "UPDATE words SET occured = occured + 1 WHERE id = "+rows[0].id, function(error, rows, cols) {
					if(error) {logger.log( 0, error );}
				} );

				timeout = setTimeout( function() {game.end();}, timelimit * 1000 );
				interval = setInterval( function() {points *= .98;game.countdown--;}, 1000 );

				io.sockets.emit( 'screen_clear', {} );
				painter.broadcast.emit( 'game_new', {painter: painter.data.id});
				painter.emit( 'game_word', {word: word});
			}
		});
	},

	end: function( user ) {
		clearTimeout( timeout );
		clearInterval( interval );

		if( user ) {
			painter.data.points += points|0;
			user.data.points += points|0;

			logger.log( 3, 'Tahe game is over and was won by: '+JSON.stringify( user.data ));
			io.sockets.emit( 'game_resolve', {winner: user.data, painter: painter.data, word: word, points: points, time: timelimit-this.countdown} );
		} else {
			logger.log( 3, 'Tahe game is over without a winner.' );
			io.sockets.emit( 'game_end', {word: word} );
		}

		if( painter.data.requeue ) {
			this.request( painter, painter.data.requeue );
		}

		painter = null;
		this.start();
	}
}

module.exports = game;
