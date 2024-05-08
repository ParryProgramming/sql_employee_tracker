const logo = require("asciiart-logo");
const db = require("./db");
const { prompt } = require("inquirer");

init();

// displays logo text and loads main prompts
function init() {
    const logoText = logo({ name: "City of Pawnee" }).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {

    prompt([
        {
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View Employee Roles', 'View All Employees By Department', 'Add Employee', 'Add Employee Role', 'Add Department', 'Update Employee Role']
        }
    ]).then((res) => {

        const userChoice = res.start
        switch (userChoice) {

            case 'View All Employees':
                viewEmployees()
                break;

            case 'View All Employee Roles':
                viewRoles()
                break;

            case 'View All Employees By Department':
                viewDepartments()
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Add Employee Role':
                addRole();
                break;

            case 'Add Department':
                addDepartment()
                break;

            case 'Update Employee Role':
                updateEmployee();
                break;

        }
    });
}

function viewEmployees() {
    db.findAllEmployees()
        .then(({ rows }) => {
            console.table(rows)
        })
        .then(() => {
            loadMainPrompts()
        })

}
const updateEmployee = async () => {
    let { rows } = await db.findAllEmployees()
    const employees = rows.map(({ employee_id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: employee_id
    }));


    let res = await db.findAllRoles()

    let list = res.rows

    const roles = list.map(({ role_id, title }) => ({
        name: title,
        value: role_id
    }))


    let { employee_id, update_item } = await prompt([
        {
            type: 'list',
            name: `employee_id`,
            message: 'Please choose an employee to edit:',
            choices: employees
        },


        {
            type: 'list',
            name: 'update_item',
            message: 'Please choose an item to update:',
            choices: [
                {
                    name: 'First Name',
                    value: 'first_name'
                },
                {
                    name: 'Last Name',
                    value: 'last_name'
                },
                {
                    name: 'Role',
                    value: 'role_id'
                },
            ]
        },

    ])


    let update_info;

    switch (update_item) {


        case 'first_name':
            let { newFirstName } = await prompt([
                {
                    name: 'newFirstName',
                    message: 'Please enter a new first name:'
                }
            ])
            update_info = newFirstName;
            break;


        case 'last_name':
            let { newLastName } = await prompt([
                {
                    name: 'newLastName',
                    message: 'Please enter a new last name:'
                }
            ])
            update_info = newLastName;
            break;


        case 'role_id':
            let { newRole } = await prompt([
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Please enter a new role:',
                    choices: roles
                }
            ])
            update_info = newRole;
            break;
    }
    await db.updateEmployee(employee_id, update_item, update_info)

    console.log('Updated Employee.')

    loadMainPrompts()
}

function viewRoles() {

    db.findAllRoles()
        .then(({ rows }) => {
            console.table(rows)
        })
        .then(() =>
            loadMainPrompts())
}

const addRole = async () => {

    let { rows } = await db.findAllDepartments();

    const departments = rows.map(({ department_name, department_id }) => ({
        name: department_name,
        value: department_id
    }))


    let { newRole, newSalary, department } = await prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Please enter new role name:'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'Please enter salary for new role:'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Please enter department for new role:',
            choices: departments
        }
    ]);

    await db.inputRole(newRole, newSalary, department)

    console.log('Added role.')

    loadMainPrompts()
}

function viewDepartments() {

    db.findAllDepartments()
        .then(({ rows }) => {
            console.table(rows)
        })
        .then(() =>
            loadMainPrompts())
}

const addDepartment = async () => {

    let { newDepartment } = await prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter the new department name:'
        }
    ])

    await db.inputDepartment(newDepartment);

    console.log('New department added.');

    loadMainPrompts();
}

const addEmployee = async () => {

    let { rows } = await db.findAllRoles()

    const roles = rows.map(({ role_id, title }) => ({
        name: title,
        value: role_id
    }))

    let { first_name, last_name, role_id } = await prompt([
        {
            type: 'input',
            name: 'first_name',
            message: `Please enter employee's first name:`
        },
        {
            type: 'input',
            name: 'last_name',
            message: `Please enter employee's last name:`
        },
        {
            type: 'list',
            name: 'role_id',
            message: `Please enter employee's role:`,
            choices: roles
        },
    ])
    await db.inputEmployee(first_name, last_name, role_id)

    console.log('Employee added.')

    loadMainPrompts();
}

