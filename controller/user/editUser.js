import query from "../../db/index.js";

const editUser = async (req, res) => {
  const username = req.params.username;
  const email = req.body.email;
  const name = req.body.name;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const dbRes = await query(
    "UPDATE users SET email=$1 name=$2 WHERE username=$3",
    [email, name, username]
  );

  if (token === null) {
    const notFoundRes = {
      message: "No users are update",
    };
    res.status(404).json(notFoundRes);
  } else {
    const successRes = {
      message: `Users modified with username: ${username}`,
    };
    res.status(200).json(successRes);
  }
};

export default editUser;

// get the jwt token
// then check belongs to whom user id
//
// get the update information from body
// from this user id execute update query
