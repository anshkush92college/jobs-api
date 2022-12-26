const general = async (req, res) => {
  try {
    res.send(
      '<h1>Welcome to the Job API</h1> <a href="/api-docs">API Documentation</a>'
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { general };
