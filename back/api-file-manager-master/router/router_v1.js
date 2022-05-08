const {Router} = require('express')
const filesController = require('../controllers/files.controller_v1')

const router = new Router()

//api/files/
router.get('/all',  filesController.getAll)

router.post('/create/dir', filesController.createDir)
router.post('/upload/', filesController.uploader)

router.delete('/delete', filesController.remover)


module.exports = router