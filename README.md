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

## Front (client)

### Documentação:

#### Javascript: https://www.w3schools.com/jsref/default.asp

#### React: https://pt-br.reactjs.org/docs/getting-started.html

#### React bootstrap: https://react-bootstrap.github.io/

#### Redux duck: https://blog.rocketseat.com.br/estrutura-redux-escalavel-com-ducks/

#### Redux saga: https://redux-saga.js.org/docs/api <br> https://blog.logrocket.com/understanding-redux-saga-action-creators-sagas/

## Back (server)

### Como estruturar uma query

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
    deep: {
        deepSearch: true or false, // [**]
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
}
```

#### Com algumas variações

##### = -> IGUAL

##### & -> AND

##### | -> OR

##### O resto se mantém da forma tradicional

### Documentação:

#### Json Query: https://www.npmjs.com/package/json-query
