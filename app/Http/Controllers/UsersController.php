<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\UserSkill;
use App\UserUnit;

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
        return UserSkill::all();
        return 'Skills of' . $user->name;
    }

    public function units(User $user)
    {
        return UserUnit::all();
        return 'Units of' . $user->name;
    }
}
