# Estrutura do projeto a ser utilizado na disciplina de ESS

### Dependências

- React v17.0.2
- Node v16.13.1
- npm v8.3.0

### Instalando dependências

```
sudo apt install npm
```

### Iniciando o projeto

```
cd client
npm install
cd ..
cd server
npm install
```

### Rodando o projeto

Iniciar o servidor

```
cd server
nodemon
```

Iniciando o frontend

```
cd client
npm start
```

## Como estruturar a query no back

#### Inner Queries

```
{
    inner: {
        nameObjToQuery: "name",
        matchId: "nameObjToMatch.id"
    }
}
```

#### Deep Queries

```
{
    booleans: [
        {
        findOne: true or false,
        expr: "expr1"
        },
        {
        findOne: true or false,
        expr: "expr2"
        }
    ]
}
```

#### Com algumas variações

= equivale IGUAL, & equivale AND, | equivale OR. O resto fica igual

#### docs: https://www.npmjs.com/package/json-query
