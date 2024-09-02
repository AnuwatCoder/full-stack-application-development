<?php

namespace Database\Seeders;

use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    static $category = [
        'Housing',
        'Transportation ',
        'Food',
        'Utilities',
        'Insurance',
        'Medical & Healthcare',
        'Entertainment',
        'Other'
    ];

    public function run(): void
    {
        foreach (self::$category as $category) {

            Category::create([
                'category_name' => $category,
                'description' => $category,
                'created_at' => Carbon::now()->toDateTimeString()
            ]);
        }
    }
}
