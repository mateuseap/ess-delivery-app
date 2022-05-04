Feature: Avaliar Pedidos
    As a Cliente que possui uma conta no aplicativo
    I want to Avaliar Pedidos
    so that Eu posso descrever como foram as minhas experiências com os pedidos

Scenario: Avaliando um pedido qualquer sem texto de feedback
    Given Estou logado com o usuário "Felipe Gonçalves"
        And eu estou na página de histórico de pedidos
        And vou avaliar um pedido
    When eu clico em avaliar um pedido
        And avalio o pedido com 3 estrelas
        And deixo a caixa de texto de feedback em branco
        And clico em "Enviar"
    Then Eu vejo uma mensagem de sucesso na tela

Scenario: Avaliando um pedido qualquer com texto de feedback
    Given Estou logado com o usuário "Felipe Gonçalves"
        And eu estou na página de histórico de pedidos
        And vou avaliar um pedido
    When eu clico em avaliar um pedido
        And avalio o pedido com 3 estrelas
        And escrevo a frase "gostei bastante do pedido" na caixa de texto de feedback
        And clico em "Enviar"
    Then Eu vejo uma mensagem de sucesso na tela

Scenario: Cancelando uma avaliação
    Given Estou logado com o usuário "Felipe Gonçalves"
        And eu estou na página de histórico de pedidos
        And vou cancelar a avaliação de um pedido
    When eu clico em avaliar um pedido
        And clico em "Cancelar"
    Then Eu volto ao estado inicial da tela

Scenario: Revisando uma avaliação
    Given Estou logado com o usuário "Felipe Gonçalves"
        And eu estou na página de histórico de pedidos
        And vou revisar uma avaliação
    When eu clico em revisar avaliação do pedido
        And eu vejo minha avaliação feita na tela
        And clico em "Voltar"
    Then Eu volto ao estado inicial da tela