<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
        $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
        $table->text('description')->nullable();
        $table->decimal('purchase_price', 10, 2);
        $table->decimal('selling_price', 10, 2);
        $table->date('expiry_date')->nullable();
        $table->string('image')->nullable();
        $table->tinyInteger('status')->default(1); // 'In Stock = 1', 'Out of Stock = 2', 'Discontinued = 3'
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
