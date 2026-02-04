
const express = require('express'); 
const controller = require('../controllers/campaign.controller'); 

const router = express.Router(); 

router.post('/', controller.create); 
router.get('/', controller.list); 
router.get('/:id',controller.getOne); 
router.patch('/:id/status',controller.updateStatus);
router.get('/:id/stats',controller.stats); 

module.exports = router; 