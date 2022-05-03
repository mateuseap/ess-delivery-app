const fs = require("fs");
const jsonQuery = require("json-query");

const path = process.env.NODE_ENV === "test" ? "./test_data/" : "./data/";

exports.ManipulateDatabase = class {
  tableName;
  document;
  filePath;

  constructor(tableName) {
    this.tableName = tableName;
    this.filePath = path + this.tableName + ".json";
    this.read();
  }

  read(match = null) {
    this.document = JSON.parse(fs.readFileSync(this.filePath, "utf8"));

    if (match) {
      return this.query(match);
    }
  }

  write(data) {
    // sobrescreve tudo
    // aqui seria pra remover conteúdo ou atualizar
    // IMPORTANTE => "data" é do tipo "this.document" (não é só o array)
    fs.writeFileSync(this.filePath, JSON.stringify(data));
    this.read();
  }

  append(content) {
    this.document[this.tableName].push(content);
    this.saveChanges();
  }

  //procura por um objeto no array, caso o encontre o substitui por um novo
  //caso nao ache o adiciona ao final
  findAndReplace(compareFunction, newItem, append = true) {
    const index = this.document[this.tableName].findIndex(compareFunction);
    if (index != -1) {
      if (newItem) this.document[this.tableName].splice(index, 1, newItem);
      else this.document[this.tableName].splice(index, 1);
    } else if (append) {
      this.append(newItem);
    } else {
      throw new Error("Item não encontrado no banco de dados");
    }
    this.saveChanges();
  }

  saveChanges() {
    this.write(this.document);
  }

  getArray() {
    return this.document[this.tableName];
  }

  query(match) {
    let qStr = "";

    if (match.inner != undefined) {
      const name = match.inner.nameObjToQuery;
      qStr = `[${match.inner.matchId}]`;

      return jsonQuery(name + qStr, {
        data: this.document,
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

      return jsonQuery(this.tableName + qStr, {
        data: this.document,
      }).value;
    }
  }
};
