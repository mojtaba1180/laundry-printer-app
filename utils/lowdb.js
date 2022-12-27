import { JSONFile, Low } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const initDB = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    // Use JSON file for storage
    const file = join(__dirname, '..', 'pages', 'api', 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)
    await db.read()
    return db
}

export default initDB