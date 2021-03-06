<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Overrides the finding RouteKey to 'username'
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'username';
    }

    public function units()
    {
        return $this->belongsToMany('App\Unit');
    }

    public function skills()
    {
        return $this->belongsToMany('App\Skill');
    }
}
