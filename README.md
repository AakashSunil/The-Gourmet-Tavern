# The-Gourmet-Tavern

A React Application for a Restaurant and Bar Setup.


To Run the Setup there are two methods - But Before that modules need to be installed for both Frontend and Backend
The Project has been setup to install both from one location

#   npm run setup

After the modules get installed - Both the Frontend and Backend need to be run.
The Server and Client will run on different ports but with the Proxy Setup on the Client Side - the API URL's will be correctly called.

Both the following Methods are Run form the Outermost package.json File Level.

# Method 1 - Run the Client and Server in Development Mode
    
#   npm start

    This will Start Both Server and Client using Package "concurrently" and defined "custom scripts" that will be run.

# Method 2 - Run the Server and A Build Version of the Client

#   npm run build

    Like the earlier method, both Server and Client will be Started using the "concurrently package" and "custom scripts".
    But, in this version a build folder will be created which will then need to be Served to the Browser. 
    All the required steps for this setup have been declared as part of the scripts to be run for the project.

    The Build Version will be Served at a Particular Link which should be seen in the Terminal/Output. 
    The Client Side will be Deployed on that Particular Link.

The Setup will include the following features 

Browser View Features - End User

    Customers Features
        1. Registration and Login System
        2. Menu Display - Food and Drinks
        3. About and Contact Pages
        4. Ordering System
        5. Active Cart System

    Administration Features
        1. Same Features as that of a Customer 
        2. CRUD Operations for the Items
            a. Add Items - Food and Drink
            b. Delete Items - Food and Drink
            c. Update Items - Food and Drink

    Technical Features - Working Behind the Scenes
        1. NoSQL Schema Database - MongoDB
        2. Node and Express JS Backend
        3. JWT Authentication for Session Management
        4. Encryted Passwords for Saving in the Database
        5. React Redux Architecture for State Management on the Client Side
        6. React-Router Navigation - Page Navigation 
