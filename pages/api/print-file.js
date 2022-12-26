import http_get_file from '../../utils/http_get_file';
const Printer = require('@thiagoelg/node-printer');
const path = require('path');
const home_dir = require('os').homedir();
const imagemagick = require('imagemagick-native');

const PrintFile = async (req, response) => {
    if (req.method === "GET") {
        const query = req.query
        if (query.file) {

            const file_url = query.file;
            const { printer } = query;
            const file_name = query.file.split('/').at(-1);
            const folder_path = path.join(home_dir, '/Documents/printer_file');


            if (process.platform !== 'win32') {
                throw 'This application can be run only on win32 as a demo of print PDF image'
            }

            if (!file_name) {
                throw 'PDF file name is missing. Please use the following params: <filename> [printername]'
            }


            await http_get_file(file_url, file_name, folder_path).then(res => {
                const file_path = path.join(folder_path, file_name);
                console.log(file_path);
                if (printer || file_url) {
                    if (process.platform != 'win32') {
                        Printer.printFile({
                            filename: file_path,
                            printer: printer, // Printer name, if missing then will print to default Printer
                            success: function (jobID) {
                                response.status(200).json({ message: "print not windows " })
                                console.log("sent to Printer with ID: " + jobID);
                            },
                            error: function (err) {
                                response.status(400).json({ message: "error print not windows " })
                                console.log(err);
                            }
                        });
                    } else {
                        Printer.printDirect({
                            data: file_path,
                            printer: printer, // printer name, if missing then will print to default printer
                            success: function (jobID) {
                                response.status(200).json({ message: "printed" })
                                console.log("sent to printer with ID: " + jobID);
                            },
                            error: function (err) {
                                response.status(400).json({ message: "error in to print" })
                                console.log(err);
                            }
                        });

                    }
                } else {
                    response.status(400).json({ message: "please check your query params example : url?printer='test'&file_uri='http://test.pdf'" })
                }

            })

        }
        else {
            response.status(400).json({ message: "please use a query { file } example ?file=''" })
        }
    } else {
        response.status(200).json({ test: 'Please Use GET method' })
    }
}
export default PrintFile