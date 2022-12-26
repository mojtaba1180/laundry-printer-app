const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
// const home_dir = require('os').homedir();
const http_get_file = async (file_url, file_name, folder_path) => {
    // const promise = new Promise();
    return await new Promise(async (resolve, reject) => {
        const file = fs.createWriteStream(path.resolve(folder_path, file_name));
        fs.mkdir(folder_path, { recursive: true }, (err) => { if (err) { console.log({ err }) } });
        try {
            http.get(file_url, async function (response) {
                response.pipe(file);
                // close file
                file.on("finish", () => {
                    file.close();
                    return resolve("success");
                });

            });
        } catch {
            reject("err");
        }

    });

}

export default http_get_file