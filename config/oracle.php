<?php

return [
    'oracle' => [
        'driver'        => 'oracle',
        'tns'           => env('DB_TNS', ''),
        'host'          => env('DB_HOST', 'localhost'),
        'port'          => env('DB_PORT', '1521'),
        'database'      => env('DB_DATABASE', 'XE'),
        'username'      => env('DB_USERNAME', 'student'),
        'password'      => env('DB_PASSWORD', 'student'),
        'charset'       => env('DB_CHARSET', 'AL32UTF8'),
        'prefix'        => env('DB_PREFIX', ''),
        'prefix_schema' => env('DB_SCHEMA_PREFIX', ''),
    ],
];
