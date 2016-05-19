<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function profile(User $user)
    {
        return view('users.profile', compact('user'));
    }

    public function skills(User $user)
    {
        return 'Skills of' . $user->name;
    }

    public function units(User $user)
    {
        return 'Units of' . $user->name;
    }
}
