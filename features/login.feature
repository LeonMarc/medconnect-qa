Feature: Login en MedConnect

  Scenario: A professional logs in with valid credentials
    Given I am on the login page
    When I log in with email "dra.rivas@medconnect.test" and password "Salud2024!"
    Then I see the feed greeting