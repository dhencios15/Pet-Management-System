3. Create the Pet module that allows a user to perform CRUD operations on pet details.
   Consider the following attribute names and set their appropriate properties:
   a. PetID (AutoNumber)
   b. PetName
   c. PetType (Dog, Cat,…) – pet type must be linked w/ pet breed
   d. PetBreed (Bulldog, Poodle, Siamese Cat, Persian Cat,…)
   e. PetBdate
   f. PetGender
   g. PetNotes
   h. PetOwnerID (FK)
   i. IsActive (Default: Yes)
4. Create Pet Owner module that allows a user to perform CRUD operations on pet owner’s detail.
   Consider the following attribute names and set their appropriate properties:
   a. OwnerID (AutoNumber)
   b. OwnerName
   c. OwnerAddress
   d. OwnerCity
   e. OwnerZip
   f. OwnerMobileNo
   g. OwnerEmail
   h. IsActive (Default: Yes)

TODO:
[✔] - DELETE PET/OWNER:
   [✔] - DELETE OWNER
   [✔] - CANNOT DELETE (OWNER) WHEN STILL HAVE A PET
   [✔] - DELETE PET
[✔] - ENABLE TO ADD SAME PETNAME BUT DIFFERENT OWNER
[✔] - FIX SEARCH
