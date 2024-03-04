<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\EditUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\ViewUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;
    public function login(LoginUserRequest $request)
    {

        $request->validated($request->all());
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Credentials do not match', 401);
        }
        $user = User::where('email', $request->email)->first();
        return $this->success([
            'user' => $user,
            'token' => $user->createToken('Api Token of' . $user->name)->plainTextToken

        ]);
    }
    public function register(StoreUserRequest $request)
    {
        $request->validated($request->all());
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return $this->success(
            [
                'user' => $user,
                'token' => $user->createToken('API Token of' . $user->name)->plainTextToken
            ]
        );
    }
    public function viewProfile(ViewUserRequest $request)
    {
        $user = $request->user();

        return $this->success(['user' => $user]);
    }
    public function editUser(EditUserRequest $request)
    {
        $user = $request->user();

        // Update the user's information
        $user->update($request->validated());

        return $this->success(['user' => $user], 'User information updated successfully');
    }
    
    public function logout()
    {
        return response()->json('Logout user');
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = $request->user();

        // Check if the provided current password matches the user's actual password
        if (!Hash::check($request->current_password, $user->password)) {
            return $this->error('Invalid credentials', 'The current password is incorrect', 401);
        }

        // Validate if the new password and the confirm password match
        if ($request->new_password !== $request->confirm_password) {
            return $this->error('Validation error', 'New password and confirm password do not match', 422);
        }

        // Update the user's password
        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return $this->success([], 'Password changed successfully');
    }
}
