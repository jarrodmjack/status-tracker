
document.querySelector('#addUserBtn').addEventListener('click', addUser)
document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#personName").textContent = data._name
  document.querySelector("#personStatus").textContent = data._status
  document.querySelector("#personOccupation").textContent = data._occupation
}


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

}




