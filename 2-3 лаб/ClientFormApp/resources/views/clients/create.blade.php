<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Додати клієнта</title>
</head>
<body>
    <h2>Додати клієнта</h2>
    <form action="{{ route('clients.store') }}" method="POST">
        @csrf
        <input type="text" name="first_name" placeholder="Ім'я" required><br>
        <input type="text" name="last_name" placeholder="Прізвище" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="text" name="phone" placeholder="Телефон"><br>
        <input type="date" name="birth_date" required><br>
        <textarea name="address" placeholder="Адреса"></textarea><br>
        <input type="text" name="city" placeholder="Місто" required><br>
        <input type="text" name="country" placeholder="Країна" required><br>
        <button type="submit">Додати</button>
    </form>
</body>
</html>
