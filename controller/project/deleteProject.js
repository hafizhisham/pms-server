import query from "../../db/index.js";

const deleteProject = async (req, res) => {
  const id = req.params.id;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const dbRes = await query("DELETE FROM projects WHERE id = $1", [
    id,
  ]);
  if (token === null) {
    const notFoundRes = {
      message: "No projects deleted",
    };
    res.status(404).json(notFoundRes);
  } else {
    const successRes = {
      message: `Project with ID = ${id} are deleted`,
    };
    res.status(200).json(successRes);
  }
};

export default deleteProject;
