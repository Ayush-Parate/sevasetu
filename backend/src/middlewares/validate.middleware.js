function validate(schema, source = "body") {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[source], { abortEarly: false, stripUnknown: true });
    if (error) {
      return next({
        statusCode: 400,
        message: "Validation error",
        details: error.details.map((d) => d.message)
      });
    }
    req[source] = value;
    return next();
  };
}

module.exports = { validate };
