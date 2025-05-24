<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Список клієнтів</title>
</head>
<body>
    <h2>Список клієнтів</h2>
    <a href="{{ route('clients.create') }}">Додати нового клієнта</a>
    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif
    <table border="1">
        <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Місто</th>
            <th>Дія</th>
        </tr>
        @foreach($clients as $client)
        <tr>
            <td>{{ $client->first_name }}</td>
            <td>{{ $client->last_name }}</td>
            <td>{{ $client->email }}</td>
            <td>{{ $client->phone }}</td>
            <td>{{ $client->city }}</td>
            <td>
                <a href="{{ route('clients.edit', $client) }}">Редагувати</a>
                <form action="{{ route('clients.destroy', $client) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Видалити</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
</body>
</html>
