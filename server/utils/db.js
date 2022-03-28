const fs = require("fs");

exports.ManipulateDatabase = class {
  constructor(dbName, mode = "append", content = "") {
    this.dbName = dbName + ".json";
    this.content = JSON.stringify(content);
    switch (mode) {
      case "write":
        fs.writeFile(this.dbName, this.content, (err) => {
          if (err) throw err;
        });
        break;
      case "append":
        fs.appendFile(this.dbName, this.content, (err) => {
          if (err) throw err;
        });
        break;
      case "read":
        fs.readFile(this.dbName, "utf-8", (err, data) => {
          if (err) throw err;
          this.response = JSON.parse(data);
        });
        break;
      default:
        console.log(mode);
    }
  }

  getFileContent() {
    return this.response;
  }
};
