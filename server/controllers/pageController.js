const Page = require('../models/Page');

// Get all pages
exports.getPages = async (req, res) => {
    try {
        const pages = await Page.find();
        res.json(pages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get page by slug
exports.getPageBySlug = async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(page);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new page
exports.createPage = async (req, res) => {
    try {
        const page = new Page(req.body);
        const newPage = await page.save();
        res.status(201).json(newPage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update page
exports.updatePage = async (req, res) => {
    try {
        const page = await Page.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete page
exports.deletePage = async (req, res) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json({ message: 'Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 