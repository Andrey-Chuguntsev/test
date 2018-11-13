<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function store(User $user)
    {
        return true;
    }

    public function update(User $user)
    {
        return true;
    }

    public function remove(User $user)
    {
        return true;
    }
}
