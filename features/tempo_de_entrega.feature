Scenario: calcular tempo de entrega de pedido em preparo
	Given eu estou logado como “Williams Santiago” com senha “1234”
	And escolhi o endereço “casa” como o de entrega
	And estou na tela de pedidos em andamento
	When eu seleciono “calcular tempo de entrega” referente ao único pedido em andamento
	Then eu estou na tela de rota de entrega para o pedido
	And consigo visualizar o mapa da rota (restaurante/destino)
	And vejo em tempo real onde está meu pedido
	And consigo visualizar a previsão de entrega do pedido

Scenario: calcular tempo de entrega de pedido ainda não confirmado
	Given eu estou logado como “Williams Santiago” com senha “1234”
	And escolhi o endereço “casa” como o de entrega
	And estou na tela de pedidos em andamento
	When eu seleciono “calcular tempo de entrega” referente ao único pedido em andamento ainda não confirmado
	Then eu ainda estou na tela de detalhes do pedido ainda não confirmado
	And uma mensagem aparece na tela indicando que pedido ainda não foi confirmado
	And o tempo de entrega não é calculado
	And commit 1
	And commit 2

Scenario: calcular tempo de entrega de pedido ainda não confirmado
	Given eu estou logado como “Williams Santiago” com senha “1234”
	And escolhi o endereço “casa” como o de entrega
	And estou na tela de pedidos em andamento
