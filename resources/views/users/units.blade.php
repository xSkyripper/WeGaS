@extends('layouts/app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">{{ Auth::user()->name }}'s units</div>

                    <div class="panel-body">
                        @if($units == null)
                            <div class="alert alert-info">{{ Auth::user()->name }} has no units.</div>
                        @else
                            <ul class="list-group">

                                @foreach($units as $unit)
                                    <li class="list-group-item">{{ $unit->name }}</li>
                                @endforeach

                            </ul>
                        @endif
                    </div>

                </div>
            </div>
        </div>
    </div>
@stop
