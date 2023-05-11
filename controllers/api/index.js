const router = require('express').Router();

// Imports routes for user, post & comment //
const userRoutes = require('./userRoutes.js');
const userPostRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Uses routes for user, post & comment //
router.use('/user', userRoutes);
router.use('/userPost', userPostRoutes);
router.use('/comment', commentRoutes);

module.exports = router;