const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

router.get('/', getAllJobs);
router.post('/create', createJob);
router.get('/:id', getJob);
router.patch('/edit/:id', updateJob);
router.delete('/delete/:id', deleteJob);

module.exports = router;
