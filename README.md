API URL: http://car-booking-backend.herokuapp.com/v0.1.0/

To use protected endpoints use the following request header  
Authorization: Bearer {JWT_TOKEN}  

## login user

POST /auth  
BODY:  
``` JSON
{"email": "admin@gmail.com", "password": "1234"}  
```
RESPONSE:  
``` JSON
{"status":200,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNDQ1YWU3MTc5YTE3ZTIxMmIyNDIiLCJpYXQiOjE1ODMyMzYzNTMsImV4cCI6MTU4NTgyODM1M30.vrc1C1FLwtJM4cHRzEMYvZuznLqrYncma9t85OlPr9I","role":"admin/customer"}}. 
```

## create user

POST /users  
BODY:  
``` JSON
{"firstName":"FirstName","lastName":"LastName","email":"email@gmail.com","password":"1234"}  
```

## get current user (admin/customer only) 
GET /users/me  

## create car (admin only)

POST /cars  
BODY  
``` JSON
{"make":"car 2","model":"car 2","year":"2001","description":"test"}
```
   
RESPONSE:  
``` JSON
{"status":200,"data":{"\_\_v":0,"updatedAt":"2020-03-03T12:01:51.920Z","createdAt":"2020-03-03T12:01:51.920Z","make":"car 2","model":"car 2","year":2001,"description":"test","\_id":"5e5e472ff4ad0400179ece7c"}}
```

## get all cars (admin/customer only)

GET /cars  
RESPONSE:  
``` JSON
{"status":200,"data":[{"_id":"5e5e4476f4ad0400179ece79","updatedAt":"2020-03-03T11:50:14.656Z","createdAt":"2020-03-03T11:50:14.656Z","make":"asdasd","model":"adads","year":2001,"description":"asdasd","__v":0},{"_id":"5e5e472ff4ad0400179ece7c","updatedAt":"2020-03-03T12:01:51.920Z","createdAt":"2020-03-03T12:01:51.920Z","make":"car 2","model":"car 2","year":2001,"description":"test","__v":0}]}. 
```

## get single car (admin/customer only)

GET /cars/:id  
RESPONSE:  
``` JSON
{"status":200,"data":{"\_id":"5e5e4476f4ad0400179ece79","updatedAt":"2020-03-03T11:50:14.656Z","createdAt":"2020-03-03T11:50:14.656Z","make":"asdasd","model":"adads","year":2001,"description":"asdasd","\_\_v":0}} 
``` 

## delete single car (admin only)

DELETE /cars/:id

## book car (customer only)
POST /cars/:id/book  
BODY  
``` JSON
{"startDate":"2020-03-17T12:05:45.041Z","endDate":"2020-03-18T12:05:47.574Z"}
```  

## get car booking (admin only)
GET /bookings?car={car.\_id}  
RESPONSE:  
``` JSON
{"status":200,"data":[{"_id":"5e5e449cf4ad0400179ece7a","updatedAt":"2020-03-03T11:50:52.930Z","createdAt":"2020-03-03T11:50:52.930Z","user":{"_id":"5e5e439ff4ad0400179ece78","updatedAt":"2020-03-03T11:46:39.216Z","createdAt":"2020-03-03T11:46:39.216Z","firstName":"Andrei","lastName":"Dan","email":"andreidani96@gmail.com","password":"$2b$10$UA/WVpagZ9bWfZ5FJHCTGeqSuusQn0IT4cqLzYqqm2rcdS1g4kv/6","role":"customer","__v":0},"car":"5e5e4476f4ad0400179ece79","startDate":"2020-03-04T11:50:50.168Z","endDate":"2020-03-13T11:50:51.864Z","__v":0}]} 
``` 

**Error messages will look like this.**  
{"status":400,"message":"This car is already booked on the selected dates."}
