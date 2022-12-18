const nodePrinter = require('@thiagoelg/node-printer');

const handler = async (req, res) => {
    if (req.method === "GET") {
        const getPrinter = nodePrinter.getPrinter();
        console.log(req.method);
        let response = []
        if (Array.isArray(getPrinter)) {
            response = getPrinter
        } else {
            response.push(getPrinter)
        }
        res.status(200).json(response)
    } else {
        res.status(403).json({ message: "for denied " })
    }
}
export default handler

