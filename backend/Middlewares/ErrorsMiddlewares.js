class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const login = async (req, res,next) =>{}

export const errorMiddleware = (err, req, res, next) => {
    err.message=err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    console.log(err);

    if(err.code===11000){
      const message="Duplicate key error";
      const statusCode=400;
      err=new ErrorHandler(message,statusCode);
    }

    if(err.name === "JsonWebTokenError"){
      const message="Json Web Token Error";
      const statusCode=400;
      err=new ErrorHandler(message,statusCode);
    }

    if(err.name === "TokenExpiredError"){
      const message="Token Expired Error";
      const statusCode=400
      err=new ErrorHandler(message,statusCode);
    }

    if(err.name === "CastError"){
      const message="Cast Error";
      const statusCode=400;
      err=new ErrorHandler(message,statusCode);
    }

    ["Name is requried","Email is required", "Password is required"].forEach((error) => {})
    const errMessage=err.errors;
   
}