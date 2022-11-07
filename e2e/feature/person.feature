Feature: Search for character (person)

Scenario: Search for a valid character/person
        Given I navigate to "localhost"
        When I search for a person
        Then Character details are displayed as expected
        
Scenario: Search for invalid character/person
        Given I navigate to "localhost"
        When I search for invalid character
        Then I should be able to see “Not found” in the results