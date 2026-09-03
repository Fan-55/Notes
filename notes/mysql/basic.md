# MySQL Basic

1. Login to the MySQL server

```
$ mysql -u root -p
```

`-u` is followed by the username. After pressing enter, it will prompt the user to input the password without showing password onto the console.

## Database


### Show existing databases

```
$ SHOW DATABASES;
```

Capitalize the SQL keywords like SHOW and DATABASES.

### Create database

```
$ CREATE DATABASE <name>;
```

Putting space in the name of database is not recommended. It can be either camelCase or snake_case.

### Dropping the database

```
$ DROP DATABASE <name>;
```

### Use the database

```
$ USE <database name>
```
Check what database is used currently

```
$ SELECT database();
```

## Table

A database is just a bunch of tables. Tables are what hold the data and describe the format and the shape of the data. Table is a collection of related data held in a structured format within a database.

We call the headers of each table columns. The rows are the actual data.

For example, table `Cats`.

|Name|Breed|Age|
|-|-|-|
|Blue|Scottish Fold|1|
|Rocket|Persian|3|
|Monty|Tabby|10|

### Data types

Checkout the [manual](https://dev.mysql.com/doc/refman/8.0/en/data-types.html).

### Create tables

```
CREATE TABLE <table name> (
    column_name data_type,
    column_name data_type
  );
```

```
CREATE TABLE cats (
    name VARCHAR(50),
    age INT
);
 
CREATE TABLE dogs (
    name VARCHAR(50),
    breed VARCHAR(50),
    age INT
);
```

### Examining tables

1. Show existing tables

```
$ SHOW TABLES;
```

2. Show the column names of the table

```
$ SHOW COLUMNS FROM <table name>
```

or 

```
$ DESC <table name>
```

### Deleting tables

```
$ DROP TABLE <table name>
```

### Insert data

```
INSERT INTO <table name>(<column name 1>, <column name 2>, ...)
VALUES(<value 1>, <value 2>,...);
```

```
INSERT INTO cats(name, age)
VALUES("Jason", 7);
```

Multiple insert:

```
INSERT INTO <table name>(<column name 1>, <column name 2>, ...)
VALUES(<value 1>, <value 2>,...),
      (<value 1>, <value 2>,...),
      (<value 1>, <value 2>,...);
```

```
INSERT INTO cats(name, age)
VALUES("cat2", 9),
      ("cat3", 91),
      ("cat4", 50);
```

### View data

```
SELECT * FROM <table name>;
```
