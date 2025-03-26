<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminProductStoreRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    public function index()
    {
        return inertia('Admin/Product/Index');
    }

    public function getdata(Request $request)
    {
        $products =  Product::where('name', 'like' , "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);

        $categories = Category::all();
        $suppliers = Supplier::all();

        return response()->json([
            'products' => $products,
            'categories' => $categories,
            'suppliers' => $suppliers,
        ], 200);
    }


    public function store(AdminProductStoreRequest $request)
    {
        $data = $request->validated();

        return $data;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
            return 'uploaded';
        }

        // return $data;

        // Product::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }
}
