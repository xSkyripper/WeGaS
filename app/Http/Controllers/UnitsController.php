<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Unit;


class UnitsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $units = Unit::all()
            ->sortBy('lvl')
            ->sortBy('gold')
            ->values();

        return view('pages.shop', compact('units'));
    }

    public function store(Unit $unit)
    {
        $user = \Auth::user();

        if (!$unit) {
            \Session::flash('status', 'The unit does not exist anymore !');
        }
        if ($user->units->contains($unit->id)) {
            \Session::flash('status', 'User already has this unit !');
        } else if ($user->gold < $unit->gold) {
            \Session::flash('status', 'Not enough gold to buy this unit !');
        } else {
            \Session::flash('status', 'You have successfully bought ' . $unit->name . ' for ' . $unit->gold . ' gold.');
            $user->units()->save($unit);
            $user->gold -= $unit->gold;
            $user->save();
        }

        return back();
    }
}
