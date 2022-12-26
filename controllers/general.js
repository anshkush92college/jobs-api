const general = async (req, res) => {
  try {
    res.status(200).json({ message: "Hello World!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { general };
