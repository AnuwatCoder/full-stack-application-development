<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register User
    public function register(Request $request){

        // Validate field
        $fields = $request->validate([
            'name' => 'required|string',
            'email'=> 'required|string|unique:users,email',
            'tel'=> 'required|string|unique:users,tel',
            'password'=>'required|string|confirmed|min:4'
        ]);

        // Create user
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'tel' => $fields['tel'],
            'password' => bcrypt($fields['password']), 

        ]);

        $response = [
            'status' => true,
            'message' => "User registered successfully",
            'user' => $user,
        ];

        return response($response, 201);
    }
}
