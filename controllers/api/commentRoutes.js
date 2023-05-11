// Import dependencies //
const router = require("express").Router();
const { Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");


// Get all comments for a post //
router.get('/:postId', (req, res) => {
  Comment.findAll({
    where: {
      postId: req.params.postId
    },
    include: {
      model: User,
      attributes: ['username']
    },
    order: [['createdAt', 'DESC']]
  })
    .then(dbCommentData => {
      res.json({ comments: dbCommentData });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new comment //
router.post("/", withAuth, (req, res) => {
  console.log(req.body);

  Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Export router //
module.exports = router;