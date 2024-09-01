<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route for register and login
Route::post('register', [AuthController::class, 'register']);
/*
การ register
http://localhost:8000/api/register
Method: POST
PayLoad
{
    "fullname":"John Doe",
    "email":"john@email.com",
    "password":"12345678",
    "password_confirmation":"12345678",
} 
ผลลัพธ์ที่ควรได้กลับมา
---
{
  "status": true,
  "message": "User registered successfully",
  "user": {
    "fullname": "John Doe",
    "email": "john@email.com",
    "updated_at": "2024-05-24T11:28:09.000000Z",
    "created_at": "2024-05-24T11:28:09.000000Z",
    "id": 1
  }
}
*/

Route::post('login', [AuthController::class, 'login']);
/*
การ login
---
http://localhost:8000/api/login

{
    "email":"john@email.com",
    "password":"12345678"
}

ผลลัพธ์ที่ควรได้กลับมา
---
{
  "status": true,
  "message": "Login successfully",
  "user": {
    "id": 1,
    "fullname": "John Doe",
    "email": "john@email.com",
    "email_verified_at": null,
    "created_at": "2024-05-24T11:28:09.000000Z",
    "updated_at": "2024-05-24T11:28:09.000000Z"
  },
  "token": "2|PMZLAaTCBgvIBkxVK7y3ZcxLHpqk9rETmQmoWUVle5e2e9c7"
}
*/
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [AuthController::class, 'logout']);
});


// กำหนดตัวแปร $users
$users = [
    [
        'name' => 'User1',
        'email' => 'user1@email.com',
    ],
    [
        'name' => 'User2',
        'email' => 'user2@email.com',
    ]
];

// GET /api/user
Route::get('/user',  function (Request $request) use ($users) {
    return $users;
});


// POST /api/user
// Payload: { "name": "User3", "email": "user3@email.com"}
Route::post('/user', function (Request $request)  use ($users) {
    // Retrieve the name and email from the request body payload
    $name = $request->input('name');
    $email = $request->input('email');

    // Add the new user to the users array
    $users[] = [
        'name' => $name,
        'email' => $email,
    ];

    // Return the name and email
    return $users;
});

// PUT /api/user/1
// Payload: { "name": "Jack Doe", "email": "jack@email.com"}
Route::put('/user/{id}', function (Request $request, $id) use ($users) {
    // Retrieve the name and email from the request body payload
    $name = $request->input('name');
    $email = $request->input('email');

    // Update the user with the given id
    $users[$id] = [
        'name' => $name,
        'email' => $email,
    ];

    // Return the name and email
    return $users;
});


// DELETE /api/user/1
Route::delete('/user/{id}', function (Request $request, $id) use ($users) {
    // Remove the user with the given id
    unset($users[$id]);

    // Return the name and email
    return $users;
});
