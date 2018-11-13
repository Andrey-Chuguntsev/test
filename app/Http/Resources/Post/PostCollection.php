<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Post\PostResource;

class PostCollection extends ResourceCollection
{
    public $collects = PostResource::class;

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
