// built in modules
const http = require('http');
const fs = require('fs')  //used to access system files
const url = require('url'); //sees what url client is requesting
const querystring = require('querystring'); //

const figlet = require('figlet'); //installed module - npm install figlet
const { ifError } = require('assert');



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


  

  else if (page === '/api') {
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


  else if(page === '/add-user'){ 
    if(params['name'] && params['status']){//if params are defined
      const alph = 'abcdefghijklmnopqrstuvwxyz'
      if(params['occupation'].length > 0 && alph.includes(params['occupation'])){
        students.push(new Student(params['name'], params['status'], params['occupation'])) //push new obj to array
      }else{
        students.push(new Student(params['name'], params['status'])) // same as above but if occupation is NOT defined, goes to default param
      }
    
    console.log(students)
    res.end(JSON.stringify(students[students.length - 1]));
    }else{
      console.err('Fields are empty')
      res.end(JSON.stringify(students));
    }
   
  }




  else if (page == '/css/style.css'){ //request for css file
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){ //request for JS file
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
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
