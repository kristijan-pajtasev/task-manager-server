var dbAdapter = require("../adapters/DBAdapter");

var GET_ALL = "SELECT * FROM task_status;";

var GET = "SELECT * FROM task_status where id=?;";

var CREATE = "INSERT INTO task_status (status) VALUES (?);";

var UPDATE = "UPDATE task_status SET status=? WHERE id=?;";

var DELETE = "DELETE FROM task_status WHERE id=?;"

var TaskStatusDAO = (function() {

	return {

		getAll: function() {
			return new Promise(function(resolve, reject) {
				dbAdapter.query(GET_ALL, function(error, rows, fields) {
					if(!!error) { reject(error); }
					resolve(rows);
				});
			});
		},
		get: function(id) {
			return new Promise(function(resolve, reject) {
				dbAdapter.query(GET, [id], function(error, rows, fields) {
					if(!!error) { reject(error); }
					resolve(rows[0]);
				});
			});
		},
		create: function(status) {
			return new Promise(function(resolve, reject) {
				dbAdapter.query(CREATE, [status], function(error, rows, fields) {
					if(!!error) { reject(error); 
					} else {
						var insertId = rows.insertId;
						dbAdapter.query(GET, [insertId], function(error, rows, fields) {
							resolve(rows[0]);
						})
					}
				});
			});
		},
		update: function(id, status) {
			return new Promise(function(resolve, reject) {
				dbAdapter.query(UPDATE, [status, id], function(error, rows, fields) {
					if(!!error) { reject(error); } else {
						dbAdapter.query(GET, [id], function(error, rows, fields) {
							resolve(rows[0]);
						})
					}
				});
			});
		},
		delete: function(id) {
			return new Promise(function(resolve, reject) {
				dbAdapter.query(DELETE, [id], function(error, rows, fields) {
					if(!!error) { reject(error); }
					resolve(id);
				});
			});
		}
	}
})();

module.exports = TaskStatusDAO;