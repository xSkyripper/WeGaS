@extends('layouts/app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">{{ Auth::user()->name }}'s skills</div>

                    <div class="panel-body">
                        @if($skills->isEmpty())
                            <div class="alert alert-info">{{ Auth::user()->name }} has no skills.</div>
                        @else
                            <ul class="list-group">
                                @foreach($skills as $skill)
                                    <li class="list-group-item">{{ $skill->name }}</li>
                                @endforeach
                            </ul>
                        @endif
                    </div>

                </div>
            </div>
        </div>
    </div>
@stop

