
Feature: histórico de pedidos
    As a usuário do aplicativo de delivery
    I want to visualizar meu histórico de pedidos
    So that eu possa conferir os pedidos que fiz utilizando o aplicativo

Scenario: visualizing a empty orders history page
    Given I'm logged as a User "Felipe Gonçalves"
        And I haven't made my first order yet
    When I access the history page
    Then I see a notification telling me that there are no previous orders to be shown

Scenario: visualizing orders history page with days filter
    Given I'm logged as a User "Felipe Gonçalves"
    When I access the order history page
        And I select "7 days" in days filter
    Then I see all the orders I made in the past 7 days (with pagination)

Scenario: visualizing a specific order in orders history page
    Given I'm logged as a User "Felipe Gonçalves"
    When I access the order history page
        And I see all the orders I made in the current month (with pagination)
        And I click on the first order
    Then I see the details about this order

Scenario: doens't have a history orders when days filter applied
    Given I'm logged as a User "Felipe Gonçalves"
        And I haven't made orders during the last 7 days
    When I access the order history page
        And I select "7 days" in days filter
    Then I see a notification telling me that there are no orders to be shown