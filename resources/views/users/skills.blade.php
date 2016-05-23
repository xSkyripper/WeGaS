@extends('layouts/app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">

                <div class="panel panel-default">
                    <div class="panel-heading">{{ Auth::user()->name }}'s skills</div>
                    <div class="panel-body">

                        @if($skills->isEmpty())
                            <div class="alert alert-info">{{ Auth::user()->name }} has no skills !</div>
                        @else
                            <p>{{ Auth::user()->name }} has {{$skills->count()}} skills.</p>

                            <table class="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Value</th>
                                    <th>Req. Lvl</th>
                                    <th>Cost</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($skills as $skill)
                                    <tr>
                                        <td>{{ $skill->id }}</td>
                                        <td>{{ $skill->name }}</td>
                                        <td>{{ $skill->description }}</td>
                                        <td>{{ $skill->type }}</td>
                                        <td>{{ $skill->value }}</td>
                                        <td>{{ $skill->lvl }}</td>
                                        <td>{{ $skill->cost }}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        @endif
                    </div>


                </div>

            </div>
        </div>
    </div>
@stop
