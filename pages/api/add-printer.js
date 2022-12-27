import { JSONFile, Low } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const handler = async (req, res) => {
    if(req.method === "POST"){
        console.log(req.body);
        const __dirname = dirname(fileURLToPath(import.meta.url));
        // Use JSON file for storage
        const file = join(__dirname, 'db.json')
        const adapter = new JSONFile(file)
        const db = new Low(adapter)
    
        // Read data from JSON file, this will set db.data content
        await db.read()
    
        // If file.json doesn't exist, db.data will be null
        // Set default data
        db.data ||= { printers: [] }
        // db.data = db.data || { printers: [] } // for node < v15.x
        // Create and query items using plain JS
        db.data.printers.push(req.body.values)
        db.data.printers[0]
        // Write db.data content to db.json
        await db.write()
        res.status(200).json({ message: "ok" })
    }else {
        res.status(503).json({ message: "bad-request" })

    }
}


export default handler
