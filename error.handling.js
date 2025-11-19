const errorMiddleware = (err, req, res, next) => {
  //Create a Subscription -> middleware(check for renewal date)-> middleware(check for error) -> next -> controller
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);
    //Mongoose Bad ObjectID
    if (err.name === "CastError") {
      const message = "Resource Not Found";
      error = new Error(message);
      error.statusCode = 404;
    }
    //Mongoose Duplicate Key
    if (err.code === 11000) {
      const message = "Duplicate field value Entered";
      error = new Error(message);
      error.statusCode = 400;
    }
    //Mongoose Validation Error
    if (err.name === "ValidationalError") {
      const message = Object.value(err.error).map((val) => val.message);
      error = new Error(message.join(","));
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
