<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    //Table Name
    protected $table = 'categories';

    //Incrementing is false
    public $incrementing = true;


    protected $fillable = [
        'category_name',
        'description'
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}
