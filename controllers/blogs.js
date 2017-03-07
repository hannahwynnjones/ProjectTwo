const Blog = require('../models/blog');
const rp = require('request-promise');

//-------index shows everyone's blogs--

function blogsIndex(req, res, next) {
  Blog
    .find()
    .populate('createdBy')
    .exec()
    .then((blogs) => res.render('blogs/index', { blogs }))
    .catch(next);
}

///--------------------add blog------------------

function blogsNew(req, res) {
  res.render('blogs/new');
}

function blogsCreate(req, res, next) {
  req.body.createdBy = req.user;
  Blog
 .create(req.body)
 .then(() => res.redirect('/blogs'))
  .catch(next);
}
    // .findById(req.params.id)
    // .populate('createdBy')
    // .populate('comments.createdBy')
    // .exec()
    // .then((blog) => {
    //   if(!blog) return res.notFound();
    // })
    // .catch(next);



//-----------------show individual blogs---------------

function blogsShow(req, res, next) {
  Blog
    .findById(req.params.id)
    .populate('createdBy')
    .populate('comments.createdBy')
    .exec()
    .then((blog) => {
      if(!blog) return res.notFound();

      return rp({
        method: 'GET',
        url: `http://www.recipepuppy.com/api/?&q=${blog.tag}`,
        json: true
      })
      .then((recipes) => {
        console.log(recipes);
        res.render('blogs/show', { blog, recipes });
      });
    })
    .catch(next);
}

// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3

//-----------edit blogs----------------------

function blogsEdit(req, res, next) {
  Blog
    .findById(req.params.id)
    .exec()
    .then((blog) => {
      if(!blog) return res.notFound();
      res.render('blogs/edit', { blog });
    })
    .catch(next);
}

function blogsUpdate(req, res, next) {
  Blog
    .findById(req.params.id)
    .exec()
    .then((blog) => {
      if(!blog) return res.notFound();

      for(const field in req.body) {
        blog[field] = req.body[field];
      }

      return blog.save();
    })
    .then((blog) => res.redirect(`/blogs/${blog.id}`))
    .catch(next);
}

// ------------------- delete blogs--------------------

function blogsDelete(req, res, next) {
  Blog
    .findById(req.params.id)
    .exec()
    .then((blog) => {
      if(!blog) return res.notFound();
      return blog.remove();
    })
    .then(() => res.redirect('/blogs'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Blog
    .findById(req.params.id)
    .exec()
    .then((blog) => {
      if(!blog) return res.notFound();

      blog.comments.push(req.body); //create an embedded record
      return blog.save();
    })
  .then((blog) => res.redirect(`/blogs/${blog.id}`))
  .catch(next);
}

//if we dont hae a blog, we return res.notFound.  we now only want to keep the blog model rather than the comments, so we are saving the blog rather than the comments.  then take the blog that we saved and redirect the user to the show page

function deleteCommentRoute(req, res, next) {
  Blog
    .findById(req.params.id)
    .exec()
    .then((blog) => {
      if(!blog) return res.notFound();
      //get the embedded record by it's id
      const comment = blog.comments.id(req.params.commentId);
      comment.remove();

      return blog.save();
    })

    .then((blog) => res.redirect(`/blogs/${blog.id}`))
    .catch(next);
}
//---------------------------------------------------------

//EDIT comments

function editCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Blog
  .findById(req.params.id)
  .exec()
  .then((blog) => {
    return res.render('blogs/editcomment', { blog });
  })
  .catch(next);
}

//--------------------------IMAGES------------------------

// function newImageRoute(req, res) {
//   res.render('users/newImage');
// }
//
// function createImageRoute(req, res, next) {
//   if(req.file) req.body.filename = req.file.key;
//
//   // For some reason multer's req.body doesn't behave like body-parser's
//   req.body = Object.assign({}, req.body);
//
//   req.user.images.push(req.body);
//
//   req.user
//     .save()
//     .then(() => res.redirect('/user'))
//     .catch((err) => {
//       console.log(err);
//       if(err.name === 'ValidationError') return res.badRequest('/user', err.toString());
//       next(err);
//     });
// }


module.exports = {
  index: blogsIndex,
  new: blogsNew,
  create: blogsCreate,
  show: blogsShow,
  edit: blogsEdit,
  update: blogsUpdate,
  delete: blogsDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  editComment: editCommentRoute
  // newImage: newImageRoute,
  // createImage: createImageRoute
};
