Pusher.logToConsole = true;

var pusher = new Pusher('3a87fb8199350309c71d', {
    cluster: 'eu'
});

var channel = pusher.subscribe('my-channel');
channel.bind('login', function(data) {
    // get all active groups
    activeGroups = data;
    var myGroup = activeGroups.find(x => x.group == groupName);
    if(myGroup != undefined){
        var user = myGroup.users.find(x => x == loggedUser);
        if(user == undefined){
            myGroup.users.push(loggedUser);
            myGroup.counter = myGroup.users.length;
            handleLogin()
        }
        document.getElementById("activemembers").innerHTML = `${myGroup.counter}`;
    }
    else{
        document.getElementById("activemembers").innerHTML = 1;
    }
})

channel.bind('message', function(data) {
if(data.group != groupName)
return;
if(loggedUser == data.user){
  document.getElementById("mymsg").innerHTML+= `<div id="newmsg" class="text-wrap" style="direction: rtl; text-align: right;">${data.user} : ${data.message}</div>`;
}
else{
  document.getElementById("mymsg").innerHTML+= `<div class="text-wrap" style="direction: ltr; text-align: left;"><h3><strong>${data.user}: ${data.message}</div>`;
}
})
.bind(loggedUser);