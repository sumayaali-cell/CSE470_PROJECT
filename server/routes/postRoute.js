const express = require("express");
const { uploadPost, getItems, getItemById, submitReport, getReport, deleteItem, postQuestion, getUserQuestions, postAnswer, getAnswers, getItemByName, getDonatedItems, updateClaimed, getResolved, getMyItems, getNotification, updateResolved, getResolvedCasesById } = require("../controllers/postController");
const upload = require('../middlewares/multer')


const router = express.Router();

router.post('/upload-post',upload.single("image"),uploadPost)
router.get('/get-all-post',getItems)

//second sprint
router.get('/get-item-by-id/:id',getItemById)
router.post('/submit-report',submitReport)
router.get('/get-report',getReport)
router.delete('/delete-item/:itemId',deleteItem)
router.post('/post-question/:reportId',postQuestion)
router.get('/get-question/:userId',getUserQuestions)
router.put('/post-answer/:reportId',postAnswer)
router.get('/get-answer/:reportId',getAnswers)
router.get('/get-item-by-name/:search',getItemByName)
router.get('/get-donated-item',getDonatedItems)
router.put('/update-claimed/:itemId/:userId',updateClaimed)
router.get('/get-resolved',getResolved)
router.get('/get-my-items/:userId',getMyItems)
router.get('/get-notification/:userId',getNotification)
router.put('/update-resolved/:itemId',updateResolved)
router.get('/get-resolved-cases-by-id/:userId',getResolvedCasesById)


module.exports = router;