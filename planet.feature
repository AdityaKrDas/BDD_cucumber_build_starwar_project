Feature: Search for planet

    Scenario: Search a valid planet
        Given I navigate to "localhost"
        When I search for planet name
        Then Planet details are displayed as expected
    
    Scenario: Search for invalid planet
        Given I navigate to "localhost"
        When I search for invalid planet
        Then I should be able to see “Not found” message in the results