<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username', 64)->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->string('name');
            
            $table->integer('lvl')->default(1);
            $table->integer('gold')->default(100);
            $table->integer('xp')->default(30);
            $table->integer('sp')->default(1);
            $table->integer('victories')->default(0);
            $table->integer('defeats')->default(0);
            $table->integer('killed')->default(0);
            $table->enum('status',['online','offline','ingame'])->default('offline');

            $table->foreign('lvl')->references('lvl')->on('levels');

            $table->rememberToken();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
