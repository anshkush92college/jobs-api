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
router.get('/job/:id', getJob);
router.post('/job', createJob);
router.patch('/job/:id', updateJob);
router.delete('/job/:id', deleteJob);

module.exports = router;
