# Requirement
* ~

# Endpoint

* __production__
   * `/api/v1/product/movies`
   * `/api/v1/product/comic`
* __users__
   * `/api/v1/users`
* __admin__
   * `/api/v1/admin/users`

# Api Fiture availabel

1. rate limiter
1. auth/jwt
1. caching
1. cors

# 
# Detail information endpoint
### Response api

```json
{
  "status": :"OK", //status respons
  "data":{ "name":"Doe" , "password":"Joe12345" }, // data response
  "message":"Something message" // message response
}
```
### Headers config

```json

{
   "headers":{
      "authorization":"Berarer __token" // only useing bearer
   }
}

```

### Api config
```json
{
   "auth":{
      "jwt":true, // using jsonwebtoken
      "expired":"6m", //expired token
      "algorithm":"RS256" //algoritma token
   },
   "limiter":{
      "windowMs":"15m", //time remaining after use many request
      "max":40 //max many request
   }
}
```


### Admin
include all method **POST**,**GET**,**PUT**,**DELETE**
+ **users**
   * **all user**  `/api/v1/admin/users` 
   * **one user**  `/api/v1/admin/users/1` 

### Production
include all method **POST**,**GET**,**PUT**,**DELETE**
+ **movies**
   * **all user**  `/api/v1/product/movies` 
   * **one user**  `/api/v1/product/movies/1` 
+ **comic**
   * **all user**  `/api/v1/product/comic` 
   * **one user**  `/api/v1/product/comic/1`


   

