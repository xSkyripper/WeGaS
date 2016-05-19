@extends('layouts\app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">{{$user->name}} [{{$user->lvl}}]</div>

                    <div class="panel-body">
                        <p>Email: {{$user->email}}</p>
                        <p>Victories: {{$user->victories}} </p>
                        <p>Defeats: {{$user->defeats}} </p>
                        <p>Killed: {{$user->killed}}</p>

                        <a class="btn btn-default" href="/users/{{$user->username}}/skills">Skills of   {{$user->name}}</a>
                        <a class="btn btn-default" href="/users/{{$user->username}}/units">Units of     {{$user->name}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop