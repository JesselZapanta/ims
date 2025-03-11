<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUserStoreRequest;
use App\Http\Requests\Admin\AdminUserUpdateRequest;
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
                    ->where(function($query) use ($request) {
                        $query->where('name', 'like', "{$request->search}%")
                                ->orWhere('email', 'like', "{$request->search}%");
                    })
                    ->orderBy($request->sortField, $request->sortOrder)
                    ->paginate(10);
    }

    public function store(AdminUserStoreRequest $request){
        $data = $request->validated();

        User::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(AdminUserUpdateRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->validated();

        if(!empty($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }else{
            unset($data['password']);
        }

        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id){
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
