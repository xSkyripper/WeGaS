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
Route::get('/test/{skill_id?}',function($skill_id){
    $skill = \Auth::user()->skills()->detach($skill_id);

   return Response::json($skill);
});
Route::delete('/skills/{skill_id?}',function($skill_id){
    $skill = \Auth::user()->skills()->detach($skill_id);

    return Response::json($skill);
});

Route::post('/skills/{skill_id?}',function($skill_id){
    $skill = \Auth::user()->skills()->sync([$skill_id],false);

    return Response::json($skill);
});
Route::get('/shop','UnitsController@index');