const notFound = (req, res) =>
  res.status(404).json({ message: 'URL doesnt exsists' });

module.exports = notFound;
