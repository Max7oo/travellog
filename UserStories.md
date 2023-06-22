## User Stories

```
As a visiter,
So I can create a PlaceList,
I want to be able to create an account.
```
| Classes         | Methods            | Scenario                                          | Outputs                       |
|-----------------|--------------------|---------------------------------------------------|-------------------------------|
| `Core`		  | `CreateUser()`	   | Create account with username, password and email  | Account stored in AccountList |

```
As a user,
I want to be able to add a Place to my PlaceList,
So I can see where I have been.
```
| Classes         | Methods     | Scenario                | Outputs                   |
|-----------------|-------------|-------------------------|---------------------------|
| `Core`		  | `AddPlace()`| Add Place to PlaceList  | Place stored in PlaceList |

```
As a user,
I want to have CRUD functionalities to edit my Places,
So I make any changes I want.
```
| Classes         | Methods     | Scenario                | Outputs      |
|-----------------|-------------|-------------------------|--------------|
| `Core`		  | `CRUD()`    | Change Place items      | Edited place |

```
As a user,
I want to be able to select Place's,
So I do a query in ChatGPT on where to go next.
```
| Classes         | Methods           | Scenario                                     | Outputs                        |
|-----------------|-------------------|----------------------------------------------|--------------------------------|
| `Core`		  | `SelectedPlaces()`| Select a couple of Place from the PlaceList  | Places are stored in QueryList |

```
As a user,
When I click on the suggest button,
I want to receive a suggestion based on my QueryList.
```
| Classes         | Methods             | Scenario                                         | Outputs                         |
|-----------------|---------------------|--------------------------------------------------|---------------------------------|
| `Core`		  | `ReturnSuggestion()`| Ask ChatGPT where to go next based on QueryList  | Suggestion for where to go next |

```
As a user,
I want to be able to save the suggestions,
So I can view them later.
```
| Classes         | Methods             | Scenario                   | Outputs             |
|-----------------|---------------------|----------------------------|---------------------|
| `Core`		  | `SaveSuggestion()`  | Save suggestion to a list  | List of suggestions |
