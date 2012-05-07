var levels = [
    'error'
  , 'warn '
  , 'info '
  , 'debug'
];

var colors = [
    31
  , 33
  , 36
  , 90
];


module.exports = {
	level: 4,

	log: function( type, msg ) {
		if( this.level > type )
			console.log( '   \033[' + colors[type] + 'm' + levels[type] + ' -\033[39m '+msg );
	}
};
