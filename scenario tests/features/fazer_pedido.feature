Feature: Fazer pedido
	As a client que possui uma conta no aplicativo
	I want to fazer um pedido

Scenario: O cliente vai escolher os produtos que deseja
	Given Selecionei um restaurante e estou na página “home”
	When Clico em um produto para adiciona-lo ao carrinho
	Then O carrinho é atualizado e o valor total aumenta
	And Clico em confirmar
	Then Sou redirecionado para a próxima etapa e recebo uma confirmação

Scenario: O cliente tenta adicionar um item do restaurante errado
	Given Estou na pagina do restaurante de id "1"
	And O carrinho já possui um item de outro restaurante
	When Tento adicionar um item
	Then O item não é adicionado ao carrinho

