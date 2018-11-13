<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Category\CategoryCollection;
use App\Http\Resources\Post\PostCollection;
use App\Category;
use App\Post;
use Auth;

class InitStoreController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function initData(Request $request)
    {
        $categories = new CategoryCollection(Category::all());
        $posts = new PostCollection(Post::with('category')->get());

        return response()->json(compact('categories', 'posts'));
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function initDataManager(Request $request)
    {
        $categories = new CategoryCollection(Category::all());
        $posts = new PostCollection(Post::where('user_id', Auth::id())->with('category')->get());

        return response()->json(compact('categories', 'posts'));
    }
}
