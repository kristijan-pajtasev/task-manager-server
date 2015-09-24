var db = require("./DBAdapter")

var GET_COUNT_FOR_SESSION = "SELECT * from user_session WHERE session=?;"

var Auth = (function() {
	return {
		ifAuthenticated: function(request) {
			return new Promise(function(resolve, reject) {
				console.log(request.cookies)
				var session = request.cookies.SESSION_ID;
				if(!session) {
					reject(false);
				} else {
					db.query(GET_COUNT_FOR_SESSION, [session], function(error, rows, field) {
						console.log(error)
						if(rows.length == 1) {
							resolve(true);
						} else {console.log("cant find")
							reject(false);
						}
					})
				}
			})
		}
	}
})();

module.exports = Auth;