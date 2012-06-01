var https = https = require('https')
	,db = null;

var fb = {

	init: function ( setdb ){
		db = setdb;
		return this;
	},

	login: function ( user, data ) {

		// TODO validate/escape data fields to avoid request manipulation

		var req = https.get({
			host: 'graph.facebook.com',
			port: 443,
			path: '/'+data.uid+'?access_token='+data.accessToken,
			method: 'GET'
		}, function(res) {

			res.on('data', function( resp ) {
				resp = JSON.parse(resp);

				if(resp.verified && !user.data.fbuid) {

					db.query( "SELECT * FROM user WHERE fb_uid = "+db.escape(resp.id), function(error, rows, cols) {
						var neu = false;

						if( !rows || rows.length == 0){
							db.query( "INSERT INTO user (fb_uid,score,name) VALUES("+db.escape(resp.id)+",0,"+db.escape(user.data.name)+");" );
							neu = true;
						} else {
							user.data.name = rows[0].name;
							user.data.points += rows[0].score;
						}

						user.emit( 'login', {id: user.data.id, name: user.data.name, points: user.data.points, realname: resp.first_name, newuser: neu });
						user.broadcast.emit( 'login', {id: user.data.id, points: user.data.points, name: user.data.name, newuser: neu});
						user.data.fbuid = resp.id;
					});
				} else {
					user.emit( 'info', 'Login failed!' );
				}

			});

		}).on('error', function(e) {
			console.log(e);
		});
	},

	setname: function( uid, name ) {
		db.query( "UPDATE user SET name = "+db.escape(name)+" WHERE fb_uid  = "+db.escape(uid));
	},

	setpoints: function( uid, points ) {
		db.query( "UPDATE user SET score  = "+db.escape(points)+" WHERE fb_uid = "+db.escape(uid));
	}

}

module.exports = fb;