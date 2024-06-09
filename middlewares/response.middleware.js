const responseMiddleware = (req, res, next) => {
  if (!res.data && !res.err) {
    return res.status(404).json({ error: true, message: 'Requested data not found' });
  }
  
  if (res.err) {
    return res.status(400).json({ error: true, message: res.err.message });
  }

  res.status(200).json(res.data);
};

export { responseMiddleware };
