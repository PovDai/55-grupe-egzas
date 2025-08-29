import { connection } from "../../db.js"

export async function addBox(req, res) {
    const { name,category,image,time} = req.body;

    try {
        const sql = `
            INSERT INTO admin_details (name,category,image,time)
            VALUES (?,?,?,?)
        `;
        const values = [name,category,image,time]

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Added successfully',
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