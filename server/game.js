var game = {
	queue: [],
	painter: null,
	timeout: null,

	request: function( user ) {
		for( var z in this.queue ){
			if(this.queue[z].id == user.id){
				user.emit( 'info', { text: ('Du bist bereits in der warteschlange an Platz '+z) });
				return;
			}
		}
		
		this.queue.push( user );
		if( !this.painter ){
			this.start();
		}
		user.emit( 'info', { text: ('Du bist warteschlange an Platz '+this.queue.length) });
	},

	start: function() {
		if( !this.queue.length ) return false;

		this.painter = this.queue.shift();

		this.painter.broadcast.emit( 'game_new', {user: this.painter.id } );
		this.painter.emit( 'painer_set', { });
		this.painter.emit( 'info', { text: ('Du kannst jetzt malen ;D ') }); //nachher hier das wort senden 
		setTimeout( function() { game.end(); }, 120000 );
	},

	end: function() {
		// message with winner and so on...

		this.painter = null;
		this.start();
	}
}

module.exports = game;
