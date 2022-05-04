Feature: Carrinho de compras
    As a usuário do aplicativo de delivery
    I want to modificar meu carrinho de compras
    So that eu possa fazer meu pedido

Scenario: carrinho sem itens
    Given Estou na página “cart”
    And eu estou logado como cliente “Felipe Gonçalves”
    And não existe nenhum item no carrinho
    Then aparece uma mensagem “Seu carrinho está vazio :(Adicione itens em um de nossos restaurantes!”
    And aparece um botão escrito “Ver restaurantes” que redireciona para a página “home”

    
Scenario: Finalizar carrinho e ir para o pedido
    Given Estou na página “cart”
    And eu estou logado como cliente “Felipe Gonçalves”
    And existem itens “Frango a milanesa” e “Cubos de carne ao molho madeira” no carrinho
    When eu clico no botão de fazer pedido
    Then sou redirecionado para a página “details”


Scenario: retirar itens do carrinho
    Given Estou na página “cart”
    And eu estou logado como cliente “Felipe Gonçalves”
    And existem itens “Frango a milanesa” e “Cubos de carne ao molho madeira” no carrinho
    When eu clico no botão remover item em “Frango a milanesa”
    Then o item “Frango a milanesa” é removido do carrinho
    And o total do carrinho é atualizado


Scenario: adicionar itens no carrinho
    Given Estou na página “cart”
    And eu estou logado como cliente “Felipe Gonçalves”
    And existem itens “Frango a milanesa” e “Cubos de carne ao molho madeira” com quantidades “1” e “1” no carrinho
    When eu clico no botão adicionar item em “Frango a milanesa”
    Then mais um item “Frango a milanesa” é adicionado ao estado atual do carrinho de compras
    And o total do carrinho é atualizado
