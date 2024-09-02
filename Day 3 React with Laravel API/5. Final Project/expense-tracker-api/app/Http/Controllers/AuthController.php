<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    // Login User
    public function login(Request $request)
    {
        // Validate field
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ], [
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'password.required' => 'The password field is required.'
        ]);

        // Check for the user
        $user = User::where('email', $fields['email'])->first();

        // Validate user credentials
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return Response::json([
                'status' => false,
                'message' => 'Invalid email or password.'
            ], 401);
        } else {

            // Remove existing tokens and generate a new one
            $user->tokens()->delete();
            // Generate token
            $token = $user->createToken($request->userAgent(), ["$user->role"])->plainTextToken;

            // Return respone
            return Response::json([
                'status' => true,
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token
            ], 200);
        }
    }

    // Register User
    public function register(Request $request)
    {
        // Validate field
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email|max:255',
            'password' => 'required|min:6'
        ]);

        // Create user
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        // Return respone
        return Response::json([
            'status' => true,
            'message' => 'User registered successfully',
            'user' => $user
        ], 200);
    }

    // Refresh Token
    public function refreshToken(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        $token = $user->createToken($request->userAgent(), ["$user->role"])->plainTextToken;

        // Return respone
        return Response::json([
            'status' => true,
            'message' => 'Token refreshed',
            'user' => $user
        ], 200);
    }

    // Logout User
    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return Response::json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Delete old tokens
            auth()->user()->tokens()->delete();

            return Response::json([
                'status' => true,
                'message' => 'Logged out'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while logging out.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
