<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $users = User::count();
        $suppliers = Supplier::count();
        $categories = Category::count();
        $products = Product::count(); 
        
        return inertia('Dashboard', [
            'users' => $users,
            'suppliers' => $suppliers,
            'categories' => $categories,
            'products' => $products,
        ]);
    }
}
