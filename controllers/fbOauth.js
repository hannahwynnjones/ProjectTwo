


// function getUserInfo() {
//   FB.api('/me', function(response) {
//
//         //response.name       - User Full name
//         //response.link       - User Facebook URL
//         //response.username   - User name
//         //response.id         - id
//         //response.email      - User email
//
//   });
// }

function Logout() {
  FB.logout(function() {
    document.location.reload();
  });

}

FB.api('/me', function(response) {
    console.log(JSON.stringify(response));
});

function getUserInfo() {
      FB.api('/me', function(response) {

    var str="<b>Name</b> : "+response.name+"<br>";
        str +="<b>Link: </b>"+response.link+"<br>";
        str +="<b>Username:</b> "+response.username+"<br>";
        str +="<b>id: </b>"+response.id+"<br>";
        str +="<b>Email:</b> "+response.email+"<br>";
        str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
        str +="<input type='button' value='Logout' onclick='Logout();'/>";
        document.getElementById("status").innerHTML=str;
console.log(response.link);
  });

  }
  function getPhoto()
  {
    FB.api('/me/picture?type=normal', function(response) {

        var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
        document.getElementById("status").innerHTML+=str;

  });

  }
