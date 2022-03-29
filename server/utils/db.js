const fs = require("fs");
const jsonQuery = require("json-query");
// atenção ao nodemon => se rodar o nodemon fora da pasta SERVER
// esse path abaixo está errado (a raíz é da onde o nodemon foi inicializado)
const path = "./data/";

exports.ManipulateDatabase = class {
  constructor(tableName) {
    this.tableName = path + tableName + ".json";
    this.read();
    
  }

  read() {
    this.document = JSON.parse(
      fs.readFileSync(this.tableName, "utf8", (err) => {
        if (err) throw err;
      })
    );
    this.key = Object.keys(this.document)[0];
    this.array = this.document[this.key];
  }

  write(obj) {
    // sobrescreve tudo
    // aqui seria pra remover conteúdo ou atualizar
    // IMPORTANTE => obj é do tipo this.document (não é só o array)
    fs.writeFileSync(this.tableName, JSON.stringify(obj), (err) => {
      if (err) throw err;
    });
  }

  // como é arquivo JSON, temos que fazer o append dessa forma
  append(content) {
    // tem que puxar pra dentro do array, e não pro objeto
    this.array.push(content);
    this.write(this.document);
  }

  // match com esses valores
  // se deleteCount = 0 => ele só vai ter replace
  // se replaceItems = [] => só vai ter delete
  deleteOrReplace(startIndex, deleteCount = 0, replaceItems = []) {
    // delete
    if (deleteCount) this.array.splice(startIndex, deleteCount);
    if (replaceItems.length) {
      countIndex = startIndex;
      replaceItems.forEach((element) => {
        this.array.splice(countIndex, 0, element);
        countIndex += 1;
      });
    }
  }

  query(match) {
    // Comandos para fazer a query podem ser vistos abaixo:
    // não precisa adicionar o nome do array (a concatenação com o this.key já faz isso)
    // https://www.npmjs.com/package/json-query
    return jsonQuery(this.key + match, { data: this.document }).value;
  }

  getFileContent(withKey = true) {
    if (withKey) return this.document[this.key];
    return this.document;
  }

  // dev tools
  printArrayCollection() {
    this.array.forEach((element) => {
      if (Array.isArray(element) && element.length) {
        element.forEach((e) => {
          // para não ter quebra de linha
          process.stdout.write(e);
        });
      } else {
        console.log(element);
      }
    });
  }
};
