# bamazon-node-app

**INSTRUCTIONAL VIDEO ON HOW TO USE:**   
https://drive.google.com/open?id=1HMjakEiKpD-3_IxM9liDmY5zSYB0xJ9B


You can find this app on my portfolio as well:  
https://malvarius.github.io/bootstrap-portfolio/portfolio.html  

The nature of this app is to allow you to perform diffferent functions to a warehouse-simulating database.  

There are two JS files that can be ran with node, one is bamazon.js and the other is bamazonmanager.js.   

Bamazon can be used to see what items are available for "purchase" and also to purchase an item by ID if the quantity is available.

**Make sure to run the following in the command line to install necessary node packages before execution: npm install**

**An example transaction with bamazon would look like this:**  

 node bamazon  
connection as ID 147  
Would you like to purchase a product or end transaction? Purchase  
Which product would you like to purchase? Please enter the ID of the product you want 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
ID: 1 | Product: soccer ball | Department: sports | Price: 15 | Qty Available: 100  
ID: 2 | Product: baseball glove | Department: sports | Price: 40 | Qty Available: 50  
ID: 3 | Product: iPhone | Department: electronics | Price: 300 | Qty Available: 4  
ID: 4 | Product: Nintendo Switch | Department: electronics | Price: 275 | Qty Available: 40  
ID: 5 | Product: LG TV | Department: electronics | Price: 750 | Qty Available: 3  
ID: 6 | Product: Pop Socket | Department: accessories | Price: 5 | Qty Available: 400  
ID: 7 | Product: Earrings | Department: accessories | Price: 10 | Qty Available: 100  
ID: 8 | Product: Wrist Band | Department: accessories | Price: 2 | Qty Available: 100  
ID: 9 | Product: Harry Potter | Department: movies | Price: 20 | Qty Available: 150  
ID: 10 | Product: Jurassic Park | Department: movies | Price: 20 | Qty Available: 150  
ID: 11 | Product: BackPack | Department: Supplies | Price: 25 | Qty Available: 100  
ID: 12 | Product: Laptop | Department: electronics | Price: 500 | Qty Available: 15  
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
? Which product would you like to purchase? Please enter the ID of the product you want. 1  
? How much of that product would you like to purchase? 12  
- - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
You purchased 12 of the following item: soccer ball  
Your total purchase cost was: $180  
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
**An example transaction with bamazonmanager would look like this:**  
$ node bamazonmanager  
? Please select one of the following View Low Inventory  
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
ID: 3 | Product: iPhone | Department: electronics | Price: 300 | Qty Available: 4  
ID: 5 | Product: LG TV | Department: electronics | Price: 750 | Qty Available: 3  
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
? Please select one of the following (Use arrow keys)  
> View Products for Sale  
  View Low Inventory  
  Add to Inventory  
  Add New Product  
  End Connection  
    
**Your own api keys will be needed in a .env file to use this and will look as follows:**  
DB_HOST=host here  
DB_USER=user here   
PW= password here  

**As well as you will need the following node packages:**  
inquirer  
mysql  
dotenv  

