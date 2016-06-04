<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('units', function (Blueprint $table) {
            $table->increments('id');
            $table->string('unit_id',32);
            $table->string('name', 32);
            $table->string('description', 512);
            $table->integer('type');
            $table->integer('min_atk');
            $table->integer('max_atk');
            $table->integer('hp');
            $table->integer('ms');
            $table->integer('lvl');
            $table->integer('gold');
            $table->integer('coins');
            
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
        Schema::drop('units');
    }
}
