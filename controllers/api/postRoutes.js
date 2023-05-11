// Require needed dependencies & models //
const router = require("express").Router();
const { UserPost } = require("../../models/");
const withAuth = require("../../utils/auth");

// Creates a new post //
router.post("/", withAuth, (req, res) => {
  const body = req.body;
  console.log(req.session.userId);

  // Once new post created, assigns user ID to session user ID //
  UserPost.create({ ...body, userId: req.session.userId })
    .then(newPost => {
      res.json(newPost);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await UserPost.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a previous post //
router.delete("/:id", withAuth, (req, res) => {
  console.log(req.body, req.params.id)

  // Deletes post with specific ID //
  UserPost.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;