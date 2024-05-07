-- Drop the database if it exists
DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

\c employees

CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE roles(
    role_id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id),
    salary INTEGER NOT NULL
);

CREATE TABLE employee(
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
)