var TaskDAO = require("../daos/TaskDAO");

var TaskController = function(app) {
	app.get("/tasks", function(req, res) {
		TaskDAO.getAll().then(function(results) { 
			res.send({tasks: results}); 
		})
		
	})
	
	app.get("/tasks/:id", function(req, res) {
		TaskDAO.get(req.params.id).then(function(results) {
			res.send({task: results}); 
		})
		
	})
}

module.exports = TaskController;