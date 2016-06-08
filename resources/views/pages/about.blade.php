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
                            <p>Ce este WeGaS? </p>
                            <p><strong>Web Game System</strong> (sau pe scurt WeGaS) este o aplicatie Web ce ofera un serviciu online de entertainment
                                sub forma unui joc video de strategie in stilul clasic de RTS (Real-Time Strategy). Sistemul ofera
                                posibilitatea user-ului de a se inregistra, autentifica si de a se integra in comunitatea jocului.
                                Odata intrat, acesta poate discuta cu alti jucatori, ii poate provoca sau poate intra in lobby pentru
                                a-si alege o camera disponibila de joc urmand sa inceapa jocul. Pe langa sistemul propriu-zis de lupta,
                                fiecare jucator dispune de un nivel (Level), o moneda (Gold) dar si experienta acumulata de-a lungul
                                timpului (XP) ce se cuantifica in puncte de abilitati (Skill Points).</p>
                            <p>Fiind un proiect realizat in 4 persoane, WeGaS se doreste a fi o comunitate si o aplicatie Web pentru
                                entertainment-ul impatimitilor de jocuri video de strategie (RTS), in special pentru cei cu gust pentru
                                stilul clasic (Dune 2, Warcraft 2, Starcraft etc.)</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
@stop