@extends('layouts/app')

<style>
    .missing-skill {
        background-color: #e1f7d3;
    }
</style>

@section('head')
    <meta name="_token" content="{{ csrf_token() }}">
@stop

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="card">
                    <img class="card-img-top" src="/" alt="Card image cap">
                    <div class="card-block">
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Button</a>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Skills (Skill points: <span id="skillNo">{{Auth::user()->sp}}</span>)
                    </div>

                    <div class="panel-body">
                        @if($skills->diff(Auth::user()->skills)->isEmpty())
                            <div class="alert alert-info">No new skills !</div>
                        @endif

                        {{--<ul class="list-group skill-list">--}}
                        {{--@foreach($skills->diff(Auth::user()->skills) as $missingSkill)--}}
                        {{--<li id="skill{{$missingSkill->id}}" class="list-group-item list-group-item-success">--}}
                        {{--<div class="container-fluid">--}}
                        {{--{{$missingSkill->name}}--}}
                        {{--{{$missingSkill->description}}--}}
                        {{--<button class="btn btn-success btn-sm pull-right add-skill"--}}
                        {{--value="{{$missingSkill}}">--}}
                        {{--Add Skill--}}
                        {{--</button>--}}
                        {{--</div>--}}
                        {{--</li>--}}
                        {{--@endforeach--}}

                        {{--@foreach(Auth::user()->skills as $skill)--}}
                        {{--<li id="skill{{$skill->id}}" class="list-group-item">--}}
                        {{--<div class="container-fluid">--}}
                        {{--{{ $skill->name }}--}}
                        {{--{{ $skill->description }}--}}
                        {{--<button class="btn btn-danger btn-sm pull-right delete-skill"--}}
                        {{--value="{{$skill}}">Delete skill--}}
                        {{--</button>--}}
                        {{--</div>--}}
                        {{--</li>--}}

                        {{--@endforeach--}}
                        {{--</ul>--}}

                        <table class="table table-responsive table-hover">
                            <tbody class="skill-list">
                            @foreach($skills->diff(Auth::user()->skills) as $missingSkill)
                                <tr id="skill{{$missingSkill->id}}" class="missing-skill">
                                    <td>{{$missingSkill->name}}</td>
                                    <td>{{$missingSkill->description}}</td>
                                    <td>
                                        <button class="btn btn-success btn-sm pull-right add-skill"
                                                value="{{$missingSkill}}">
                                            Add Skill
                                        </button>
                                    </td>
                                </tr>
                            @endforeach

                            @foreach(Auth::user()->skills as $skill)
                                <tr id="skill{{$skill->id}}">
                                    <td>{{ $skill->name }}</td>
                                    <td>{{ $skill->description }}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm pull-right delete-skill"
                                                value="{{$skill}}">Delete skill
                                        </button>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>

                    </div>


                </div>

            </div>
        </div>
    </div>
@stop


@section('scripts')
    <script src="{{asset('js/skills-ajax-crud.js')}}"></script>
@stop