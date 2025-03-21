<?php

use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminSupplierController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin/user', [AdminUserController::class, 'index'])->name('admin.user');
Route::get('/admin/user/getdata', [AdminUserController::class, 'getdata']);
Route::post('/admin/user/store', [AdminUserController::class, 'store']);
Route::put('/admin/user/update/{id}', [AdminUserController::class, 'update']);
Route::delete('/admin/user/destroy/{id}',[AdminUserController::class, 'destroy']);

Route::get('/admin/supplier/index',[AdminSupplierController::class, 'index'])->name('admin.supplier');
Route::get('/admin/supplier/getdata',[AdminSupplierController::class, 'getdata']);
Route::post('/admin/supplier/store', [AdminSupplierController::class, 'store']);
Route::put('/admin/supplier/update/{id}', [AdminSupplierController::class, 'update']);
Route::delete('/admin/supplier/destroy/{id}',[AdminSupplierController::class, 'destroy']);

Route::get('/admin/category/index',[AdminCategoryController::class, 'index'])->name('admin.category');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
