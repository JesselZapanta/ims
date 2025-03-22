<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

    public function store()
    {

    }

    public function update()
    {

    }

    public function destroy(){

    }
}
