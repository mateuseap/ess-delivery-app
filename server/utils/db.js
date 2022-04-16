const fs = require("fs");
const jsonQuery = require("json-query");
// atenção ao nodemon => se rodar o nodemon fora da pasta SERVER
// esse path abaixo está errado (a raíz é da onde o nodemon foi inicializado)
const path = "./data/";

exports.ManipulateDatabase = class {
  // private
  #tableName;
  #document;
  #filePath;

  constructor(tableName) {
    this.#tableName = tableName;
    this.#filePath = path + this.#tableName + ".json";
    this.read();
  }

  read(match = null) {
    this.#document = JSON.parse(
      fs.readFileSync(this.#filePath, "utf8", (err) => {
        if (err) throw err;
      })
    );

    if (match) {
      return this.query(match);
    }
  }

  write(data) {
    // sobrescreve tudo
    // aqui seria pra remover conteúdo ou atualizar
    // IMPORTANTE => "data" é do tipo "this.#document" (não é só o array)
    fs.writeFileSync(this.#filePath, JSON.stringify(data), (err) => {
      if (err) throw err;
    });
    this.read();
  }

  // como é arquivo JSON, temos que fazer o append dessa forma
  append(content) {
    // tem que puxar pra dentro do array, e não pro objeto
    this.#document[this.#tableName].push(content);
    this.saveChanges();
  }

  // se deleteCount == 0 => ele só vai ter replace (que na verdade eh um insert)
  // se replaceItems for vazio => só vai ter delete
  deleteOrReplace(startIndex, deleteCount = 0, ...replaceItems) {
    if (deleteCount || replaceItems.length) {
      this.#document[this.#tableName].splice(
        startIndex,
        deleteCount,
        replaceItems
      );
      this.saveChanges();
    }
  }

  saveChanges() {
    this.write(this.#document);
  }

  getArray() {
    return this.#document[this.#tableName];
  }

  query(match) {
    let qStr = "";

    if (match.inner != undefined) {
      const name = match.inner.nameObjToQuery;
      qStr = `[${match.inner.matchId}]`;

      return jsonQuery(name + qStr, {
        data: this.#document,
      }).value;
    } else if (match.deep != undefined) {
      if (match.deep.deepSearch) qStr = "[**]";
      match.deep.booleans.forEach((element) => {
        if (element.findOne) {
          qStr += "[" + element.expr + "]";
        } else {
          qStr += "[*" + element.expr + "]";
        }
      });

      return jsonQuery(this.#tableName + qStr, {
        data: this.#document,
      }).value;
    }
  }

  // dev tools
  printArrayCollection() {
    this.#document[this.#tableName].forEach((element) => {
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
