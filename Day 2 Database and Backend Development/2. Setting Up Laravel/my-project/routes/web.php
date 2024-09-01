<?php

use Illuminate\Support\Facades\Route;

// // Basic Routing
// // GET /
// Route::get('/', function () {
//     return view('welcome');
// });

// // GET /about
// Route::get('/about', function () {
//     return "My About";
// });


// // Routing with Parameters
// // GET /user/{id}
// Route::get('user/{id}', function ($id) {
//     return 'User:' . $id;
// });

// // GET /posts/{post}/comments/{comment}
// Route::get('posts/{post}/comments/{comment}', function ($postID, $commentID) {
//     return 'Post:' . $postID . '<br>Comment:' . $commentID;
// });

// // GET /member/{name?}
// Route::get('member/{name?}', function ($name = null) {
//     return 'Hello ' . $name;
// });


// // Regular Expression Constraints
// // GET /category/{name}
// Route::get('category/{name}', function ($name) {
//     return $name;
// })->where('name', '[A-Za-z]+');

// // GET /group/{id}
// Route::get('group/{id}', function ($id) {
//     return $id;
// })->where('id', '[0-9]+');

// // GET /product/{id}/{name}
// Route::get('product/{id}/{name}', function ($id, $name) {
//     return 'Product ID:' . $id . '<br>Product name:' . $name;
// })->where(['id' => '[0-9]+', 'name' => '[a-z]+']);


// // Named Routes
// // GET /guest/showroom/data/{name?}
// Route::get('guest/showroom/data/{name?}', function ($name = null) {
//     return 'Hello' . $name;
// })->name('guestprofile');

// // Route Prefixes
// // GET /admin/users
// Route::group(['prefix' => 'admin'], function () {
//     Route::get('users', function () {
//         return 'admin/users';
//     });
// });

// // GET /accounts/{account_id}/detail
// // GET /accounts/{account_id}/profile
// Route::group(['prefix' => 'accounts/{account_id}'], function () {
//     Route::get('detail', function ($account_id) {
//         return 'accounts/' . $account_id . '/detail';
//     });
//     Route::get('profile', function ($account_id) {
//         return 'accounts/' . $account_id . '/profile';
//     });
// });
