import initDB from '../../utils/lowdb';

const handler = async (req, res) => {
    if (req.method === "POST") {
        const db = await initDB()

        db.data.printers = db.data.printers.filter((printer) => printer.name !== req.body.name)
        await db.write()

        res.status(200).json({ message: "ok" })
    } else {
        res.status(503).json({ message: "bad-request" })
    }
}

export default handler