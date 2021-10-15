<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class WebController extends BaseController
{
    public function collection()
    {
        return view('collection');
    }

    public function home()
    {
        return view('home');
    }

    public function preAuth()
    {
        return view('pre-auth');
    }

    public function refund()
    {
        return view('refund');
    }

    public function sale()
    {
        return view('sale');
    }

    public function subscription()
    {
        return view('subscription');
    }

    public function void()
    {
        return view('void');
    }

    public function wallet()
    {
        return view('wallet');
    }
}
