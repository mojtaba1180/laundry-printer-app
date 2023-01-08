import NextCors from 'nextjs-cors';

const nodePrinter = require('@thiagoelg/node-printer');

const handler = async (req, res) => {
        await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "GET") {
        const getPrinter = nodePrinter.getPrinters();
        let response = []
        if (Array.isArray(getPrinter)) {
            response = getPrinter
        } else {
            response.push(getPrinter)
        }
        res.status(200).json(response)
    } else {
        res.status(403).json("for denied")

    }
}
export default handler

