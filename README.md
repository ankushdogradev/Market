# MARKET

MARKET is an E-Commerce website.

## Features

- User can log into his/her account or create a new one.
- USER PROFILE: from where they can check order status about payment and shipping.
- Full featured shopping cart.
- CHECKOUT PROCESS: shipping, payment method.
- PayPal integration.
- User can give reviews to products.
- Search for finding products easily.
- Admin account from where:
  * Can view all products.
  * Can view all order history.
  * New products can be added/edited.
  * Existing users can be converted into admin (vice-versa).
  * Admin can check and mark orders, delivered or not. 

> ### Things that I might add in future:
> - second payment gateway like razorpay, stripe, paytm etc.
> - Signup/login using google or github.
> - Mobile Responsiveness.

## Screenshots
![Screenshot 2021-07-04 at 13-10-10 Markets](https://user-images.githubusercontent.com/75878788/124377741-1f81bc80-dccb-11eb-8898-6ff3a1b8906d.png)
![Screenshot 2021-07-04 at 13-25-08 Markets](https://user-images.githubusercontent.com/75878788/124377763-4809b680-dccb-11eb-9e45-efac1b1438fe.png)
![image](https://user-images.githubusercontent.com/75878788/125218730-28811800-e2e1-11eb-897e-260460176cf8.png)
![Screenshot 2021-07-04 at 13-27-02 Markets](https://user-images.githubusercontent.com/75878788/124377806-8f904280-dccb-11eb-99f7-b41f800d5803.png)
![Screenshot 2021-07-04 at 13-27-53 Markets](https://user-images.githubusercontent.com/75878788/124377835-bd758700-dccb-11eb-9b81-885413951e36.png)

**ADMIN CONTROLL**
![image](https://user-images.githubusercontent.com/75878788/125095762-24db6e80-e0f2-11eb-9149-30eca694b5ca.png)
![image](https://user-images.githubusercontent.com/75878788/125095794-2dcc4000-e0f2-11eb-87ba-f2cf1b70a108.png)
![image](https://user-images.githubusercontent.com/75878788/125095880-3e7cb600-e0f2-11eb-895e-c812dc2a948d.png)




## Tech Stack

**Client:** React, Redux, Router, SCSS

**Server:** Node, Express, Mongoose

  
## Installation

1. Fork/clone or download project.
2. Make sure you have Node.js, NPM installed in your system
3. In the root folder type following commands:

```bash
npm i
```

```bash
cd client
```

```bash
npm i
```

4. It is not necessary but recommended to install nodemon globally by `npm i -g nodemon`
5. You need to create following accounts:

- [PayPal Dev Account](https://developer.paypal.com/developer/accounts/) for clientID.
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register) for mongo URI.

6. In the root folder create **.env** file


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV = development`

`PORT = 5000`

`MONGO_URI = "your mongodb uri: REMOVE DOUBLE QUOTES"`

`JWT_SECRET = "any string of your choice: REMOVE DOUBLE QUOTES "`

`PAYPAL_CLIENT_ID = "your paypal client id: REMOVE DOUBLE QUOTES"`

## Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## Run Locally

To run the project locally, open CLI in **server** folder and **client** folder:

- In server CLI enter `nodemon server.js`
- In client CLI enter `npm start`

```
Sample User Logins

admn@xyz.com (Admin)
abc$123456

messi@xyz.com (Customer)
abc$123456

ronaldo@xyz.com (Customer)
abc$123456
```

## Deploying To Heroku
- Heroku postbuild script is added to **package.json**. No, need to build manually. 
- Just install heroku and push. 

## License

MIT License

Copyright (c) [2021] [Ankush Dogra]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

