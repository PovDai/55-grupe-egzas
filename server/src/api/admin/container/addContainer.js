import { connection } from "../../../db.js";

export async function addContainer(req, res) {
    const { name,category,time,rating} = req.body;

    try {
        const sql = `
            INSERT INTO admin_details (name,category,time,rating)
            VALUES (?, ?, ?, ?)
        `;
        const values = [name,category,time,rating]

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Procedure added successfully',
            insertedId: result.insertId
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: 'error',
            message: 'Something unexpected has occurred',
            error: error.message
        });
    }
}