


function getUserInfo() {
  FB.api('/me', function(response) {

        //response.name       - User Full name
        //response.link       - User Facebook URL
        //response.username   - User name
        //response.id         - id
        //response.email      - User email

  });
}

function Logout() {
  FB.logout(function() {
    document.location.reload();
  });

}
