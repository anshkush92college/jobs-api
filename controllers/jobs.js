const { StatusCodes } = require('http-status-codes');

const { BadRequestError, NotFoundError } = require('../errors');
const Job = require('../models/job');
const isValidObjectId = require('../utils/isValidObjectId');

const getAllJobs = async (req, res) => {
  try {
    // Finding all jobs for the logged in user
    const jobs = await Job.find({ createdBy: req.user.id }).sort('createdAt');

    res.status(StatusCodes.OK).json({ message: '/jobs route', jobs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    // Checking if the id is valid
    if (!isValidObjectId(req.params.id)) {
      throw new BadRequestError('Invalid job id');
    }

    // Finding a job of particular id by the logged in user
    const job = await Job.findOne({
      createdBy: req.user.id,
      _id: req.params.id,
    });

    if (!job) {
      throw new NotFoundError(`Job not found with id  ${req.params.id}`);
    }

    res.status(200).json({ message: '/job/:id route', job });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const job = await Job.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({ message: '/job/create route', job });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    // Checking if the id is valid
    if (!isValidObjectId(req.params.id)) {
      throw new BadRequestError('Invalid job id');
    }

    // Getting the new job details
    const { company, position, status } = req.body;

    if (!company || !position || !status) {
      throw new BadRequestError('Please enter values in all of the fields');
    }

    // Getting a job which needs to be updated and passing the new values
    const job = await Job.findByIdAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!job) {
      throw new NotFoundError(`Job not found with id  ${req.params.id}`);
    }

    res.status(200).json({ message: '/job/edit/:id route', updatedJob: job });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    // Checking if the id is valid
    if (!isValidObjectId(req.params.id)) {
      throw new BadRequestError('Invalid job id');
    }

    res.status(200).json({ message: '/job/delete/:id route' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
