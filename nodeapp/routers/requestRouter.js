const express = require('express');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.get('/getAllRequests',requestController.getAllRequests);
router.get('/getRequestById/:id',requestController.getRequestById);
router.get('/getRequestsByUserId/:userId',requestController.getRequestsByUserId);
router.post('/addRequest',requestController.addRequest);
router.delete('/deleteRequest/:id',requestController.deleteRequest);
router.patch('/updateStatus/:id', requestController.updateRequestStatus);


module.exports=router;