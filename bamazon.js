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
// function to display contents of table
function queryTable() {
    connection.query("SELECT * FROM customer_products", function (err, res) {
        if (err) throw err;
        // console.log('Reading data from customer_products')
        for (i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Department: ${res[i].department_name} | Price: ${res[i].price} | Qty Available: ${res[i].stock}`)
        }
    });
}
// adds row to table
// function addTable (){
//     var post  = { title: 'Truth Hurts',artist:'Lizzo',genre:'Rap'};
// var query = connection.query('INSERT INTO music_table SET ?', post, function (error, results, fields) {
//   if (error) throw error;
//   console.log('Adding data to music_table')
// });
// }

// function to update product based on customer input
function updateProductQty(input, qty) {
    var sql = `UPDATE customer_products SET stock = ${qty} WHERE item_id = ${input}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    })
}
// function to check if we have enough of that product, if we do uses CB to update product qty
function checkProductQty(item_id, userQty) {
    connection.query(`SELECT item_id, price, product_name, stock FROM customer_products WHERE item_id = ${item_id} `, function (err, res) {
        if (err) throw err;
        // console.log(res[0])
        if (res[0].stock < userQty) {
            console.log('Sorry, we do not have enough of that product.')
            inquirerFunction();
        } else {
            var remainingQty = res[0].stock - userQty
            var cost = res[0].price*userQty
            console.log('=========================================')
            console.log('=========================================')
            console.log(`You purchased ${userQty} of the following item: ${res[0].product_name}`)
            console.log(`Your total purchase cost was: $${cost}`)
            console.log('=========================================')
            console.log('=========================================')
            // console.log(remainingQty)
            updateProductQty(item_id, remainingQty)
            // queryTable();
            setTimeout(inquirerFunction,50);
        }
    });
}

// inquirer function to handle user responses
function inquirerFunction(){
inquirer
.prompt([
    {
        message: 'Would you like to purchase a product or end transaction?',
        type:'list',
        choices: ['Purchase', 'End Transaction'],
        name: 'choice'
    }
])
.then(answers => {
    if (answers.choice === 'Purchase') {
        queryTable();
        inquirer
            .prompt([
                {
                    message: 'Which product would you like to purchase? Please enter the ID of the product you want.',
                    name: 'selectProduct'
                }
            ])
            .then(answers => {
                var selectProduct = answers.selectProduct;
                inquirer
                    .prompt([
                        {
                            message: 'How much of that product would you like to purchase?',
                            name: 'qtyProduct'
                        }
                    ])
                    .then(answers => {
                        // put function to check if we have the quantity and if not in that function let customer know
                        checkProductQty(selectProduct, answers.qtyProduct)
                    });

            });
    }else{
        connection.end();
    }
});
}
// connection to mysql

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connection as ID ${connection.threadId}`);
    // connects to mysql then displays all information about products in database
    // inquirer then runs to ask what product customer would like to buy and how much
    inquirerFunction();
   

});
