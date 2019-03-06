let router = require('express').Router();
var postController = require('../controllers/postController');

//Set default API response
router.get('/', (req, res) => {
    res.json({
        status: 'API is working',
        message: 'Welcome from express API'
    });
});

router.route('/post')
    .get(postController.index)
    .post(postController.createPost);

router.route('/post/:id')
    .get(postController.getPostById)
    .delete(postController.deletePost)
    .put(postController.updatePostById);

// Export API route
module.exports = router;