var game = {
	queue: [],
	painter: null,
	timeout: null,

	request: function( user ) {
		this.queue.push( user );
		if( !this.painter ) this.start();
	},

	start: function() {
		if( !this.queue.length ) return false;

		this.painter = this.queue.shift();

		painter.broadcast.emit( 'game_new', {user: this.painter.id } );
		painter.emit( 'game_word', { word: 'hallo' });
		setTimeout( function() { game.end(); }, 120000 );
	},

	end: function() {
		// message with winner and so on...

		this.painter = null;
		this.start();
	}
}

module.exports = game;
