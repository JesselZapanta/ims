<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'category_id' => fake()->numberBetween(1,  20),
            'supplier_id' => fake()->numberBetween(1, int2: 20),
            'description' => fake()->sentence(),
            'unit' => fake()->randomElement(['kg', 'pcs', 'box', 'liters','pack']),
            'quantity' => fake()->numberBetween(1, 100),
            'purchase_price' => fake()->randomFloat(2, 10, 500),
            'selling_price' => fake()->randomFloat(2, 20, 1000),
            'expiry_date' => fake()->date(),
            'image' => null,
            'status' => fake()->numberBetween(1, int2: 3),
        ];
    }
}
