function getMD5(body) {
  return CryptoJS.MD5(JSON.stringify(body));
}

function getAuthSignature(md5, timeStamp) {
  return CryptoJS.HmacSHA256(`POST\n/apps/1259499/events\nauth_key=3a87fb8199350309c71d&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`, "c70289cef8f2aa08d00e");
}
var activeGroups = [];


var loggedUser = "";
var counter = 0;
var groupName = "";
var loggedUser = "";
const login = async function () {

  loggedUser = String(document.querySelector("#entername").value);
  groupName = String(document.querySelector("#entergroup").value);

  
  if (loggedUser !== "" && groupName !== "") {
    document.getElementById("login_form").style.display = "none";
    document.getElementById("chat").style.display = "block";  
    document.querySelector("#groupname").innerHTML = document.querySelector("#entergroup").value;
    console.log(loggedUser, groupName);
 
    if(activeGroups.length > 0)
      {
        var currentGroup = activeGroups.find(x => x.group == groupName);
        if(currentGroup != null){
          if(currentGroup.users.find(x => x == loggedUser) != undefined){
            currentGroup.users.push(loggedUser)
            currentGroup.counter = currentGroup.users.length;
          }
          else{
            currentGroup.users = [loggedUser];
            currentGroup.counter = currentGroup.users.length;
          }
        }
      }
      else{
        activeGroups.push({
          group: groupName,
          users:[loggedUser],
          counter: 1
        });
      }
      await handleLogin();
  }
  else {
    alert("please enter name & group name");
  }
}

const handleLogin = async function(){
  let body = { data: JSON.stringify(activeGroups), name: "login", channel: "my-channel" }
    let timeStamp = Date.now() / 1000;
    let md5 = getMD5(body);
    let url = `https://cors.bridged.cc/https://api-eu.pusher.com/apps/1259499/events?body_md5=${md5}&auth_version=1.0&auth_key=3a87fb8199350309c71d&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5, timeStamp)}`;
    let req = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

const logOut = function () {

  document.getElementById("login_form").style.display = "block";
  document.getElementById("chat").style.display = "none";
  document.querySelector("#entergroup").value = null;
  document.querySelector("#entername").value = null;
  document.querySelector("#mymsg").innerHTML = null;
  var g = activeGroups.find(x => x.group == groupName);
  if(g != undefined){
    g.users.splice(loggedUser);
    g.counter = g.users.length;
  }
  loggedUser = "";
  groupName = "";
  handleLogin();
}


const msgsend = async function () {
  let msg = String(document.querySelector("#mymsg2").value)
  console.log(counter);
  let body = { data: `{"message":"${msg}", "user": "${loggedUser}", "group": "${groupName}"}`, name: "message", channel: "my-channel" }
  let timeStamp = Date.now() / 1000;
  let md5 = getMD5(body);
  let url = `https://cors.bridged.cc/https://api-eu.pusher.com/apps/1259499/events?body_md5=${md5}&auth_version=1.0&auth_key=3a87fb8199350309c71d&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5, timeStamp)}`;
  let req = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(msg);
  document.querySelector("#mymsg2").value = null;
}

var keypress = document.getElementById("mymsg2");
keypress.addEventListener("keydown", async function (e) {
  let msg = String(document.querySelector("#mymsg2").value)
  if (e.keyCode === 13) {
    let msg = String(document.querySelector("#mymsg2").value)
    let body = { data: `{"message":"${msg}", "user": "${loggedUser}", "group": "${groupName}"}`, name: "message", channel: "my-channel" }
    let timeStamp = Date.now() / 1000;
    let md5 = getMD5(body);
    let url = `https://cors.bridged.cc/https://api-eu.pusher.com/apps/1259499/events?body_md5=${md5}&auth_version=1.0&auth_key=3a87fb8199350309c71d&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5, timeStamp)}`;
    let req = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(msg);
  }
});

const updateOnlineUSers = () =>{
  const counter = document.querySelector('#activemembers');
  counter.innertext = data.online;
};
