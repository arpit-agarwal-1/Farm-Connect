const Request = require('../models/requestModel');


exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find({})
            .populate('feedId')
            .populate('livestockId')
            .populate('userId');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id)
            .populate('feedId')
            .populate('livestockId');

        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${id}` });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getRequestsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const requests = await Request.find({ userId })
            .populate('feedId')
            .populate('livestockId');

        if (!requests) {
                return res.status(404).json({ message: `Cannot find any request with userId ${userId}` });
            }

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addRequest = async (req, res) => {
    try {
        await Request.create(req.body);
        res.status(200).json({ message: "Request Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findByIdAndUpdate(id, req.body, { new: true });

        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${id}` });
        }
        res.status(200).json({ 
            message: "Request Updated Successfully", 
            request 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${id}` });
        }
        res.status(200).json({ message: "Request Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const request = await Request.findByIdAndUpdate(
            id, 
            {status}, 
            { new: true, runValidators: true }
        );

        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${id}` });
        }

        res.status(200).json({ message: `Request status updated to ${status}`, request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
