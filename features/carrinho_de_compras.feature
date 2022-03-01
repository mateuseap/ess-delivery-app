Scenario: carrinho sem itens
GIVEN Estou na página “carrinho de compras”
AND eu estou logado como cliente “enriqson”
AND não existe nenhum item no carrinho
THEN aparece uma mensagem “O seu carrinho está vazio”
AND aparece um botão escrito “Adicione itens ao seu carrinho” que redireciona para a página “lista de restaurantes”

Scenario: retirar itens do carrinho
GIVEN Estou na página “carrinho de compras”
AND eu estou logado como cliente “enriqson”
AND existem itens “lasanha” and “rocambole” no carrinho
WHEN eu clico no botão “remover item” em “lasanha”
THEN “lasanha” desaparece da lista
AND o estado atual do carrinho é salva no sistema

Scenario: adicionar itens no carrinho
GIVEN Estou na página do restaurante “Almir Quentinhas”
AND eu estou logado como cliente “enriqson”
AND existem itens “lasanha” and “rocambole” no cardápio
AND o carrinho está vazio
WHEN eu clico no botão “adicionar item ao carrinho” em no item “lasanha”
THEN o item é adicionado ao estado atual do carrinho de compras
AND o ícone do carrinho é atualizado para refletir o estado atual de 1 item

Scenario: Finalizar carrinho e ir para o pedido
GIVEN Estou na página “carrinho de compras”
AND eu estou logado como cliente “enriqson”
AND existem itens “lasanha” and “rocambole”
WHEN eu clico no botão “fazer pedido” 
THEN sou redirecionado para a página “fazer pedido”
