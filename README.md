# Another-chance
Another chance is an application for animal non profit organizations to store and manage animal blood donors.

## User Stories

* As a Veterinarian,
+ I want access to an animal donor database that I can quickly query records by animal type & location.
+ I want to be able to create, edit, and retrieve animal records.
+ I want to view all existing animal records.

* As an Administrative User,
+ I want to create, edit, retrieve and delete User accounts.
+ I want to view how many Users are in the database.
+ I want to view how many Animals are in the database.

### Access levels

Admins - Full CRUD (create, read, update, delete) access to ALL records and Users.

Users - Veterinarians and staff will be able to search, create, and update animal records. Users may delete records they created, but cannot delete records from other Vets. Users can also edit their own profile information.

### Authorization

Only authorized users may login and view the animal donor database. Authorization is handled through Passport.JS. A JSON Web Token is issued to each user upon new account, and upon login the token is verified with the database.

### User account creation JSON model example

```
firstName : Glen,
lastName : Pham,
email : glen@glen.com,
company : Philanthropist Coders,
position : Web Developer,
phone : 111-111-1111
```

### Animal donor JSON model example
Bloodtype will correlate to type of animal.

```
name: molly,
type: dog,
breed: pomeranian,
weight: 2kg,
age: 15 months,
bloodType: DEA 1.1,
contactName: Maria Lee,
contactNumber: 111-111-1111,
vetName: Mrs. Lee,
location: Puerto Rico,
photo: cutest_dog.jpg,
createdBy: Glen Pham
```
