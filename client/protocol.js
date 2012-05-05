var protocol = {
	init: function( data ) {
		self = data.id;
		game.color = game.allcolor[data.color];
		for( var i = 0; i < data.users.length; i++)
			adduser( data.users[i].id, data.users[i].name );
		system( 'Verbindung hergestellt.' )
	},

	join: function( data ) {
		adduser( data.id, data.name );
		system( data.name+' hat den chat betreten.' )
	},

	leave: function( data ) {
		output( $( '#user_'+data.id ).text()+' hat den chat verlassen.' )
		$( '#user_'+data.id ).remove();
	},

	say: function( data ) {
		say( data.user, data.text );
	},

	info: function( data ) {
		system( data.text, data.color );
	},

	name: function( data ) {
		var old = $( '#user_'+data.user ).text();
		system( old+' heißt nun '+data.name );
		$( '#user_'+data.user ).text( data.name );
	},

	screen_clear: function( data ) {
		game.screen_clear();
	},

	pen_down: function( data ) {
		game.before.x = data.x;
		game.before.y = data.y;
	},

	pen_move: function( data ) {
		game.draw_line( data.x, data.y );
	},

	game_word: function( data ) {
		game.ispainter = true;
		system( 'Du bist an der Reihe! Male das folgende Wort: '+data.word, '#000088' );
	},

	game_resolve: function( data ) {
		game.ispainter = false;
		var winner = $( '#user_'+data.user ).text();
		system( winner+' Wort zu erraten. Das Wort lautete: '+data.word, '#008800' );
	},

	game_end: function( data ) {
		game.ispainter = false;
		system( 'Leider hat es keiner geschafft das Wort zu erraten. Das Wort lautete: '+data.word, '#880000' );
	},

	color_set: function( data ) {
		game.color = game.allcolor[data.color];
	}


}