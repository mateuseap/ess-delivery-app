Feature: Cancelamento de Pedido
	As a Cliente logado no aplicativo
	I want to tentar cancelar um pedido  

Scenario: Cancelamento de pedido com status "Em preparo" e "sem atraso" na entrega
	Given Estou na página de "Detalhes do pedido"
	And Estou logado como cliente "Felipe Gonçalves"
	And fiz um pedido no Restaurante "Elias" de valor "R$ 25,50"
	And o status do pedido indica "Em preparo"
	And o pedido está "sem atraso" na entrega
	When eu tento cancelar o pedido
	Then eu recebo uma mensagem "Erro ao cancelar pedido"
	
Scenario: Cancelamento de pedido com status "Confirmado", e não "Em preparo"
	Given Estou na página de "Detalhes do pedido"
	And Estou logado como cliente "Felipe Gonçalves"
	And fiz um pedido no Restaurante "Elias" de valor "R$ 25,50"
	And o status do pedido indica "Confirmado", mas não "Em preparo"
	When eu tento cancelar o pedido
	Then eu recebo uma mensagem "Pedido cancelado com sucesso"


Scenario: Cancelamento de pedido com status "Em preparo" e "com atraso" na entrega
	Given Estou na página de "Detalhes do pedido"
	And Estou logado como cliente "Felipe Gonçalves"
	And fiz um pedido no Restaurante "Elias" de valor "R$ 25,50"
	And o status do pedido indica "Em preparo"
	And o pedido está "com atraso" na entrega
	When eu tento cancelar o pedido
	Then eu recebo uma mensagem "Pedido cancelado com sucesso"
