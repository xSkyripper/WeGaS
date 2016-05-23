@extends('layouts/app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">

                <div class="panel panel-default">
                    <div class="panel-heading">{{ Auth::user()->name }}'s units</div>
                    <div class="panel-body">

                        @if($units->isEmpty())
                            <div class="alert alert-info">{{ Auth::user()->name }} has no units !</div>
                        @else
                            <p>{{ Auth::user()->name }} has {{$units->count()}} units.</p>

                            <table class="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Attack</th>
                                    <th>HP</th>
                                    <th>Movement Speed</th>
                                    <th>Req. Lvl</th>
                                    <th>Gold</th>
                                    <th>In-game price</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($units as $unit)
                                    <tr>
                                        <td>{{ $unit->id }}</td>
                                        <td>{{ $unit->name }}</td>
                                        <td>{{ $unit->description }}</td>
                                        <td>{{ $unit->atk }}</td>
                                        <td>{{ $unit->hp }}</td>
                                        <td>{{ $unit->ms }}</td>
                                        <td>{{ $unit->lvl }}</td>
                                        <td>{{ $unit->gold }}</td>
                                        <td>{{ $unit->coins }}</td>
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
