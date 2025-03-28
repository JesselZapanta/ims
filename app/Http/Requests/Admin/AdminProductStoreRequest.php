<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AdminProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'description' => ['required', 'string'],
            'unit' => ['required', 'string'],
            'quantity' => ['required', 'integer'],
            'purchase_price' => ['required', 'integer'],
            'selling_price' => ['required', 'integer'],
            'expiry_date' => ['required', 'date'],
            'status' => ['required', 'integer', 'in:1,2,3'],
            'image' => ['nullable', 'mimes:png,jpg,jpeg'],
        ];
    }
}
