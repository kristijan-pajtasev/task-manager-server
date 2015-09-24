var TaskStatusDAO = require("../daos/TaskStatusDAO");
var Auth = require("../adapters/Auth");

var TaskStatusController = function(app) {
	app.get("/taskstatus", function(req, res) {
		Auth.ifAuthenticated(req).then(
			function() {
				TaskStatusDAO.getAll().then(function(results) { 
					res.send(results); 
				})
			}, function() {
				res.status(403);
				res.send("Unauthorized");
			}
		)
		
	})
	
	app.get("/taskstatus/:id", function(req, res) {
		TaskStatusDAO.get(req.params.id).then(function(results) {
			res.cookie("SESSION_ID", "123");
			res.send(results); 
		})
		
	})
	
	app.post("/taskstatus", function(req, res) {
		TaskStatusDAO.create(req.body.status).then(
			function(result) {
				res.send({taskstatus: result}); 
			},
			function(error) {
				res.status(400);
				res.send(error);
			})
		
	})
	
	app.post("/taskstatus/:id", function(req, res) {
		TaskStatusDAO.update(req.params.id, req.body.status).then(
			function(result) {
				res.send(result);
			},
			function(error) {
				res.status(400);
				res.send(error);
			})
	})
	
	app.delete("/taskstatus/:id", function(req, res) {
		TaskStatusDAO.delete(req.params.id).then(
			function(result) {
				res.send(result);
			},
			function(error) {
				res.status(400);
				res.send(error);
			})
	})
}

module.exports = TaskStatusController;