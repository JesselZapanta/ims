<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Ims Admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin'),
            ],
            [
                'name' => 'jeszapanta9',
                'email' => 'jeszapanta9@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
        ];

        User::insertOrIgnore($users);
    }
}
