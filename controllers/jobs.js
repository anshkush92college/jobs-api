const { StatusCodes } = require('http-status-codes');

const { BadRequestError, NotFoundError } = require('../errors');
const Job = require('../models/job');

const getAllJobs = async (req, res) => {
  try {
    console.log(req.user);
    // Finding all jobs for the logged in user
    const jobs = await Job.find({ createdBy: req.user.id }).sort('createdAt');
    console.log(jobs);
    res.status(StatusCodes.OK).json({ message: '/jobs route', jobs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    console.log(req.user);
    // Finding a job of particular id by the logged in user
    const job = await Job.findOne({
      $and: [
        {
          createdBy: req.user.id,
          _id: req.params.id,
        },
      ],
    });
    res.status(200).json({ message: '/job/:id route', job });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    console.log(req.body);
    const job = await Job.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ message: '/job/create route', job });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    res.status(200).json({ message: '/job/edit/:id route' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    res.status(200).json({ message: '/job/delete/:id route' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
