import multiparty from 'multiparty';
import NextCors from 'nextjs-cors';
import { print } from 'pdf-to-printer';
import initDB from '../../utils/lowdb';
const NodePrinter = require('@thiagoelg/node-printer');
const path = require('path');
const home_dir = require('os').homedir();
// const imagemagick = require('imagemagick-native');
export const config = { api: { bodyParser: false } }


const Handler = async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === 'POST') {
        const form = new multiparty.Form();
        const data = await new Promise((resolve, reject) => {
            form.parse(req, function (err, fields, files) {
                if (err) reject({ err });
                resolve({ fields, files });
            });
        });

        await handlePrint(data, req, res);

        // Process a POST request
        // res.status(200).json({ data: 'success' });
    } else {
        // Handle any other HTTP method
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
};

export default Handler


const handlePrint = async (data, req, response) => {

    const printer = data.fields.printer[0];
    // const printer_options = data.fields.options[0];
    const file_path = data.files.file[0].path;

    const db = await initDB()

    if (!file_path) {
        throw 'PDF file name is missing. Please use the following params: <filename> [printername]'
    }
    if (!printer) {
        response.status(400).json({ message: "printer param not found" });
        throw "printer param not found";
    }

    // console.log(printer_options);

    const device = db.data.printers.find(pri => pri.name == printer);
    if (device) {
        let options = {
            printer: device.printer,
        };
        // if (printer_options.length) {

        // }

        await print(file_path, options).then((res) => {
            response.status(200).json({ message: "printed" })
        }
        ).catch(err => {
            response.status(500).json({ message: "error for print" })
        });

    } else {
        response.status(400).json({ message: "printer not found" })
    }


}




// export default PrintFile