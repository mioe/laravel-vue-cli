<?php

Route::get('/adm/{catch?}', function () {
    return view('adm');
})->where('catch', '.*');

Route::get('/{catch?}', function () {
    return view('app');
})->where('catch', '^(?!api).*$');
