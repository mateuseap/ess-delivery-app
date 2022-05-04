Feature: Fazer pedido

Scenario: O cliente vai escolher os produtos que deseja
	Given Selecionei um restaurante e estou na página “home”
	When Clico em um produto para adiciona-lo ao carrinho
	Then O carrinho é atualizado e o valor total aumenta
	And Clico em confirmar
	Then Sou redirecionado para a próxima etapa e recebo uma confirmação


