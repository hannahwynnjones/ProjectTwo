Rate my Bake

GA WDI London - Project 2

Approach / How it works

- To keep it minimal, the users start on the homepage and have one link which they can use to login.  Otherwise, the drop down menu above gives the other links and there is a also a footer with home, login, register, about and contact.
- Users can either register their email address, or sign in using either github or facebook.  By logging in with facebook and github, i'm able to import their profile pictures to add to their user profile page.
- when they've logged in, they are sent back to the homepage but now their are additional links at the base of the page and the nav bar links have also changed meanig that the user can add a blog, view all the blogs, view the other user profiles or view their own profile.
- From most pages, the user is prompted to add a new blog.
- When the user looks at their profile, they can add or delete their blog.  If they add a comment, they are also able to add or delete the comment they added.  
- only owners of ether blogs or comments can edit or delete.
- There is also a contact page and an about page which are static.


The build

- i started by creating the restful app and making sure each page and it's links worked before adding the image uploader using AWS to the 'new blog' page.  I added conditons so that blogs could only be edited by the

- I then looked at adding facebook and github logins using their documentation.

- Comments were added, and conditions so that only the owner of the comment could delete the comment.

 -authentication (inc getting blogs to edit or not depending on whether its your app)

Problems & Challenges

-testing was more difficult than i imagened as thre was no two models and the validation became an obstacal.  Instead of just looking at the blog model,

-size of images, i'd use links rather tha store them in my docs.

additonal stuff
