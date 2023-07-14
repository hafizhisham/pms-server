import query from "../../db/index.js";

const viewProject = async (req, res) => {
  const id = req.params.id;
  const dbRes = await query("SELECT * FROM projects WHERE id=$1", [id]);
  if (dbRes.rows.length === 0) {
    const notFoundRes = {
      message: "No projects found",
    };
    res.status(404).json(notFoundRes);
  }
  const successRes = {
    message: `${dbRes.rowCount} projects are found`,
    data: dbRes.rows,
  };
  res.status(200).json(successRes);
};

export default viewProject;
