@extends('layouts/app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">

                    <div class="panel-heading">Welcome!</div>

                    <div class="panel-body">
                        <div class="container-fluid">
                            <img class="welcome-banner img-responsive" src="{{asset('img/bannerAbout.png')}}" alt="banner">
                           <p>Browsere recomandate pentru joc:
                            <li>Firefox - ultima versiune</li>
                            <li>Opera 12 (unele facilitati de la nivelul jocului sunt dezactivate)</li>
                            <li>Opera - ultima versiune</li>
                            <li>Chrome - ultima versiune</li>
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
@stop