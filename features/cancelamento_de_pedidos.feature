Feature: Cancelamento de Pedido
	As a Cliente logado no aplicativo
	I want to cancelar um pedido  

Scenario: Cancelamento pelo cliente antes do início de preparo
	Given que estou logado como "Cliente" com login "johndoe" e senha "1234"
	And fiz um pedido no Restaurante "Casa Regional" de valor "R$30,00"
	And o preparo de tal pedido ainda não foi iniciado
	When eu tento cancelar o pedido
	Then o pedido é cancelado e "R$30,00" são estornados para minha conta


Scenario: Cancelamento pelo cliente depois do início de preparo e dentro do limite do tempo de entrega
	Given que estou logado como "Cliente" com login "johndoe" e senha "1234"
	And fiz um pedido no Restaurante "Casa Regional" de valor "R$30,00"
	And o preparo de tal pedido foi iniciado
	And já se passaram "29 minutos" além do tempo estimado de entrega
	When eu tento cancelar o pedido
	Then recebo uma mensagem de que não posso realizar tal operação


Scenario: Cancelamento pelo cliente depois do início de preparo e além do limite do  tempo de entrega
	Given que estou logado como "Cliente" com login "johndoe" e senha "1234"
	And fiz um pedido no Restaurante "Casa Regional" de valor "R$30,00"
	And o preparo de tal pedido foi iniciado
	And já passaram "30 minutos" além do tempo estimado de entrega
	When eu tento cancelar o pedido
	Then o pedido é cancelado e "R$30,00" são estornados para minha conta

Scenario: Cancelamento pelo restaurante antes do pedido ser passado ao entregador
	Given que estou logado como "Restaurante" com login "casaregional" e senha "1234"
	And recebi um pedido do Cliente "John Doe" de valor "R$30,00"
	And o pedido foi confirmado, mas ainda não foi passado ao entregador
	When eu tento cancelar o pedido
	Then o pedido é cancelado e "R$30,00" são estornados para a conta do cliente "John Doe"
