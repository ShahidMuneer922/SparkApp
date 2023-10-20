/** @format */

const Middle = async (req, res, next) => {
  try {
    console.log("BODY", req.body);
    // console.log("QUERY-PARAMS", req.query);
    // console.log("HEADERS", req.headers);
    console.log("URL", req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err });
  }
};

export default Middle;
