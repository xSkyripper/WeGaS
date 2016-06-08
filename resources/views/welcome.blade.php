@extends('layouts.app')

@section('head')
    <style>
        .welcome-banner{
            border-radius: 3px;
            border:1px solid black;
        }
    </style>
@stop

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">

                    <div class="panel-heading">Welcome, {{Auth::user()->name}} !</div>

                    <div class="panel-body">
                        <div class="container-fluid">
                            <img class="welcome-banner img-responsive" src="{{asset('img/banner.jpg')}}" alt="banner">
                            <p>Story & Lore</p>
                            In a time of war and struggle, people gather here to fight online. Humans fight agains humans and they strive to become the best.
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
