<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminSupplierStoreRequest;
use App\Http\Requests\Admin\AdminSupplierUpdateRequest;
use App\Models\Supplier;
use Illuminate\Http\Request;

class AdminSupplierController extends Controller
{
    public function index()
    {
        return inertia('Admin/Supplier/Index');
    }

    public function getdata(Request $request)
    { 
        return Supplier::where(function($query) use ($request) {
                        $query->where('name', 'like', "{$request->search}%")
                                ->orWhere('email', 'like', "{$request->search}%");
                    })
                    ->orderBy($request->sortField, $request->sortOrder)
                    ->paginate(10);
    }

    public function store(AdminSupplierStoreRequest $request)
    {
        $data = $request->validated();

        Supplier::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(AdminSupplierUpdateRequest $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        $data = $request->validated();

        $supplier->update($data);

        return response()->json([
            'status'=> 'updated'
        ], 200);
    }

    public function destroy($id){
        $supplier = Supplier::findOrFail($id);
        
        $supplier->delete();

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }   
}

