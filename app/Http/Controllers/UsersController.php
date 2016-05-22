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

    public function units(User $user)
    {
        $units =  $user->units;

        return view('users.units',compact('units'));
    }

    public function skills(User $user)
    {
        $skills =  $user->skills;
        return view('users.skills',compact('skills'));
    }


}
