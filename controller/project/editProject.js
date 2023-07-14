import query from "../../db/index.js";

const editProject = async (req, res) => {
  const id = req.params.id;
  const client = req.body.client;
  const phone = req.body.phone;
  const address = req.body.address;
  const staff = req.body.staff;
  const status = req.body.status;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const dbRes = await query(
    "UPDATE projects SET client=$1, phone=$2, address=$3, staff=$4, status=$5 WHERE id=$6",
    [client, phone, address, staff, status, id]
  );

  if (token === null) {
    const notFoundRes = {
      message: "No projects are update",
    };
    res.status(404).json(notFoundRes);
  } else {
    const successRes = {
      message: `Projects modified with id: ${id}`,
    };
    res.status(200).json(successRes);
  }
};

export default editProject;

// get the jwt token
// then check belongs to whom user id
//
// get the update information from body
// from this user id execute update query
