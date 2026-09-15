const Livestock = require('../models/liveStockModel');


exports.getAllLivestock = async (req, res) => {
    try {
        const livestock = await Livestock.find({});
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getLivestockById = async (req, res) => {
    try {
        const { id } = req.params;
        const livestock = await Livestock.findById(id);
        if (!livestock) {
            return res.status(404).json({ message: `Cannot find any livestock with ID ${id}` });
        }
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getLivestockByUserid = async (req, res) => {
    try {
        const { userid } = req.params;
        const livestock = await Livestock.find({ userid });
        if (!livestock) {
            return res.status(404).json({ message: `Cannot find any livestock with userId ${id}` });
        }
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addLivestock = async (req, res) => {
    try {
        await Livestock.create(req.body);
        res.status(200).json({ message: "Livestock Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateLivestock = async (req, res) => {
    try {
        const { id } = req.params;
        const livestock = await Livestock.findByIdAndUpdate(id, req.body, { new: true });
        if (!livestock) {
            return res.status(404).json({ message: `Cannot find any livestock with ID ${id}` });
        }
        res.status(200).json({ 
            message: "Livestock Updated Successfully", 
            livestock 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteLivestock = async (req, res) => {
    try {
        const { id } = req.params;
        const livestock = await Livestock.findByIdAndDelete(id);
        if (!livestock) {
            return res.status(404).json({ message: `Cannot find any livestock with ID ${id}` });
        }
        res.status(200).json({ message: "Livestock Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
