const nodePrinter = require('@thiagoelg/node-printer');

 const  handler =  async (req, res) => { 
    const getPrinter = await nodePrinter.getPrinter();
    let response = []
    if(Array.isArray(getPrinter)){
        response = getPrinter
    }else{
        response.push(getPrinter)
    }
    res.status(200).json(response)
}
export default handler

