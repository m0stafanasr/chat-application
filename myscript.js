const login = function (){
    let x = String(document.querySelector("#entername").value)
    let y = String(document.querySelector("#entergroup").value)
    if(x!== "" && y!==""){
        document.getElementById("login_form").style.display = "none";
        document.getElementById("chat").style.display = "block";
        console.log(x, y);
    }
    else{
        alert("please enter name & group name")
    }
}


const logOut = function (){

    document.getElementById("login_form").style.display = "block";
    document.getElementById("chat").style.display = "none";
}


const msgsend = function(){
    let msg = String(document.querySelector("#mymsg2").value)
    document.getElementById('msgtext').innerHTML = document.getElementById('mymsg2').value;
  console.log(msg);
}

var keypress = document.getElementById("mymsg2");
keypress.addEventListener("keydown", function(e) {
    let msg = String(document.querySelector("#mymsg2").value)
    if (e.keyCode === 13) {
        console.log(msg);
    }
    });
   
