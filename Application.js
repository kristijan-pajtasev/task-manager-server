var fs = require("fs");

var Application = (function() {
	return {
		run: function(app) {
			fs.readdir(__dirname + "/controllers", function(error, controllers) {
				for(var i = 0, length = controllers.length; i < length; i++) {
					var ctrl = require(__dirname + "/controllers/" + controllers[i])
					new ctrl(app);
				}
			})
		}
	}
})()

module.exports = Application;