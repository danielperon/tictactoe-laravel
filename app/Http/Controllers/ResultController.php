<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    public function index(){
        $results = Result::all();
        return view('results.index', compact('results'));
    }

    public function store(Request $request){
        $result = Result::create($request->all());
        $last5 = Result::latest()->take(5)->get();
        return response()->json(['result' => $result, 'last5' => $last5]);
    }
}
