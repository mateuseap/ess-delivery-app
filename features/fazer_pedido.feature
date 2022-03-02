Scenario: O cliente vai escolher os produtos que deseja
	Given: Selecionei o restaurante que desejo e estou na página “cardápio”
	When: Clico em um produto para adicioná-lo ao carrinho
	Then: O carrinho é atualizado e o valor total aumenta
	And: Clico em confirmar
	Then: Recebo uma mensagem de confirmação e sou redirecionado para a próxima etapa

Scenario: Escolha do endereço
	Given: Estou na página “Escolha o local de entrega” 
	When: Eu clico na opção de permitir o aplicativo acessar minha localização
		Then: O mapa é atulizado para a minha localização
		And: Confirmo a localização
		Then: Sou direcionado para a próxima etapa do pedido

Scenario: Revisão do pedido
	Given: Estou na página “Revisar pedido” 
	When: Olho os itens do carrinho e confirmo que estão certos
	And: Confirmo que a localização está correta e clico na opção de confirmar o pedido
	Then: Sou direcionado para a próxima etapa do pedido

Scenario: Cliente vai pagar pelo seu pedido
	Given: Estou na página “Pagamento”
	When: Vejo que o valor total está correto e seleciono a opção de pagamento
	And: Pago o valor final
	Then: Recebo uma confirmação e sou direcionado para a próxima etapa
	
Scenario: Cliente finalizou o pagamento
	Given: Estou na página após o pagamento
	And: Recebi uma mensagem de confirmação do aplicatio
	Then: Posso sair do aplicativo e esperar a entrega do pedido

Scenario: Novo cenário de testes

