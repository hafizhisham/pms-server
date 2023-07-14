import query from "../../db/index.js";

const listAllProject = async (req, res) => {
  const dbRes = await query(
    "SELECT id, client, phone, address, staff, status FROM projects"
  );
  const serverRes = {
    message: `${dbRes.rowCount} projects are found`,
    data: dbRes.rows,
  };
  res.status(200).json(serverRes);
};

export default listAllProject;
