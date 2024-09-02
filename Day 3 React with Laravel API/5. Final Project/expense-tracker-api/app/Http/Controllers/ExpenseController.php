<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class ExpenseController extends Controller
{

    public function index(): JsonResponse
    {
        try {
            $expenses = Expense::all();

            // If no expenses found, return a 204 No Content response
            if ($expenses->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'No expenses found.',
                ], 204);
            }

            // Return a 200 OK response with expenses data
            return response()->json([
                'status' => true,
                'message' => 'Fetched all expenses successfully.',
                'data' => $expenses,
            ], 200);
        } catch (\Exception $e) {
            // Return a 500 Internal Server Error response
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while fetching expenses.',
            ], 500);
        }
    }

    public function fetchByUserId(int $userId): JsonResponse
    {
        try {
            // Validate the user ID (if necessary, depending on your application context)
            if (!is_numeric($userId) || $userId <= 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid user ID provided.',
                ], 400);
            }

            // Fetch expenses for the given user ID
            $expenses = Expense::where('user_id', $userId)
                ->orderBy('date', 'desc') // Change 'asc' to 'desc' if you want descending order
                ->get();

            // If no expenses found, return a 204 No Content response
            if ($expenses->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'No expenses found for the given user ID.',
                ], 204);
            }

            // Return a 200 OK response with expenses data
            return response()->json([
                'status' => true,
                'message' => 'Fetched expenses successfully.',
                'data' => $expenses,
            ], 200);
        } catch (\Exception $e) {
            // Return a 500 Internal Server Error response
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while fetching expenses.',
            ], 500);
        }
    }

    public function chartDataByUser($userId)
    {
        // Validate the userId if necessary

        // Fetch all expenses for the specified user for the current year
        $expenses = Expense::where('user_id', $userId)
            ->whereYear('date', Carbon::now()->year) // Use Carbon to get the current year
            ->get(['date', 'amount']);

        // Aggregate total expenses per month
        $chartData = $expenses->groupBy(function ($expense) {
            return Carbon::parse($expense->date)->format('F'); // Group by month name (e.g., January, February)
        })->map(function ($monthExpenses) {
            return $monthExpenses->sum('amount'); // Sum amounts for each month
        });

        // Ensure the months are in the correct order
        $orderedChartData = collect([
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ])->mapWithKeys(function ($month) use ($chartData) {
            return [$month => $chartData->get($month, 0)]; // Default to 0 if no data for the month
        });

        return response()->json($orderedChartData);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            // Validate form
            $validated = $request->validate([
                'description' => 'required|string|max:255',
                'amount' => 'required|numeric',
                'date' => 'required|date',
                'user_id' => 'required',
                'category_id' => 'required',
            ]);

            // Create data to tabale product
            $expense = Expense::create($validated);

            // Return success response
            return response()->json([
                'status' => true,
                'message' => 'Expense created successfully',
                'expense' => $expense,
            ], 201); // 201 Created status

        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json([
                'status' => false,
                'message' => 'Failed to create expense',
                'error' => $e->getMessage(),
            ], 500); // 500 Internal Server Error status
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $expense = Expense::findOrFail($id);

            return response()->json([
                'status' => true,
                'message' => 'Fetched expense successfully',
                'expense' => $expense
            ], 200); // 200 OK is more appropriate for successful retrieval
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Expense not found'
            ], 404); // 404 Not Found for a non-existent resource
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        // Validate form input
        $validatedData = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric',
            'description' => 'required|string|max:255',
            'date' => 'required|date'
        ]);

        try {
            // Find the expense or fail
            $expense = Expense::findOrFail($id);

            // Update expense with validated data
            $expense->update($validatedData);

            return response()->json([
                'status' => true,
                'message' => 'Expense updated successfully',
                'expense' => $expense
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Expense not found'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while updating the expense'
            ], 500);
        }
    }

    public function destroy($id)
    {
        // Attempt to find the expense
        $expense = Expense::find($id);

        if ($expense) {
            // Delete the expense
            $expense->delete();

            return response()->json([
                'status' => true,
                'message' => 'Expense deleted successfully'
            ], 200); // HTTP 200 OK
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Expense not found'
            ], 404); // HTTP 404 Not Found
        }
    }
}
