const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const home_dir = require('os').homedir();

const PrintFile = async (req, res) => {
    console.log(home_dir);
    if (req.method === "POST") {
        const query = req.query
        if (query.file) {

            const file_url = query.file;
            const file_name = query.file.split('/').at(-1);
            const folder_path = await path.join(home_dir, '/Documents/printer_file');

            // create folder in client home Document
            await fs.mkdir(folder_path, { recursive: true }, (err) => { if (err) { console.log({ err }) } });
            // create file stream 
            const file = await fs.createWriteStream(path.resolve(folder_path, file_name));
            // get file in server 
            await https.get(file_url, function (response) {
                response.pipe(file);
                // close file
                file.on("finish", () => {
                    file.close();
                    res.status(200).json({ message: "Printed!" })
                });
            });


        }
        else {
            res.status(400).json({ message: "please use a query { file } example ?file=''" })
        }
    } else {
        res.status(200).json({ test: 'Please Use POST method' })
    }
}
export default PrintFile