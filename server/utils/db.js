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
  }

  write(obj) {
    // sobrescreve tudo
    // aqui seria pra remover conteúdo ou atualizar
    // IMPORTANTE => obj é do tipo this.document (não é só o array)
    fs.writeFileSync(this.tableName, JSON.stringify(obj), (err) => {
      if (err) throw err;
    });
    this.read();
  }

  // como é arquivo JSON, temos que fazer o append dessa forma
  append(content) {
    // tem que puxar pra dentro do array, e não pro objeto
    this.document[this.key].push(content);
    this.updateChanges();
  }

  // match com esses valores
  // se deleteCount == 0 => ele só vai ter replace (que na verdade eh um insert)
  // se replaceItems for vazio => só vai ter delete
  deleteOrReplace(startIndex, deleteCount = 0, ...replaceItems) {
    if (deleteCount || replaceItems.length) {
      this.document[this.key].splice(startIndex, deleteCount, replaceItems);
      this.updateChanges();
    }
  }

  query(match) {
    // Comandos para fazer a query podem ser vistos abaixo:
    // não precisa adicionar o nome do array (a concatenação com o this.key já faz isso)
    // https://www.npmjs.com/package/json-query
    return jsonQuery(this.key + match, { data: this.document }).value;
  }

  updateChanges() {
    this.write(this.document);
    this.read();
  }

  getArray() {
    return this.document[this.key];
  }

  // dev tools
  printArrayCollection() {
    this.document[this.key].forEach((element) => {
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
