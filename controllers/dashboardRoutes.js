const router = require("express").Router();
const { UserPost } = require("../models");
const withAuth = require("../utils/auth");

// Gets all posts for user & displays them in the all-posts-admin using handlebars view //
router.get("/", withAuth, (req, res) => {
  UserPost.findAll({
    where: {
      userId: req.session.userId // Find all posts where userId matches the id in the session //
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map((userPost) => userPost.get({ plain: true })); // Maps the data to JS objects //
      
      // Shows the all-posts-admin view & passes in the post data //
      res.render("all-posts-admin", {
        layout: "dashboard",
        posts
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("login");
    });
});

// Displays the new-post using handlebars //
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard"
  });
});

// Gets a post by ID for the logged-in user & displays post with the edit-post handlebars view //
router.get("/edit/:id", withAuth, (req, res) => {
  UserPost.findByPk(req.params.id) // Find a post using it's primary key (ID) //
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true }); // Converts the data to a plain JS object //
        
        // Displays the edit-post view & passes in the post data //
        res.render("edit-post", {
          layout: "dashboard",
          post
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;