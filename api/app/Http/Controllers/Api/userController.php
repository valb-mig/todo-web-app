<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class userController extends Controller 
{

    public function login(Request $req)
    {

        $users = DB::table('todo_users_tb')
                ->where('id_user', '16')
                ->first();

        return $users;

        // return User::all();

        // return response()->json([
        //     'login' => false,
        // ]);
    }

    public function register(Request $req)
    {
        return response()->json([
            'register' => false,
        ]);
    }
}