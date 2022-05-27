//event listeners looking for button presses from index.html

//call async function of addUser or makeReq
document.querySelector('#addUserBtn').addEventListener('click', addUser)
document.querySelector('#clickMe').addEventListener('click', makeReq)

// <<<<<<< add-user-interface





// =======
// //async function which takes an input from index.html #userName id text field, fetches data from server, returns data as JSON (or throws an error)
// //data is displayed into DOM 
// >>>>>>> main
// async function makeReq(){

  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#personName").textContent = data._name
  document.querySelector("#personStatus").textContent = data._status
  document.querySelector("#personOccupation").textContent = data._occupation


//variable that will be used  as an argument in voice synthesis function
 let personInfoSentence = `Our very own ${data._occupation}, ${data._name}, is ${data._status}.`;


// calling voice synthesis function so it reads available info
     readAloud(personInfoSentence);

}

//async function which takes an input from index.html #addUsername, #addUserStatus, #addUserOccupation id text field, fetches data from server main.js file and adds to the students array with this text field data as input, returned as JSON
//data is displayed into DOM 
async function addUser(){

  const userName = document.querySelector("#addUserName").value;
  const userStatus = document.querySelector("#addUserStatus").value;
  const userOccupation = document.querySelector("#addUserOccupation").value;


  const res = await fetch(`/add-user?name=${userName}&status=${userStatus}&occupation=${userOccupation}`)
  const data = await res.json()

  
  console.log(data);
  document.querySelector("#personName").textContent = data._name
  document.querySelector("#personStatus").textContent = data._status
  document.querySelector("#personOccupation").textContent = data._occupation

// <<<<<<< add-user-interface
  //variable that will be used as an argument in voice synthesis function
  let personInfoSentence = `Our very own ${data._occupation}, ${data._name}, is ${data._status}.`;

  // calling voice synthesis function so it reads the new added info
  readAloud(personInfoSentence);

}




  // function that adds voice synthesis for accessibility 
  function readAloud(whatToYell) {
    const synth = window.speechSynthesis;
    let yellThis = new SpeechSynthesisUtterance(whatToYell);
    synth.speak(yellThis);
     }
=======
}
// >>>>>>> main
