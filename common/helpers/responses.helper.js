export const responseSuccess = (
  data = null,
  message = `OK`,
  statusCode = 200
) => {
  return {
    status: `success`, // sửa ở đây
    statusCode: statusCode,
    message: message,
    data: data,
    doc: "domain.com/swagger",
  };
};

export const responseError = (
  message = `Internal Server Error`,
  statusCode = 500,
  stack = null
) => {
  return {
    status: `error`,
    statusCode: statusCode,
    message: message,
    stack: stack,
    doc: "domain.com/swagger",
  };
};
