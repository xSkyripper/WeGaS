@extends('layouts/app')

@section('head')

    <style>
        .unit{
            margin:10px;
        }
    </style>

@stop

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">

                <div class="panel panel-default">
                    <div class="panel-heading">Units Shop (Gold: {{Auth::user()->gold}} )</div>
                    <div class="panel-body">
                        @if(Session::has('status'))
                            <div class="alert alert-warning">{{ Session::get('status') }}</div>
                        @endif

                        @foreach($units as $unit)
                            <div class="col-md-3 thumbnail unit">
                                <img src="{{asset('img/'.$unit->unit_id.'.png')}}" alt="">
                                <div class="caption">
                                    <h4 class="pull-right">{{$unit->gold}} G</h4>
                                    <h4>{{$unit->name}}</h4>
                                    <p>{{$unit->description}}</p>
                                    <h4>Stats: </h4>
                                    <ul>
                                        <li>HP: {{$unit->hp}}</li>
                                        <li>Attack: {{$unit->min_atk}} - {{$unit->max_atk}}</li>
                                        <li>Movement Speed: {{$unit->ms}}</li>
                                    </ul>
                                    <form method="POST" action="{{url('/shop/'.$unit->id)}}">
                                        {{ csrf_field() }}
                                        <button type ="submit" class="btn btn-default btn-success">Buy Unit</button>
                                    </form>

                                </div>
                            </div>
                        @endforeach


                    </div>
                </div>

            </div>
        </div>
    </div>
@stop

