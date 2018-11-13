<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $casts = [
        'created_at' => 'datetime:U'
    ];

    protected $fillable = [
        'category_id', 'name', 'text', 'user_id'
    ];

    public function creator()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
