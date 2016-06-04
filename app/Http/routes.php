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
Route::post('/skills/{skill_id?}','SkillsController@store');
Route::delete('/skills/{skill_id?}','SkillsController@remove');

Route::get('/shop','UnitsController@index');
Route::post('/shop/{unit}','UnitsController@store');
Route::delete('/shop/{unit}','UnitsController@remove');