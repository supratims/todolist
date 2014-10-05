//Use your own parse.com keys, else use mongodb for local storage.
var Parse = require('parse').Parse;
Parse.initialize("QeDNU1ZOYbz16KZZT4p4pkYT5ykTYxnB80ro9M4r", "e3Wl1cmsvSLV5ZWoohDXCMxzu71wb5IrzRKnn7Dy");
// Use Parse.com as Mobile BAAS. Must create a new table 'ToDo' with string column 'text' and boolean column 'done' before using
//TODO: move the db layer to a separate file for ease of portability 
module.exports = function(app) {
	//REST APIs
	app.get('/api/todos', function(req, res) {
		var ToDo = Parse.Object.extend("ToDo");
		var query = new Parse.Query(ToDo);				
		query.find({
		  success: function(results) {
		  	console.log(results);
		    res.json(results); 
		  },
		  error: function(error) {
		    res.send(error)
		  }
		});		
	});

	app.post('/api/todos', function(req, res) {
		var ToDo = Parse.Object.extend("ToDo");
		var toDo = new ToDo();
		toDo.set("text", req.body.text);
		toDo.set("done", false);
		toDo.save(null, {

			success: function(d) {
				//return new list - todo: optimise here
				var ToDo = Parse.Object.extend("ToDo");
				var query = new Parse.Query(ToDo);				
				query.find({
				  success: function(results) {
				  	console.log(results);
				    res.json(results); 
				  },
				  error: function(error) {
				    res.send(error)
				  }
				});					
			},
			error: function(err) {
				res.send(err);
			}
		});

	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		var ToDo = Parse.Object.extend("ToDo");	
		var query = new Parse.Query(ToDo);	
		query.get(req.params.todo_id, {
		  success: function(d) {
		    // The object was retrieved successfully.
			d.destroy({
			  success: function(myObject) {
				//return new list - todo: optimise here
				var ToDo = Parse.Object.extend("ToDo");
				var query = new Parse.Query(ToDo);				
				query.find({
				  success: function(results) {
				  	console.log(results);
				    res.json(results); 
				  },
				  error: function(error) {
				    res.send(error)
				  }
				});	
			  },
			  error: function(myObject, error) {
			    // The delete failed.
			    // error is a Parse.Error with an error code and message.
			    res.send(error);
			  }
			});				    
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    // error is a Parse.Error with an error code and message.
		    res.send(error);
		  }
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
};