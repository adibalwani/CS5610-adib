var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var FormSchema = new mongoose.Schema({
    name: String,
    //created: Date
    created: {type: Date, default: Date.now}
}, {collection: 'form'});

var Form = mongoose.model("Form", FormSchema);

//var form1 = new Form({ name: 'Adib', created: new Date() });
var form1 = new Form({ name: 'Adib' });

Form.find(receiveData);

Form.findById("54f94552e918fb4420fb93c3", function (err, data) {
    data.name = 'Adib_Replaced';
    data.save();
});

function receiveData(err, data) {
    console.log(err);
    console.log(data);
}

    //form1.save();