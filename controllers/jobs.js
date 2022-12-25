const getAllJobs = async (req, res) => {
  console.log("Get all jobs");
};

const getJob = async (req, res) => {
  console.log("Get a single job with particular id");
};

const createJob = async (req, res) => {
  console.log("Create a job");
};

const updateJob = async (req, res) => {
  console.log("Update a job");
};

const deleteJob = async (req, res) => {
  console.log("Delete a job");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
