const router = require("express").Router();
const { UserPost, Comment, User } = require("../models");

// Gets all posts for the homepage to display //
router.get("/", (req, res) => {
  UserPost.findAll({
    // Includes User & Comment models //
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        include: [User]
      }
    ],
    order: [['createdAt', 'DESC']]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);

      res.render("all-posts", { 
        posts,
        loggedIn: req.session.loggedIn 
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Gets a single post with comments & user data //
router.get("/userPost/:id", (req, res) => {
  UserPost.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        include: [User]
      }
    ]
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("single-post", { 
          post,
          loggedIn: req.session.loggedIn 
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Displays the login page //
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Displays the sign up page //
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;