// built in modules
const http = require('http');
const fs = require('fs')  //used to access system files
const url = require('url'); //sees what url client is requesting
const querystring = require('querystring'); //

const figlet = require('figlet'); //installed module - npm install figlet
const { ifError } = require('assert');


//student class constructor, occupation is defaulted unless provided
class Student{
  constructor(name, status, occupation = 'Full-stack developer'){
    this._name = name
    this._status = status
    this._occupation = occupation
  }

  get name(){
    return this._name
  }

  get status(){
    return this._status
  }

  get occupation(){
    return this._occupation
  }
}

//creating students array filled with objects made by Student class constructor
let students = [new Student('Kaleigh', 'editing'), new Student('Jamil', 'drinking water'), new Student('Ahmed', 'Ballin'), new Student('Jarrod', 'existential crisis'), new Student('Luffy', 'Strawhat'), new Student('Andrew', '!tired'), new Student('Ned', 'learning'), new Student('Christopher', 'Lost 0_0'), new Student('Stinnis', '!Not epic'), new Student('Mike Dubs', 'Complicated'), new Student('Brandon', 'coding?'), new Student('Kemi', 'Studying')]

// Creating the server
const server = http.createServer((req, res) => { // use http module and use createServer method to create server
const page = url.parse(req.url).pathname; //tells us what path is being requested
const params = querystring.parse(url.parse(req.url).query); //query parameters
console.log(page); 
if (page == '/') { //if on main page....
  fs.readFile('index.html', function(err, data) { //FS reads file system, selects page to serve (index.html)
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}
//checks to see if on API page
else if (page === '/api') {
  //check to see if a student variable is submitted in the URL request
  if('student' in params){
    const user = students.find(item => item.name.toLowerCase() === params['student'].toLowerCase())
    if(user){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(user));
    }
    //student = leon
    else if(params['student'] != 'leon'){
      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        name: "unknown",
        status: "unknown",
        currentOccupation: "unknown"
      }
      res.end(JSON.stringify(objToJson));
    }//student != leon
  }//student if
}//else if

//add user functionality, we are adding users to the students array with the Student class constructor
else if(page === '/add-user'){ 
  //checking to see if the URL parameters have empty name and student submitted from index.html input boxes
  if(params['name'] && params['status']){//if params are defined
    //check for empty occupation. we must see if the occupation URL paremeter is empty, if so we must not add it to the Student class constructor or the default will be replace by an empty string.
    const alph = 'abcdefghijklmnopqrstuvwxyz'.split('')
    //check the occupation URL parameter by seeing if length is greater than 0, AND checking to see if any letter of the alphabet is present with indexOf. (we are looking for blank spaces submitted)
    if(params['occupation'].length > 0 && alph.some(r=> params['occupation'].split('').indexOf(r) >= 0)){
      console.log('here')
      //since the occupation string is actually filled with data, we push to the students array by making a new Student from constructor with URL params of name, status and occupation
      students.push(new Student(params['name'], params['status'], params['occupation'])) //push new obj to array
    }else{
      students.push(new Student(params['name'], params['status'])) // same as above but if occupation is NOT defined, goes to default param
    }
  console.log(students)
  //we must return something to async function in main.js so we return the student we just added
  res.end(JSON.stringify(students[students.length - 1]));
  }else{
  //we look for empty fields and push an error to server, also just return students array to async function in main.js
    console.err('Fields are empty')
    res.end(JSON.stringify(students));
  }
  
}
else if (page == '/css/style.css'){ //request for css file
  fs.readFile('css/style.css', function(err, data) {
    res.write(data);
    res.end();
  });
}
else if (page == '/js/main.js'){ //request for JS file
  fs.readFile('js/main.js', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
}
else{
  figlet('404!!', function(err, data) { // 
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    res.write(data);
    res.end();
  });
}
});

server.listen(8000);
// server is listening on port 8000