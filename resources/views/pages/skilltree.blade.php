@extends('layouts/app')

<meta name="_token" content="{!! csrf_token() !!}"/>

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">

                <div class="panel panel-default">
                    <div class="panel-heading">Skills</div>
                    <div class="panel-body">
                        @if($skills->diff(Auth::user()->skills)->isEmpty())
                            <div class="alert alert-info"></div>
                        @endif

                        <ul class="list-group skill-list">
                            @foreach($skills->diff(Auth::user()->skills) as $missingSkill)
                                <li id="skill{{$missingSkill->id}}" class="list-group-item list-group-item-success">
                                    <div class="container-fluid">{{$missingSkill->name}}
                                        <button class="btn btn-success btn-sm pull-right add-skill"
                                                value="{{$missingSkill}}">
                                            Add Skill
                                        </button>
                                    </div>
                                </li>
                            @endforeach

                            @foreach(Auth::user()->skills as $skill)
                                <li id="skill{{$skill->id}}" class="list-group-item">
                                    <div class="container-fluid">
                                        {{ $skill->name }}
                                        <button class="btn btn-danger btn-sm pull-right delete-skill"
                                                value="{{$skill}}">Delete skill
                                        </button>
                                    </div>
                                </li>

                            @endforeach
                        </ul>
                    </div>


                </div>

            </div>
        </div>
    </div>
@stop


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="{{asset('js/skills-ajax-crud.js')}}"></script>