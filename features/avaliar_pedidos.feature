Feature: Avaliar Pedidos
    As a Cliente que possui uma conta no aplicativo
    I want to Avaliar Pedidos

Scenario: Avaliando um pedido qualquer sem texto de feedback
    Given Estou logado como usuário com login “guimorone” e senha “12345”
        And eu estou na página de histórico de pedidos
        And vou avaliar um pedido
    When eu clico em avaliar um pedido
        And avalio o pedido com 4 estrelas
        And deixo a caixa de texto de feedback em branco
        And clico em enviar avaliação
    Then Eu vejo uma mensagem de sucesso na tela

Scenario: Avaliando um pedido qualquer com texto de feedback
    Given Estou logado como usuário com login “guimorone” e senha “12345”
        And eu estou na página de histórico de pedidos
        And vou avaliar um pedido
    When eu clico em avaliar um pedido
        And adiciono estrelas com base na minha satisfação
        And escrevo a frase “gostei bastante do pedido” na caixa de texto de feedback
        And clico em enviar avaliação
    Then Eu vejo uma mensagem de sucesso na tela

Scenario: Avaliando múltiplos pedidos feitos em um mesmo restaurante sem texto de feedback
    Given Estou logado como usuário com login “guimorone” e senha “12345”
	    And eu estou na página de histórico de pedidos
	    And vou avaliar um pedido de um restaurante que eu já avaliei outro pedido
	When eu clico em avaliar um pedido de um restaurante que eu já conheço
        And adiciono estrelas com base na minha satisfação
        And deixo a caixa de texto de feedback em branco
        And clico em enviar avaliação
	Then Eu vejo uma mensagem de sucesso na tela

Scenario: Avaliando múltiplos pedidos feitos em um mesmo restaurante com texto de feedback
    Given Estou logado como usuário com login “guimorone” e senha “12345”
        And eu estou na página de histórico de pedidos
        And vou avaliar um pedido de um restaurante que eu já avaliei outro pedido
	When eu clico em avaliar um pedido de um restaurante que eu já conheço
        And adiciono estrelas com base na minha satisfação
        And escrevo a frase “Gostei bastante do pedido!” na caixa de texto de feedback
        And clico em enviar avaliação
	Then Eu vejo uma mensagem de sucesso na tela