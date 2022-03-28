const fs = require("fs");

export default class ManipulateDatabase {
  constructor(dbName, mode = "write", content = "") {
    switch (mode) {
      case "write":
        fs.writeFile(dbName, content, (err) => {
          if (err) throw err;
        });
        break;
      case "append":
        fs.appendFile(dbName, content, (err) => {
          if (err) throw err;
        });
        break;
      case "read":
        fs.readFile(dbName, content, (err, data) => {
          if (err) throw err;
          this.response = data;
        });
        break;
      default:
        console.log(mode);
    }
  }

  getFileContent() {
    return this.response;
  }
}
