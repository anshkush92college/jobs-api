const getAllJobs = async (req, res) => {
  try {
    res.status(200).json({ message: '/jobs route' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    res.status(200).json({ message: '/job/:id route' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    res.status(200).json({ message: '/job/create route' });
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
