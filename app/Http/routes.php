<?php

/*
 * WeGaS Routes
 *
 */

Route::auth();

Route::get('/','HomeController@welcome');
Route::get('/home', 'HomeController@index');
