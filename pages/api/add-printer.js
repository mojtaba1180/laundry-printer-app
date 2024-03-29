import initDB from '../../utils/lowdb';

const handler = async (req, res) => {
    if (req.method === "POST") {
        const db = await initDB()

        // If file.json doesn't exist, db.data will be null
        // Set default data
        db.data ||= { printers: [] }
        // Create and query items using plain JS
        db.data.printers.push(req.body.values)
        // Write db.data content to db.json
        await db.write()
        res.status(200).json({ message: "ok" })
    } else {
        res.status(503).json({ message: "bad-request" })
    }
}


export default handler
