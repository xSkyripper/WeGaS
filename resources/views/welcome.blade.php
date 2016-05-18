@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                @if(Session::has('status'))
                    <div class="alert alert-success">{{ Session::get('status') }} {{Auth::user()->name}} !</div>
                @endif
                <div class="panel panel-default">
                    <div class="panel-heading">WeGaS - Welcome</div>

                    <div class="panel-body">
                        Welcome to WeGaS !
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
