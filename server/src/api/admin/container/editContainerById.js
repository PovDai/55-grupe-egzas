import { connection } from "../../../db.js";

export async function editContainerById(req, res) {
    const id = req.params.id;
    const { name,category,time,rating } = req.body;

    try {
        const sql = `
            UPDATE admin_details 
            SET name = ?, category = ?, time = ?, rating = ?
            WHERE id = ?
        `;
        const values = [name,category,time,rating, id];

        const [result] = await connection.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.json({
                status: 'error',
                message: 'Procedure not found'
            });
        }

        return res.json({
            status: 'success',
            message: 'Procedure updated successfully',
            affectedRows: result.affectedRows
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