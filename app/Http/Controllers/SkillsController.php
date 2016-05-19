<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Skill;

class SkillsController extends Controller
{
    public function index(){
        $skills = Skill::all()
            ->sortBy('lvl')
            ->sortBy('cost')
            ->values();

        return $skills;
    }
}
