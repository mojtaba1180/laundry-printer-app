const nodePrinter = require('@thiagoelg/node-printer');
import initDB from '../../utils/lowdb';

const handler = async (req, res) => {
    if (req.method === "GET") {
        const db = await initDB()

        const { printers } = db.data
        let response = []
        if (Array.isArray(printers)) {
            response = printers
        } else {
            response.push(printers)
        }

        res.status(200).json(response)
    } else {
        res.status(403).json({ message: "for denied " })
    }
}
export default handler

