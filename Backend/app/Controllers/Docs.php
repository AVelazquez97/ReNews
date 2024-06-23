<?php

namespace App\Controllers;

class Docs extends BaseController
{
    public function index(): string
    {
        return view('docs');
    }
}
