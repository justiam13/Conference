const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public routes
router.get('/', pageController.getPages);
router.get('/:slug', pageController.getPageBySlug);

// Admin routes
router.post('/', [auth, admin], pageController.createPage);
router.put('/:id', [auth, admin], pageController.updatePage);
router.delete('/:id', [auth, admin], pageController.deletePage);

module.exports = router; 