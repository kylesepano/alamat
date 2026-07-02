<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LibraryEntryRequest extends FormRequest
{
    public function rules(): array
    {
        $table = $this->route('table');
        $id = $this->route('id');

        return [
            'code' => ['required', 'string', 'max:64', Rule::unique($table, 'code')->ignore($id)],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique($table, 'slug')->ignore($id)],
            'description' => ['nullable', 'string'],
            'icon_hint' => ['nullable', 'string', 'max:255'],
            'color_hint' => ['nullable', 'string', 'max:16'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
