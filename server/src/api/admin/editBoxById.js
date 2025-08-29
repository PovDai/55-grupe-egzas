import { connection } from "../../db.js";  

export async function editBoxById(req, res) {
    const id = req.params.id;
    const { name,category,image,time} = req.body;
  

    try {
        const sql = `
            UPDATE admin_details 
            SET name = ?, category = ?, image = ?, time = ?
            WHERE id = ?
        `;
        const values = [name,category,image,time, id];

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