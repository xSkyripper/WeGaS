<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->increments('id');
            $table->string('skill_id',32);
            $table->string('name', 32);
            $table->string('description', 512);
            $table->integer('gold');
            $table->integer('xp');
            $table->integer('hp');
            $table->integer('atk');
            $table->integer('ms');
            $table->integer('lvl');
            
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
        Schema::drop('skills');
    }
}
