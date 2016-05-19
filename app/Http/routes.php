<?php

/*
 * WeGaS Routes
 *
 */

Route::auth();

Route::get('/', 'HomeController@welcome');
Route::get('/home', 'HomeController@index');
Route::get('/users/{user}','UsersController@profile');
Route::get('/users/{user}/skills','UsersController@skills');
Route::get('/users/{user}/units','UsersController@units');
Route::get('/skills','SkillsController@index');
Route::get('/shop','UnitsController@index');