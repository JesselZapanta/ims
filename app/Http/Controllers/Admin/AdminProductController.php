<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminProductStoreRequest;
use App\Http\Requests\Admin\AdminProductUpdateRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminProductController extends Controller
{
    public function index()
    {
        return inertia('Admin/Product/Index');
    }

    public function getdata(Request $request)
    {
        $products =  Product::where('name', 'like' , "{$request->search}%")
                        ->with('category')
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

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(AdminProductUpdateRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            //delete old image
            if($product->image){
                Storage::disk('public')->delete($product->image);
            }
            //store new image
            $data['image'] = $request->file('image')->store('products', 'public');
        }else{
            //keep existing image
            $data['image'] = $product->image;
        }

        $product->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }

    public function destroy($id)
    {   
        $product = Product::findOrFail($id);

        $product->delete();

        if($product->image){
            Storage::disk('public')->delete($product->image);
        }

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
