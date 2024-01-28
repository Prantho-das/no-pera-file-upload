<?php

namespace Pranthokumar\NoPeraFileUpload\App\Controllers;

use App\Http\Controllers\Controller;


class NoPeraController extends Controller
{
    public function index()
    {
        return 'prantho';
        return view('no-pera-file-upload::index');
    }
}
