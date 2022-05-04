Feature: Tempo de entrega
	As usuário padrão
	I want to calcular o tempo de entrega para um dado pedido
	So that eu posso acompanhar melhor o status desse pedido


Scenario: calcular tempo de entrega de pedido em preparo
	Given eu estou logado como usuário padrão
	And estou na tela de histórico de pedidos
	When eu seleciono “acompanhar pedido” referente a um pedido em andamento
	Then eu estou na tela de detalhes desse pedido
	And consigo visualizar, entre outras informações, a previsão de entrega do pedido
	
Scenario: calcular tempo de entrega de pedido já concluído
	Given eu estou logado como usuário padrão
	And estou na tela de histórico de pedidos
	When eu seleciono “acompanhar pedido” referente a um pedido dito em andamento
	Then eu estou na tela de detalhes desse pedido
	And consigo visualizar que ele já foi finalizado
	And não consigo ver o tempo de entrega para esse pedido