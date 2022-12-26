const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

router.get('/jobs', getAllJobs);
router.post('/job/create', createJob);
router.get('/job/:id', getJob);
router.patch('/job/edit/:id', updateJob);
router.delete('/job/delete/:id', deleteJob);

module.exports = router;
