var PersonModel = require("../daos/PersonDAO");

var PersonController = function(app) {
	app.get("/person", function(req, res) {
		PersonModel.getAll().then(function(results) { 
			res.send({persons: results.map(function(e) { e.id = e.id; return e; })});
		})
		
	})
	
	app.get("/person/:id", function(req, res) {
		PersonModel.get(req.params.Id).then(function(results) {
			res.send({person: results}); 
		})
		
	})
}

module.exports = PersonController;