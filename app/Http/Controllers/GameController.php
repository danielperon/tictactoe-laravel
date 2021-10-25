<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function GameScreen(){
        $last5 = Result::latest()->take(5)->get();
        return view('game.index', compact('last5'));
    }
}
