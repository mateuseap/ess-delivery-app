Feature: Carrinho de compras

Scenario: carrinho sem itens
    Given Estou na página “cart”
    And eu estou logado como cliente “Felipe Gonçalves”
    And não existe nenhum item no carrinho
    Then aparece uma mensagem “Seu carrinho está vazio :(Adicione itens em um de nossos restaurantes!”
    And aparece um botão escrito “Ver restaurantes” que redireciona para a página “home”

    
Scenario: Finalizar carrinho e ir para o pedido
    Given Estou na página “cart”
    And eu estou logado como cliente “Felipe Gonçalves”
    And existem itens “Frango a milanesa” e “Cubos de carne ao molho madeira”
    When eu clico no botão “Fazer Pedido” 
    Then sou redirecionado para a página “order-details”