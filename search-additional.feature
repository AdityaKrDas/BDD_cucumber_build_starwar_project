
Feature: Additional flows
    
    Scenario: clear the “Search form” and hit the Search button again
        Given I navigate to "localhost"
        When I clear text box from above scenario 
        And I click on Search button
        Then I should get an empty result list previous search results are removed

    Scenario: Searched for a planet then switch to People and search, you should get a “Not found” in the results
        Given I navigate to "localhost"
        When I search by selecting people radio btn, clear and then provide planet name in text box and search
        Then I should get “Not found” in search results

    Scenario: Search for person "Darth" to see multiple results
        Given I navigate to "localhost"
        When I search for person having multiple search results
        Then More than one results are listed 

       