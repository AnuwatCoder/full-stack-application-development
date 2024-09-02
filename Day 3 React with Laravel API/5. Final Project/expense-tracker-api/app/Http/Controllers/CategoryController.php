<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'status' => true,
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate form
        $request->validate([
            'category_name' => 'required|min:3',
            'description' => 'required'
        ]);

        // กำหนดตัวแปรรับค่าจากฟอร์ม
        $data_category = array(
            'category_name' => $request->input('category_name'),
            'description' => $request->input('description')
        );

        // Create data to tabale product
        $category = Category::create($data_category);

        $response = [
            'status' => true,
            'message' => "Category created successfully",
            'product' => $category,
        ];

        return response($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);

        if ($category) {
            return response([
                'status' => true,
                'category' => $category
            ]);
        } else {
            return response([
                'status' => false,
                'message' => 'Category not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'category_name' => 'required|min:3',
            'description' => 'required'
        ]);

        $data_category = array(
            'category_name' => $request->input('category_name'),
            'description' => $request->input('description')
        );

        $category = Category::find($id);

        $category->update($data_category);

        return response([
            'status' => true,
            'message' => 'Category updated successfully',
            'product' => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = auth()->user();

        $category = Category::destroy($id);

        if ($category) {
            return response([
                'status' => true,
                'message' => 'Category deleted successfully'
            ]);
        } else {
            return response([
                'status' => false,
                'message' => 'Category not found'
            ], 404);
        }
    }
}