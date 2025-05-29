
# Database

## Explore

1. Log into the server as root
2. Type `mysql`
3. Type `show databases;` to show all databases
4. Type `use COP4331;` to select the database we're using
5. Type `describe Contacts;` to view the Contacts schema (also added below)
6. Type `describe Users;` to view the Users schema (also added below)
7. Type `select * from Users;` to view all existing users
8. Type `select * from Contacts;` to view all existing contacts
9. Type `exit;` to exit

# Tables 

## Contacts

| Field     | Type        | Null | Key | Default | Extra          |
|-----------|-------------|------|-----|---------|----------------|
| ID        | int         | NO   | PRI | NULL    | auto_increment |
| FirstName | varchar(50) | NO   |     |         |                |
| LastName  | varchar(50) | NO   |     |         |                |
| Phone     | varchar(50) | NO   |     |         |                |
| Email     | varchar(50) | NO   |     |         |                |
| UserID    | int         | NO   |     | 0       |                |

## Users

| Field     | Type        | Null | Key | Default | Extra          |
|-----------|-------------|------|-----|---------|----------------|
| ID        | int         | NO   | PRI | NULL    | auto_increment |
| FirstName | varchar(50) | NO   |     |         |                |
| LastName  | varchar(50) | NO   |     |         |                |
| Login     | varchar(50) | NO   |     |         |                |
| Password  | varchar(50) | NO   |     |         |                |