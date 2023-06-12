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
I want to be able to create a PlaceList,
So I can add places I have been.
```
| Classes         | Methods            | Scenario                      | Outputs                            |
|-----------------|--------------------|-------------------------------|------------------------------------|
| `Core`		  | `CreatePlaceList()`| Create PlaceList with a name  | Placelist stored in PlaceListsList |

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