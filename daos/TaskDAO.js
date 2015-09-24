var dbAdapter = require("../adapters/DBAdapter");

var GET_ALL = "SELECT * FROM task;";

var GET = "SELECT * FROM task where id=?;";

var TaskDAO = (function() {

	return {

		getAll: function() {
			return new Promise(function(resolve, reject) {
				dbAdapter.query(GET_ALL, function(error, rows, fields) {
					resolve(rows);
				});
			});
		},
		get: function(id) {
			return new Promise(function(resolve, reject) {
				dbAdapter.query(GET, [id], function(error, rows, fields) {
					resolve(rows[0]);
				});
			});
		}
	}
})();

module.exports = TaskDAO;