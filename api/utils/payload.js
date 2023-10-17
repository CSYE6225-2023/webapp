import { setResponse } from "./response.js";


export const checkPayloadBody = (req, res, next) => {
  const check = Object.keys(req.body).length || Object.keys(req.query).length;
  if (check) {
    setResponse(res, 400);
  } else {
    return next();
  }
};


export const checkPayLoadForPost = (compulsory, optional) => {
  return (req, res, next) => {
    const params = Object.keys(req.params).length;
    if (params) {
      setResponse(res, 400);
      return;
    }


    const check = Object.keys(req.body).length;
    if (check) {
      const keys = Object.keys(req.body);
      const missing = compulsory.filter((item) => !keys.includes(item));
      if (missing.length) {
        setResponse(
          res,
          400,
          `Missing compulsory fields: ${missing.join(", ")}`
        );
      } else {
        const extra = keys.filter(
          (item) => !compulsory.includes(item) && !optional.includes(item)
        );
        if (extra.length) {
          setResponse(res, 400, `Extra fields: ${extra.join(", ")}`);
        } else {
          optional.forEach((item) => {
            if (req.body[item]) {
              delete req.body[item];
            }
          });
          return next();
        }
      }
    } else {
      setResponse(res, 400);
    }
  };
};


export const checkPayLoadForPutRequest = (schema, optional) => {
  return (req, res, next) => {
    const params = Object.keys(req.params).length;
    if (params) {
      setResponse(res, 400);
      return;
    }

    const requestBodyKeys = Object.keys(req.body);

    const hasInvalidProperties = requestBodyKeys.some(
      (property) => !schema.includes(property)
    );

    const hasSchemaProperties = requestBodyKeys.some((property) =>
      schema.includes(property)
    );

    if (hasInvalidProperties || !hasSchemaProperties) {
      setResponse(res, 400);
    } else {
      for (const key of optional) {
        if (req.body[key]) {
          delete req.body[key];
        }
      }

      
      return next();
    }
  };
};