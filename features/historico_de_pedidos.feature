
Feature: histórico de pedidos
    As a usuário do aplicativo de delivery
    I want to visualizar meu histórico de pedidos
    So that eu possa conferir os pedidos que fiz utilizando o aplicativo

Scenario: visualizing a empty orders history page
    Given I’m logged as a User with login “elm2” and password “22022222”
    And I haven’t made my first order yet
    When I access the order history page
    Then I see a page telling that I there’s not previous orders to be shown

Scenario: visualizing orders history page with days filter
    Given I’m logged as a User with login “zsmn” and password “ana”
    When I access the order history page
    And I select “7 days” in days filter
    Then I see all the orders I made in the past 7 days (with pagination)

Scenario: visualizing orders history page
    Given I’m logged as a User with login “meap” and password “060”
    When I access the order history page
    Then I see all the orders I made in the current month (with pagination)

Scenario: visualizing a specific order in orders history page
    Given I’m logged as a User with login “aoqb” and password “eam”
    When I access the order history page
    Then I see all the orders I made in the current month (with pagination)
    When I click on the order with ID 10
    Then I see details about this order, like price and payment method

Scenario: doens't have a history orders when days filter applied
    Given I’m logged as a User with login “glx” and password “32525672”
    And I haven’t made orders during the last 7 days
    When I access the order history page
    And I select “7 days” in days filter
    Then I see a page telling that there’s not orders to be shown

Scenario: visualizing orders history page with days filter
    Given I’m logged as a User with login “rfla” and password “opa234”
    When I access the order history page
    And I select “15 days” in days filter
    Then I see all the orders I made in the past 15 days (with pagination)