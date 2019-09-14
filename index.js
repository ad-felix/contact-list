const express =  require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
 

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded()); //It is a middleware as it has access to both of our requests and responses.
app.use(express.static('assets'));

//middleware_1
// app.use(function(req, res, next){
//     console.log('Middleware 1 called');
//     next();
// });

var contactList = [
    {
        name : "Arpan",
        phone : "111111111"
    },
    {
        name : "Tony Stark",
        phone : "1234567890"
    }
];

//Controller
app.get('/',function(req, res){
    // res.end('<h1>It is running or is it!</h1>');

    Contact.find({},function(err, contacts){ //this acts a query to find things.
        if(err){
            console.log("Error in fetching contacts",err);
            return;
        }
        res.render('home',{
            title : 'My Contact List', //this whole is a namig convention of JSON object-value pairs.
            contact_list : contacts
        });
    })
});

app.get('/practice',function(req, res){
    // res.end('<h1>It is running or is it!</h1>');
    res.render('practice',{
        title : 'My Playground'
    });
});

app.get('/delete-contact',function(req, res){
    //get the id from query in the ul
    let id = req.query.id;
    // let phone = req.params.phone;
    // console.log(req.params);
    //find the contact in the database using id and delete
    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting contacts");
            return;
        }
        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
});

app.post('/create-contact',function(req, res){
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });

    Contact.create({  //Convention for storing into DB
        name : req.body.name,
         phone : req.body.phone
    }, function(err, newContact){
            if(err){
                console.log("Error in creating a contact");
                return;
            }
            console.log('*******',newContact);
            return res.redirect('back');
    });
    // return res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log("Error in running the server",err);
    }
    console.log("Server up and running on port : ",port);
});
