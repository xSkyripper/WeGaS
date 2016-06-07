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
                            <p>Introduction text (story / lore). </p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aperiam blanditiis corporis
                            culpa dolor eum fuga hic, id libero numquam odit quibusdam repellat similique temporibus?
                            Laudantium minima reiciendis sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ab distinctio ducimus esse excepturi exercitationem fuga nulla numquam odio
                            perferendis quas, quasi qui quidem quod, repudiandae velit vitae voluptatibus. Excepturi,
                            perferendis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet libero
                            perferendis quae quam, quidem vitae voluptatum? Commodi, consectetur earum explicabo,
                            incidunt ipsam obcaecati officiis omnis perferendis rerum, sed sunt voluptatibus.
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
