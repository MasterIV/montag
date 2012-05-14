var https = null
	,logger = null;


var fbfunk = {

	
	init: function (sethttps, setlogger){
		https = sethttps;
		logger = setlogger;
		return this;
	},
	checkfb: function ( user, data, callondata ) {

		// TODO ceck if data.uid is num and all esc htmlsp
		var req = https.request({
		  host: 'graph.facebook.com',
		  port: 443,
		  path: '/'+data.uid+'?access_token='+data.accessToken,
		  method: 'GET'
		}, function(res) {

		  res.on('data', function( resp ) {
			  resp = JSON.parse(resp);
			  if(resp.verified) {
				  user.data.fbtoken = data.accessToken;
				  user.data.fbuid = data.uid;
			  }	
			  callondata( user, resp );
		  });
		  
		});
		req.end();
		req.on('error', function(e) {
		  console.log(e);
		});
	}
}

module.exports = fbfunk;