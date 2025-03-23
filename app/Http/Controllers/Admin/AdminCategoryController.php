<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminCategoryStoreRequest;
use App\Http\Requests\Admin\AdminCategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminCategoryController extends Controller
{
    public function index()
    {
        return inertia('Admin/Category/Index');
    }

    public function getdata(Request $request)
    {
        return Category::where('name', 'like' , "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    public function store(AdminCategoryStoreRequest $request)
    {
        $data = $request->validated();

        Category::create($data);

        return response()->json([
            'status' => 'created'
        ],200);
    }

    public function update(AdminCategoryUpdateRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $data = $request->validated();

        $category->update($data);

        return response()->json([
            'status' => 'updated'
        ],200);
    }   

    public function destroy($id){
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
