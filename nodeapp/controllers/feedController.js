const Feed = require('../models/feedModel');

exports.getAllFeeds = async (req, res) => {
    try {
        const feeds = await Feed.find({});
        res.status(200).json(feeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeedById = async (req, res) => {
    try {
        const feed = await Feed.findById(req.params.id);
        if (!feed) {
            return res.status(404).json({ message: `Cannot find any feed with ID ${req.params.id}` });
        }
        res.status(200).json(feed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addFeed = async (req, res) => {
    try {
        await Feed.create(req.body);
        res.status(200).json({ message: 'Feed Added Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFeed = async (req, res) => {
    try {
        const feed = await Feed.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feed) {
            return res.status(404).json({ message: `Cannot find any feed with ID ${req.params.id}` });
        }
        res.status(200).json({ message: 'Feed Updated Successfully', feed });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteFeed = async (req, res) => {
    try {
        const feed = await Feed.findByIdAndDelete(req.params.id);
        if (!feed) {
            return res.status(404).json({ message: `Cannot find any feed with ID ${req.params.id}` });
        }
        res.status(200).json({ message: 'Feed Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


