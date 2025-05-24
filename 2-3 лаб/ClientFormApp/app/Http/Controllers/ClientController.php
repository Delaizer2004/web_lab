<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ClientController extends Controller
{
    // Відображення всіх клієнтів
    public function index()
    {
        $clients = Client::all();
        return view('clients.index', compact('clients'));
    }

    // Форма для створення клієнта
    public function create()
    {
        return view('clients.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients',
            'phone' => 'nullable|string|max:15',
            'birth_date' => 'required|date',
            'address' => 'nullable|string',
            'city' => 'required|string',
            'country' => 'required|string',
        ]);

        $client = Client::create($request->all());

        // Логування дії в Redis
        Redis::lpush('client_logs', json_encode([
            'action' => 'created',
            'client' => $client->toArray(),
            'timestamp' => now(),
        ]));

        return redirect()->route('clients.index')->with('success', 'Клієнта додано');
    }

    public function edit(Client $client)
    {
        return view('clients.edit', compact('client'));
    }

    // Оновлення інформації про клієнта
    public function update(Request $request, Client $client)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => 'nullable|string|max:15',
            'birth_date' => 'required|date',
            'address' => 'nullable|string',
            'city' => 'required|string',
            'country' => 'required|string',
        ]);

        $client->update($request->all());

        // Логування в Redis
        Redis::lpush('client_logs', json_encode([
            'action' => 'updated',
            'client' => $client->toArray(),
            'timestamp' => now(),
        ]));

        return redirect()->route('clients.index')->with('success', 'Клієнта оновлено');
    }

    // Видалення клієнта
    public function destroy(Client $client)
    {
        $client->delete();

        // Логування в Redis
        Redis::lpush('client_logs', json_encode([
            'action' => 'deleted',
            'client_id' => $client->id,
            'timestamp' => now(),
        ]));

        return redirect()->route('clients.index')->with('success', 'Клієнта видалено');
    }
}
