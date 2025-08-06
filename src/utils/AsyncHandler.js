// way #1
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(err.code || 500).json({
      status: false,
      message: err.message,
    });
  }
};

// way #2
const asyncHandler2 = (requestHandler) => {
 return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler2 };
