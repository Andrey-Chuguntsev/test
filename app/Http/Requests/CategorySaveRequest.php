<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Gate;
use Illuminate\Validation\Rule;

class CategorySaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        switch (strtolower($this->method())) {
            case 'post':
                return Gate::allows('store', 'App\Category');
            case 'put':
                return Gate::allows('store', $this->route('cat'));

            default:
                return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required', 'string', 'max:255',
                Rule::unique('categories')->where(function($query) {
                    if ($this->isMethod('put')) {
                        $query->where('id', '<>', $this->route('cat')->id);
                    }
                })
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Название категории необходимо указать',
            'name.unique' => 'Такая категория уже существует'
        ];
    }
}
