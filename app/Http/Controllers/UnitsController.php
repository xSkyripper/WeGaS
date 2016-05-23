<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Unit;

class UnitsController extends Controller
{
    public function index()
    {
        $units = Unit::all()
            ->sortBy('lvl')
            ->sortBy('gold')
            ->values();

        return view('pages.shop',compact('units'));
    }
}
