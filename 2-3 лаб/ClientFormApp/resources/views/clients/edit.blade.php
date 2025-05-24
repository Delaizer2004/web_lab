<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Редагувати клієнта</title>
</head>
<body>
    <h2>Редагувати клієнта</h2>
    <form action="{{ route('clients.update', $client) }}" method="POST">
        @csrf
        @method('PUT')
        <input type="text" name="first_name" value="{{ $client->first_name }}" required><br>
        <input type="text" name="last_name" value="{{ $client->last_name }}" required><br>
        <input type="email" name="email" value="{{ $client->email }}" required><br>
        <input type="text" name="phone" value="{{ $client->phone }}"><br>
        <input type="date" name="birth_date" value="{{ $client->birth_date }}" required><br>
        <textarea name="address">{{ $client->address }}</textarea><br>
        <input type="text" name="city" value="{{ $client->city }}" required><br>
        <input type="text" name="country" value="{{ $client->country }}" required><br>
        <button type="submit">Оновити</button>
    </form>
</body>
</html>
