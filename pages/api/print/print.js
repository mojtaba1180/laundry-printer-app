const Printer = require('@thiagoelg/node-printer');

const handler = async (req, res) => {
  if (req.method === "GET") {

    const filename = process.argv[2] || __filename;
    console.log('platform:', process.platform);
    console.log('try to print file: ' + filename);

    if (process.platform != 'win32') {
      Printer.printFile({
        filename: filename,
        Printer: process.env[3], // Printer name, if missing then will print to default Printer
        success: function (jobID) {
          res.status(403).json({ message: "for denied " })
          console.log("sent to Printer with ID: " + jobID);
        },
        error: function (err) {
          res.status(403).json({ message: "for denied " })
          console.log(err);
        }
      });
      res.status(403).json({ message: "for denied " })
    } else {
      // not yet implemented, use printDirect and text

      Printer.printDirect({
        data: filename,
        Printer: process.env[3], // printer name, if missing then will print to default printer
        success: function (jobID) {
          res.status(403).json({ message: "for denied " })
          console.log("sent to printer with ID: " + jobID);
        },
        error: function (err) {
          res.status(403).json({ message: "for denied " })
          console.log(err);
        }
      });
    }
  }
}

export default handler