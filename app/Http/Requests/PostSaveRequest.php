<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Gate;

class PostSaveRequest extends FormRequest
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
                return Gate::allows('store', 'App\Post');
            case 'put':
                return Gate::allows('update', $this->route('post'));

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
            'category_id' => 'required|integer|exists:categories,id',
            'name'        => 'required|string|max:255',
            'text'        => 'required|string|min:20|max:10000'
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => 'Необходимо обязательно указать категорию',
            'name.required'        => 'Необходимо указать наименование статьи',
            'text.required'        => 'Статьи без содержимого быть не может',
            'text.min'             => 'Статья слишком короткая',
            'text.max'             => 'Статья слишком длинная',
        ];
    }
}
