import { JSONFile, Low } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const handler = async (req, res) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Use JSON file for storage
    const file = join(__dirname, 'config.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)

    // Read data from JSON file, this will set db.data content
    await db.read()

    // If file.json doesn't exist, db.data will be null
    // Set default data
    db.data ||= { posts: [] }
    // db.data = db.data || { posts: [] } // for node < v15.x

    // Create and query items using plain JS
    db.data.posts.push('hello world')
    db.data.posts[0]
    // Write db.data content to db.json
    await db.write()
    res.status(200).json({ message: "ok" })
}


export default handler
