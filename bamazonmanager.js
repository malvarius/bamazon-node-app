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
        console.log('==========================================================================')
        // console.log('Reading data from customer_products')
        for (i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Department: ${res[i].department_name} | Price: ${res[i].price} | Qty Available: ${res[i].stock}`)
        }
        console.log('==========================================================================')
    });
}
//  function to show low qty products
function queryLowStock() {
    connection.query("SELECT * FROM customer_products where stock < 5", function (err, res) {
        if (err) throw err;
        console.log('\r')
        console.log('==========================================================================')
        // console.log('Reading data from customer_products')
        for (i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Department: ${res[i].department_name} | Price: ${res[i].price} | Qty Available: ${res[i].stock}`)
        }
        console.log('==========================================================================')
    });
}
// add to inventory function

function addToInventory(item_id, amount) {
    connection.query("select * from customer_products where item_id = ?", [item_id], function (err, res) {
        if (err) throw err;
        var currentProduct = res[0].product_name;
        var currentAmount = Number(res[0].stock);
        var newAmount = Number(amount) + currentAmount;
        connection.query("UPDATE customer_products SET stock = ? WHERE item_id = ?", [newAmount, item_id], function (err, res) {
            if (err) throw err;
            console.log("==========================================================================");
            console.log(`You have updated the following product: ${currentProduct}`);
            console.log(`The new total inventory of that product is: ${newAmount}`);
            console.log("==========================================================================")
        });
    });
}
// function to create a new item 
function addNewItem(name,department,price,stock){
    connection.query("insert into customer_products (product_name,department_name,price,stock) values (?,?,?,?)",[name,department,Number(price),Number(stock)],function(err,res){
        if(err) throw err
    connection.query("select * from customer_products where product_name = ?",[name],function(err,res){
        if(err) throw err
        console.log("==========================================================================");
        console.log("You added the following new item to the inventory:");
        console.log(`ID: ${res[0].item_id} | Product: ${res[0].product_name} | Department: ${res[0].department_name} | Price: ${res[0].price} | Stock: ${res[0].stock} `);
        console.log("==========================================================================");
    });
    });
}


function inquirerFunction() {

    inquirer
        .prompt([
            {
                message: 'Please select one of the following',
                type: 'list',
                name: 'choices',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product','End Connection']
            }
        ])
        .then(answers => {
            // what to do if you view products for sale
            if (answers.choices === 'View Products for Sale') {
                queryTable();
                setTimeout(inquirerFunction,50);
            } else if (answers.choices === 'View Low Inventory') {
                queryLowStock();
                setTimeout(inquirerFunction,50);
            } else if (answers.choices === 'Add to Inventory') {
                // add add to inventory function
                queryTable();
                inquirer
                    .prompt([
                        {
                            message: "Enter the item_id of the product you would like to add inventory to.",
                            name: "product"
                        }
                    ])
                    .then(answers => {
                        var idProduct = answers.product;
                        inquirer
                            .prompt([
                                {
                                name: "amount",
                                message: "How much of that product would you like to add?"
                                }
                            ])
                            .then(answers=>{
                                addToInventory(idProduct,answers.amount);
                                setTimeout(inquirerFunction,50);
                            })
                    })
            } else if (answers.choices === 'Add New Product') {
                inquirer
                .prompt([
                    {
                        name: "newProduct",
                        message:"What is the name of the new product?"
                    },
                    {
                        name: "deptName",
                        message:"What is the department name?"
                    },
                    {
                        name: "price",
                        message:"What is the price of the new product?"
                    },
                    {
                        name: "stock",
                        message:"How much stock is there of the new product?"
                    }
                ])
                .then(answers=>{
                    // add new product function here
                    addNewItem(answers.newProduct, answers.deptName,answers.price,answers.stock);
                    setTimeout(inquirerFunction,50);
                })
            } else {
                connection.end();
            }

        });
}
inquirerFunction();