Scenario: Confirmou pedido
  Given cliente “Rafael123” faz um pedido de "Hambúrguer Vegano”
  And estou logado como restaurante "HamburguerCia” com senha “123”
  And recebo o pedido do cliente “Rafael123”
  When altero o status do pedido para “Pedido confirmado”
  Then recebi confirmação de envio da notificação ao cliente
  And o status do pedido indica “Pedido confirmado”
  And sou redirecionado para a tela de preparo

Scenario: Em preparo
  Given “Rafael123” aguardando o pedido de “Hamburguer Vegano”
  And estou logado como restaurante “hamburguerCia” com senha “123”
  And o pedido começou o preparo
  When altero o status do pedido para “Pedido em preparo”
  Then recebi confirmação de envio da notificação ao cliente
  And o status do pedido indica “Pedido em preparo”
  And sou redirecionado para tela de envio

Scenario: Saiu para entrega
  Given “Rafael123” aguardando o pedido de “Hamburguer Vegano”
  And estou logado como restaurante “HamburguerCia” com senha “123”
  And o pedido saiu para entrega
  When altero o status do pedido para “Saiu para entrega”
  Then recebi confirmação de envio da notificação ao cliente
  And o status do pedido indica “Saiu para entrega”
  And recebi confirmação de envio da notificação ao cliente
