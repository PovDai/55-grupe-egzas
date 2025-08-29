import { connection } from "../../../db.js";

export async function deleteContainerById(req, res) {
    const id = req.params.id;

    try {
        const sql = "DELETE FROM admin_details WHERE id = ?";
        const [result] = await connection.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.json({
                status: 'error',
                message: 'Procedure not found'
            });
        }

        return res.json({
            status: 'success',
            message: 'Procedure deleted successfully',
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