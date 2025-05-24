<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Form</title>
</head>
<body>
    <h2>Client Form</h2>
    <form action="/clients" method="POST">
        <?php echo csrf_field(); ?>
        <input type="text" name="first_name" placeholder="First Name" required><br>
        <input type="text" name="last_name" placeholder="Last Name" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="text" name="phone" placeholder="Phone"><br>
        <input type="date" name="birth_date" required><br>
        <textarea name="address" placeholder="Address"></textarea><br>
        <input type="text" name="city" placeholder="City" required><br>
        <input type="text" name="country" placeholder="Country" required><br>
        <button type="submit">Submit</button>
    </form>
</body>
</html>
<?php /**PATH C:\Users\Home\Desktop\3 курс лаб\2 сем\веб метелап\2lab\ClientFormApp\resources\views/client_form.blade.php ENDPATH**/ ?>