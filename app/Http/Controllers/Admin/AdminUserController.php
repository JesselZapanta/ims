<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index()
    {
        return inertia('Admin/User/Index');
    }

    public function getdata()
    {
        return User::all();
    }
}
