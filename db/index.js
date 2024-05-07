const pool = require("./connection");

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // TODO- Create a query to Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.query(`SELECT * FROM employee`);
  }
  findAllRoles() {
    return this.query(`SELECT * FROM roles`);
  }
  findAllDepartments() {
    return this.query(`SELECT * FROM department`)
  }
  inputDepartment(department_name) {
    return this.query(`INSERT INTO department(department_name) VALUES ($1)`, [department_name]);
  }
  inputRole(title, salary, department_id) {
    return this.query(`INSERT INTO roles(title, salary, department_id) VALUES ($1, $2, $3)`, [title, salary, department_id])
  }
  inputEmployee(first_name, last_name, title) {
    return this.query(`INSERT INTO employees (first_name, last_name, title) VALUES ($1, $2, $3)`, [first_name, last_name, title])
  }

  // TODO- Create a query to Find all employees except the given employee id

  // TODO- Create a query to Create a new employee

  // BONUS- Create a query to Remove an employee with the given id

  // TODO- Create a query to Update the given employee's role

  // BONUS- Create a query to Update the given employee's manager

  // TODO- Create a query to Find all roles, join with departments to display the department name

  // TODO- Create a query to Create a new role

  // BONUS- Create a query to Remove a role from the db

  // TODO- Create a query to Find all departments

  // BONUS- Create a query to Find all departments, join with employees and roles and sum up utilized department budget

  // TODO- Create a query to Create a new department

  // BONUS- Create a query to Remove a department

  // BONUS- Create a query to Find all employees in a given department, join with roles to display role titles

  // BONUS- Create a query to Find all employees by manager, join with departments and roles to display titles and department names
}

module.exports = new DB();