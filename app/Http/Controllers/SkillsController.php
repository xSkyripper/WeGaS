<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Skill;
use Response;


class SkillsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $skills = Skill::all()
            ->sortBy('lvl')
            ->sortBy('cost')
            ->values();

        return view('pages.skilltree', compact('skills'));
    }

    public function store($skill_id)
    {
        $skill = Skill::find($skill_id);
        $user = \Auth::user();

        if ($skill == null) {
            return Response::json(['error' => 'skillInexistent', 'msg' => 'Skill no longer exists !'], 413);
        }

        if ($user->sp <= 0) {
            return Response::json(['error' => 'noSp', 'msg' => 'Not enough skill points.'], 412);
        }

        $skill = $user->skills()->sync([$skill_id], false);

        $user->sp--;
        $user->save();

        return Response::json($skill);
    }

    public function remove($skill_id)
    {
        $skill = Skill::find($skill_id);
        $user = \Auth::user();

        if ($skill == null) {
            return Response::json(['error' => 'inexistentSkill', 'msg' => 'Skill no longer exists !'], 413);
        }

        $skill = $user->skills()->detach($skill_id);
        $user->sp++;
        $user->save();

        return Response::json($skill);
    }


}
