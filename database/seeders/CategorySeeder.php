<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics', 'description' => 'Devices and gadgets such as phones, laptops, and accessories.'],
            ['name' => 'Furniture', 'description' => 'Chairs, tables, cabinets, and other home or office furniture.'],
            ['name' => 'Clothing', 'description' => 'Apparel including shirts, pants, dresses, and outerwear.'],
            ['name' => 'Footwear', 'description' => 'Shoes, sandals, boots, and other types of footwear.'],
            ['name' => 'Groceries', 'description' => 'Food items, beverages, and household essentials.'],
            ['name' => 'Stationery', 'description' => 'Office and school supplies such as pens, paper, and notebooks.'],
            ['name' => 'Beauty & Personal Care', 'description' => 'Cosmetics, skincare, and hygiene products.'],
            ['name' => 'Automotive', 'description' => 'Car accessories, parts, and maintenance tools.'],
            ['name' => 'Home Appliances', 'description' => 'Kitchen and household electrical appliances.'],
            ['name' => 'Sports & Outdoors', 'description' => 'Equipment and gear for various sports and outdoor activities.'],
            ['name' => 'Toys & Games', 'description' => 'Kids’ toys, board games, and puzzles.'],
            ['name' => 'Books & Magazines', 'description' => 'Printed and digital books, magazines, and educational materials.'],
            ['name' => 'Pet Supplies', 'description' => 'Food, toys, and accessories for pets.'],
            ['name' => 'Health & Wellness', 'description' => 'Supplements, medical supplies, and fitness equipment.'],
            ['name' => 'Jewelry & Accessories', 'description' => 'Watches, rings, necklaces, and fashion accessories.'],
            ['name' => 'Tools & Hardware', 'description' => 'Hand tools, power tools, and construction materials.'],
            ['name' => 'Musical Instruments', 'description' => 'Guitars, pianos, drums, and other musical instruments.'],
            ['name' => 'Gaming', 'description' => 'Consoles, video games, and gaming accessories.'],
            ['name' => 'Baby Products', 'description' => 'Items for infants and toddlers including clothes, toys, and diapers.'],
            ['name' => 'Industrial & Scientific', 'description' => 'Lab equipment, industrial tools, and scientific instruments.']
        ];

        Category::insertOrIgnore($categories);
    }
}
