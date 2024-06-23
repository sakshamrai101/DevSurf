# Excluding 3rd party login 

## Context and Problem Statement

While discussing the login feature of the project, we had the idea of using google or other account logins to login to our website.

## Decision Drivers

* The login page should be fast and easy to use for users.
* The login page should have few chances for problems.

## Considered Options

* Include Google accounts to login
* Include Github accounts to login
* Include LinkedIn accounts to login
* Do not include any other accounts to login

## Decision Outcome

Chosen option: "Do not include any other accounts to login", because we did not want to have more dependencies on our project and it would make the login process simpler to set up.
