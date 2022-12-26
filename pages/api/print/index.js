const Printer = require('@thiagoelg/node-printer');

const handler = async (req, res) => {
  const {printer,file_uri} = req.query
  if (req.method === "GET") {
    
    const filename = process.argv[2] || __filename;
    // console.log('platform:', process.platform);
    // console.log('try to print file: ' + filename);
    if(printer || file_uri){
      if (process.platform != 'win32') {

            Printer.printFile({
              filename: filename,
              Printer: printer, // Printer name, if missing then will print to default Printer
              success: function (jobID) {
                res.status(200).json({ message: "print not windows " })
                console.log("sent to Printer with ID: " + jobID);
              },
              error: function (err) {
                res.status(400).json({ message: "error print not windows " })
                console.log(err);
              }
            });  

            // Printer.printDirect({data:"print from Node.JS buffer" // or simple String: "some text"
            //   , printer:printer // printer name, if missing then will print to default printer
            //   , type: 'RAW' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
            //   , success:function(jobID){
            //     res.status(200).json({ message: "printed" })
            //     console.log("sent to printer with ID: "+jobID);
            //   }
            //   , error:function(err){console.log(err);
            //   res.status(400).json({ message: "error in to print" })}
            // });

      } else {
        // not yet implemented, use printDirect and text
      // res.status(403).json({ message: "for denied " })
        
      Printer.printDirect({
          data: filename,
          Printer: printer, // printer name, if missing then will print to default printer
          success: function (jobID) {
            res.status(200).json({ message: "printed" })
            console.log("sent to printer with ID: " + jobID);
          },
          error: function (err) {
            res.status(400).json({ message: "error in to print" })
            console.log(err);
          }
        });

        // Printer.printDirect({data:"print from Node.JS buffer" // or simple String: "some text"
        //   , printer:printer // printer name, if missing then will print to default printer
        //   , type: 'RAW' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
        //   , success:function(jobID){
        //      res.status(200).json({ message: "printed" })
        //     console.log("sent to printer with ID: "+jobID);
        //   }
          
        //   , error:function(err){console.log(err);
        //   res.status(400).json({ message: "error in to print" })
        //   }
        // });

      }
    } else{
          res.status(400).json({ message: "please check your query params example : url?printer='test'&file_uri='http://test.pdf'" })
    }  
  }else{
    res.status(403).json({ message: "please check request header (GET)" })
  }
}

export default handler