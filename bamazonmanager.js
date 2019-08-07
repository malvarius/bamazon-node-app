// require of keys for passwords and host/user
// require mysql
var keys = require('./keys.js');
var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: keys.host,
    port: 3306,
    user: keys.user,
    password: keys.pw,
    database: 'bamazon'

});
// function to show all products
function queryTable() {
    connection.query("SELECT * FROM customer_products", function (err, res) {
        if (err) throw err;
        console.log('\r')
        console.log('=======================')
        // console.log('Reading data from customer_products')
        for (i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Department: ${res[i].department_name} | Price: ${res[i].price} | Qty Available: ${res[i].stock}`)
        }
        console.log('=======================')
    });
}
//  function to show low qty products
function queryLowStock() {
    connection.query("SELECT * FROM customer_products where stock < 5", function (err, res) {
        if (err) throw err;
        console.log('\r')
        console.log('=======================')
        // console.log('Reading data from customer_products')
        for (i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Department: ${res[i].department_name} | Price: ${res[i].price} | Qty Available: ${res[i].stock}`)
        }
        console.log('=======================')
    });
}


function inquirerFunction() {

    inquirer
    .prompt([
        {
            message: 'Please select one of the following',
            type:'list',
            name:'choices',
            choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
        }
    ])
    .then(answers => {
        // what to do if you view products for sale
        if (answers.choices==='View Products for Sale'){
            queryTable();
        }else if(answers.choices==='View Low Inventory'){
            queryLowStock();
        }else if(answers.choices==='Add to Inventory'){
            // add add to inventory function
        }else if (answers.choices==='Add New Product'){
            
        }
        
    });
}
inquirerFunction();