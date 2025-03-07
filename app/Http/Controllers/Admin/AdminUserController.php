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
    $users = User::where('id', '!=', Auth::id())
                ->orderBy($request->sortField, $request->sortOrder)
                ->paginate(10);

    return response()->json([
        'data' => $users->items(),
        'current_page' => $users->currentPage(),
        'last_page' => $users->lastPage(), // Ensure last_page is returned
        'total' => $users->total()
    ]);
}

}
