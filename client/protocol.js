var protocol = {
	init: function( data ) {
		self = data.id;

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
		system( data.text );
	},
	name: function( data ) {
		var old = $( '#user_'+data.user ).text();
		system( old+' heißt nun '+data.name );
		$( '#user_'+data.user ).text( data.name );
	},

	painer_set: function( data ) {
		game.ispainter = true;
	},

	screen_clear: function( data ) {

	},

	pen_down: function( data ) {
		game.before.x = data.x;
		game.before.y = data.y;
	},

	pen_move: function( data ) {
		game.draw_line( data.x, data.y );
	},

	game_new: function( data ) {

	},

	game_word: function( data ) {

	},

	game_resolve: function( data ) {

	},

	game_points: function( data ) {

	},

	color_set: function( data ) {

	}


}