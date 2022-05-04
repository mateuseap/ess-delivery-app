Feature: Status de pedido
	As a Cliente logado no aplicativo
	I want to Ver o status do meu pedido 

Scenario: Status de pedido "Confirmado"
	Given Estou na página de "Detalhes do pedido"
	And Estou logado como cliente "Felipe Gonçalves"
	And fiz um pedido no Restaurante "Elias" de valor "R$ 25,50"
	When eu olho pro status do pedido
	Then eu vejo que indica "Confirmado"

Scenario: Status de pedido "Em preparo"
	Given Estou na página de "Detalhes do pedido"
	And Estou logado como cliente "Felipe Gonçalves"
	And fiz um pedido no Restaurante "Elias" de valor "R$ 25,50"
	When eu olho pro status do pedido
	Then eu vejo que indica "Confirmado" e "Em preparo"

Scenario: Status de pedido "Saiu para Entrega"
	Given Estou na página de "Detalhes do pedido"
	And Estou logado como cliente "Felipe Gonçalves"
	And fiz um pedido no Restaurante "Elias" de valor "R$ 25,50"
	When eu olho pro status do pedido
	Then eu vejo que indica "Confirmado", "Em preparo" e "Saiu para entrega"

Scenario: Status de pedido "Finalizado"
	Given Estou na página de "Detalhes do pedido"
	And Estou logado como cliente "Felipe Gonçalves"
	And fiz um pedido no Restaurante "Elias" de valor "R$ 25,50"
	When eu olho pro status do pedido
	Then eu vejo que indica "Confirmado", "Em preparo", "Saiu para entrega" e "Finalizado"