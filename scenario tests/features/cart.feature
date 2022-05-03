Feature: Carrinho de compras

Scenario: carrinho sem itens
    Given Estou na página “carrinho de compras”
    And eu estou logado como cliente “enriqson”
    And não existe nenhum item no carrinho
    Then aparece uma mensagem “O seu carrinho está vazio”
    And aparece um botão escrito “Adicione itens ao seu carrinho” que redireciona para a página “lista de restaurantes”