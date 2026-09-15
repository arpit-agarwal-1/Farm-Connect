const express = require('express')
const router = express.Router()
const liveStockController = require('../controllers/liveStockController')

router.get('/getAllLivestock', liveStockController.getAllLivestock)
router.post('/addLivestock', liveStockController.addLivestock)

router.get('/getLivestockById/:id', liveStockController.getLivestockById)
router.get('/getLivestockByUserid/:id', liveStockController.getLivestockByUserid)
router.put('/updateLivestock/:id', liveStockController.updateLivestock)
router.delete('/deleteLivestock/:id', liveStockController.deleteLivestock)

module.exports = router