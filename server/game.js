// dependencys
var db = null
  , logger = null
  , io = null
  , fb = null;

// local varialbles
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

	/**
	 * Initializing function for dependency injection
	 */
	init: function( setdb, setlogger, setio, setfbfunk ) {
		db = setdb;
		logger = setlogger;
		io = setio;
		fb = setfbfunk;
		return this;
	},

	/**
	 * Checks if the given User is the painter
	 */
	ispainter: function( user ) {
		return user == painter;
	},

	/**
	 * This function is called when a user disconnects
	 */
	disconnect: function( user ) {
		// remove user from queue
		var index = queue.indexOf( user );
		user.data.requeue = false;

		if( -1 != index ) {
			queue.splice( index, 1 );
		}

		// end game if user is painter
		if( this.ispainter( user )) {
			this.end();
		}
	},

	/**
	 * Checks if a User guessed the word
	 */
	check: function( user, guess ) {
		if( !painter || user == painter ) return false;
		logger.log( 3, user.data.name+' - >'+guess.toLowerCase()+'< - >'+word.toLowerCase()+'<' );
		if( guess.toLowerCase() == word.toLowerCase() ) this.end( user )
	},

	/**
	 * This function is called if a user wants to paint or don't wants to paint anymore
	 */
	request: function( user, requeue ) {
		user.data.requeue = requeue;

		if( requeue ) {
			var queuepos = queue.indexOf( user );

			// check if user is already in the queue
			if( queuepos != -1 ){
				if( queuepos ) user.emit( 'info', {text: ('Du befindest dich bereits in der Warteschlange. Vor dir sind noch '+queuepos+' Personen an der Reihe.')});
				else user.emit( 'info', {text: ('Du befindest dich bereits in der Warteschlange. Du bist als nächstes an der Reihe.')});
				return;
			}

			// add user to the queue and get position
			queue.push( user );
			queuepos = queue.length-1;

			// check if there is already a game running, start one if not
			if( !painter ){
				this.start();
			} else {
				if( queuepos ) user.emit( 'info', {text: ('Du wurdest als Zeichner vorgemerkt. Vor dir sind noch '+queuepos+' Personen an der Reihe.')});
				else user.emit( 'info', {text: ('Du wurdest als Zeichner vorgemerkt. Du bist als nächstes an der Reihe.')});
			}
		} else {
			// remove user vrom queue
			queue.splice( queue.indexOf( user ), 1 );
			user.emit( 'info', {text: ('Du wurdest aus der Warteschleife entfernt.')});
		}
	},

	/**
	 * This function is used to start a new game
	 */
	start: function() {
		// we can't start a new game when nobody is in the queue
		if( queue.length < 1 ) return false;
		logger.log( 3, 'Starting a new Game' );

		// fetch a word from the database
		db.query( "SELECT * FROM words ORDER BY occured, RAND() LIMIT 1", function(error, rows, cols) {
			if(error) {
				logger.log( 0, error );
			} else {
				painter = queue.shift();
				word = rows[0].word;
				points = 250; // points = word.points
				game.countdown = timelimit;

				// update word so that it can't occure multiple times in a wor
				db.query( "UPDATE words SET occured = occured + 1 WHERE id = "+rows[0].id, function(error, rows, cols) {
					if(error) {logger.log( 0, error );}
				} );

				// start timers for game end and points decreasing
				timeout = setTimeout( function() {game.end();}, timelimit * 1000 );
				interval = setInterval( function() {points *= .98;game.countdown--;}, 1000 );

				// inform players about new game
				io.sockets.emit( 'screen_clear', {} );
				painter.broadcast.emit( 'game_new', {painter: painter.data.id});
				painter.emit( 'game_word', {word: word});
			}
		});
	},

	/*
	 * This function is used to end the game when somebody guessed the word or the time is over
	 */
	end: function( user ) {
		// clear timers and reset countdown
		clearTimeout( timeout );
		clearInterval( interval );
		this.countdown = 0;

		if( user ) {
			// if the word was guessed: grant points
			painter.data.points += points|0;
			user.data.points += points|0;

			// if users are logged in: update database
			if( painter.data.fbuid )
				fb.setpoints( painter.data.fbuid, painter.data.points );
			if( user.data.fbuid )
				fb.setpoints( user.data.fbuid, user.data.points );

			// inform players about game end
			logger.log( 3, 'Tahe game is over and was won by: '+JSON.stringify( user.data ));
			io.sockets.emit( 'game_resolve', {
				winner: user.data,
				painter: painter.data,
				word: word,
				points: points,
				time: timelimit-this.countdown
			} );
		} else {
			// if nobody won, just inform about game end
			logger.log( 3, 'Tahe game is over without a winner.' );
			io.sockets.emit( 'game_end', {word: word} );
		}

		// put painter back into the queue if checkbox is still marked
		if( painter.data.requeue ) {
			this.request( painter, painter.data.requeue );
		}

		// start a new game
		painter = null;
		this.start();
	}
}

module.exports = game;
