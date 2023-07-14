import query from "../../db/index.js";

const addProject = async (req, res) => {
  try {
    const body = req.body;

    const dbRes = await query(
      "INSERT INTO projects (client, phone, address, staff, status) VALUES ($1, $2, $3, $4, $5)",
      [body.client, body.phone, body.address, body.staff, body.status]
    );
    const serverRes = {
      message: "A project created",
    };
    res.status(200).json(serverRes);
  } catch (error) {
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: detail,
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default addProject;
