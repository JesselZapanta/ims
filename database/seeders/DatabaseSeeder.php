<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //factory
        // User::factory(100)->create();
        // Supplier::factory(50)->create();
        // Category::factory(20)->create();

        $this->call([
            UserSeeder::class,
            SupplierSeeder::class,
            CategorySeeder::class,
        ]);

        Product::factory(1000)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
