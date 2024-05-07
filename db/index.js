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

  findAllEmployees() {
    return this.query('SELECT * FROM employee');
  }

  inputEmployee(first_name, last_name, role_id){
    return this.query('INSERT INTO employee(first_name, last_name, role_id) VALUES ($1, $2, $3)', [first_name, last_name, role_id])
  }

  updateEmployee(employee_id, update_item, update_info){
    return this.query(`UPDATE employee SET ${update_item} = $2 where employee_id = $1`, [employee_id, update_info])
  }

  findAllRoles(){
    return this.query('SELECT * FROM roles');
  }

  inputRole(title, salary, department_id){
    return this.query('INSERT INTO roles(title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id])
  }

  findAllDepartments(){
    return this.query('SELECT * FROM department');
  }

  inputDepartment(department_name){
    return this.query('INSERT INTO department(department_name) VALUES ($1)', [department_name])
  }
}

module.exports = new DB();