
# MySQL

1. Log into the server as root
2. Type `mysql`
3. Type `show databases;` to show all databases (We're using COP4331)
4. Type `describe COP4331.Contacts;` to view the Contacts schema
5. Type `describe COP4331.Users;` to view the Users schema

# Contacts Table

| Field     | Type        | Null | Key | Default | Extra          |
|-----------|-------------|------|-----|---------|----------------|
| ID        | int         | NO   | PRI | NULL    | auto_increment |
| FirstName | varchar(50) | NO   |     |         |                |
| LastName  | varchar(50) | NO   |     |         |                |
| Phone     | varchar(50) | NO   |     |         |                |
| Email     | varchar(50) | NO   |     |         |                |
| UserID    | int         | NO   |     | 0       |                |

# Users Table

| Field     | Type        | Null | Key | Default | Extra          |
|-----------|-------------|------|-----|---------|----------------|
| ID        | int         | NO   | PRI | NULL    | auto_increment |
| FirstName | varchar(50) | NO   |     |         |                |
| LastName  | varchar(50) | NO   |     |         |                |
| Login     | varchar(50) | NO   |     |         |                |
| Password  | varchar(50) | NO   |     |         |                |