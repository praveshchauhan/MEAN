var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){ // Get initial data
	//console.log('got responce');
	/*var person1 = {
		name: 'John',
		email: 'john@email.com',
		number: '111-111-1111'
	}

	var person2 = {
		name: 'Tom',
		email: 'tom@email2.com',
		number: '222-222-2222'
	}

	var person3 = {
		name: 'Rahul',
		email: 'rahul@email3.com',
		number: '333-333-3333'
	}

	var contactlist = [person1, person2, person3];
	res.json(contactlist);*/
	db.contactlist.find(function(err, docs) {
		//console.log(docs);
		res.json(docs);
	})
});

app.post('/contactlist', function(req, res) { // Add new record in db
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req, res){ // remove data from list
	var id = req.params.id;
	console.log(id);

	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){ // edit responce callback
	var id = req.params.id;
	console.log(id);

	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res){ // update detail callback
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
			query: {_id: mongojs.ObjectId(id)},
			update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, 
			new: true
		}, function(err, doc){
			res.json(doc);
		});
});
app.listen(3030);
console.log('server is running at 3030');