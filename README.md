# Another-chance
Another chance is an application for animal non profit organizations to store and manage animal blood donors.

### Access levels

Admins - Full CRUD(create, read, update, delete) access to ALL records.

Users - Veterinarians and staff will be able to search, add, and edit animal records. No delete access.

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
```
