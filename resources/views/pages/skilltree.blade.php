@extends('layouts/app')



@section('head')
    <meta name="_token" content="{{ csrf_token() }}">
    <style>
        .missing-skill {
            background-color: #e1f7d3;
        }

        #skillNo {
            font-weight: 600;
            color: #0000ee;
        }
    </style>
@stop

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default ">
                    <div class="panel-heading">
                        Skills (Skill points: <span id="skillNo">{{Auth::user()->sp}}</span>)
                    </div>

                    <div class="panel-body">
                        @if($skills->diff(Auth::user()->skills)->isEmpty())
                            <div class="alert alert-info">No new skills !</div>
                        @endif

                        <table class="table table-responsive table-hover ">
                            <tbody class="skill-list">
                            @foreach($skills->diff(Auth::user()->skills) as $missingSkill)
                                <tr id="skill{{$missingSkill->id}}" class="missing-skill">
                                    <td><img src="{{asset('img/'.$missingSkill->skill_id.'.png')}}" alt=""></td>
                                    <td>{{$missingSkill->name}}</td>
                                    <td>{{$missingSkill->description}}</td>
                                    <td>Lvl. {{$missingSkill->lvl}}</td>
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
                                    <td><img src="{{asset('img/'.$skill->skill_id.'.png')}}" alt=""></td>
                                    <td>{{ $skill->name }}</td>
                                    <td>{{ $skill->description }}</td>
                                    <td>Lvl. {{ $skill->lvl }}</td>
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