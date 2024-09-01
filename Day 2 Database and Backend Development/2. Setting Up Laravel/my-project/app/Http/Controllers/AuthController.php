<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        // Validate input fields
        $fields = $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new user
        $user = User::create([
            'fullname' => $fields['fullname'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        // Respond with success
        $response = [
            'status' => true,
            'message' => 'User registered successfully',
            'user' => $user,
        ];
        return response()->json($response, 201);
    }

    // Login User
    public function login(Request $request)
    {

        // Validate input fields
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Find user by email
        $user = User::where('email', $validatedData['email'])->first();

        // Validate user existence and password
        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Revoke all existing tokens
        $user->tokens()->delete();

        // Create a new token
        $token = $user->createToken($request->userAgent())->plainTextToken;

        // Return successful response with user and token
        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    // Logout User
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return [
            'status' => true,
            'message' => 'Logged out'
        ];
    }
}
