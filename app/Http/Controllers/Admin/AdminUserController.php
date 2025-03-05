<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    public function index()
    {
        return inertia('Admin/User/Index');
    }

    public function getdata(Request $request)
    { 
        return User::where('id', '!=', Auth::user()->id)
                    ->orderBy($request->sortField, $request->sortOrder)
                    ->paginate(10);
    }
}
