const fs = require("fs");
// ele vê o caminho a partir da raiz do projeto
const path = './server/data/';

exports.ManipulateDatabase = class {
  constructor(tableName, mode = "read", content = "") {
    this.tableName = path + tableName + ".json";
    this.content = JSON.stringify(content);
    switch (mode) {
      case "write":
        this.#write();
        break;
      case "append":
        this.#append();
        break;
      case "read":
        this.#read();
        break;
      default:
        console.log(mode);
    }
  }

  #read() {
    this.response = JSON.parse(fs.readFileSync(this.tableName, "utf8", (err) => {
      if (err) throw err;
    }));
  }

  #write(obj = this.content) {
    // sobrescreve tudo
    // aqui seria pra remover conteúdo ou atualizar
    fs.writeFileSync(this.tableName, obj, (err) => {
      if (err) throw err;
    });
  }

  #append() {
    this.read();
    const key = Object.keys(this.response);
    // tem que puxar pra dentro do array, e não pro objeto
    this.response[key[0]].push(this.content);
    this.write(this.response);
  }

  getFileContent() {
    return this.response;
  }
};
