Group id:
group56

Names:
Carlo Bredius 4132955
Max van Gogh 5822904

Direct link (didn't get fixed on the gemini server so unusable):
http://webtech.science.uu.nl/group56/

Brief explanation:
Start on the home page which displays the first 10 products. The amount of products can be changed with the more and less button on the bottom of the page.
The products altered and ordered with the search options.
In the aside menu an anonymous user can log in or register as a new buyer.
When on the register page a form needs to be filled in and submitted for it te be added to the Users database.
When logged in, the profile page can be reached which shows the bought history and a button to edit the logged-in user.
Only a logged in user can buy products.

Structure of application: "webshop structure.pdf"
Structure of database: "database ER model"

Logins and passwords:
There are a lot of registered users but all users have the same password (test) for convenience
An entire table can be logged by asking adding readDB("users"); in the code.
A couple with some non-empty bought histories:
Username: febe
Password: test

(Changed to show password is not hardcoded)
Username: Carlo 
Password: newPassword

Username: chantal
Password: test

SQL definition of database:
CREATE TABLE Users (name TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL, address TEXT NOT NULL, zipcode TEXT NOT NULL, email TEXT NOT NULL)
CREATE TABLE Products (name TEXT NOT NULL PRIMARY KEY, description TEXT NOT NULL, price INTEGER NOT NULL, category TEXT NOT NULL, manufacturer TEXT NOT NULL, image TEXT NOT NULL)
CREATE TABLE Transactions (username TEXT NOT NULL, productname TEXT NOT NULL)

Extra credit features:
Password and repassword usage (and check) against typo's

Discussion:
We met with Sergey and discussed groupmember investment into this assignment.
Carlo has done way more and thus it was concluded that he would get a higher grade than Max.
For example if the final assignment grade would be a 7, Carlo would get an 8 and Max would get a 6.