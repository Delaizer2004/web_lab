<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Редагувати клієнта</title>
</head>
<body>
    <h2>Редагувати клієнта</h2>
    <form action="<?php echo e(route('clients.update', $client)); ?>" method="POST">
        <?php echo csrf_field(); ?>
        <?php echo method_field('PUT'); ?>
        <input type="text" name="first_name" value="<?php echo e($client->first_name); ?>" required><br>
        <input type="text" name="last_name" value="<?php echo e($client->last_name); ?>" required><br>
        <input type="email" name="email" value="<?php echo e($client->email); ?>" required><br>
        <input type="text" name="phone" value="<?php echo e($client->phone); ?>"><br>
        <input type="date" name="birth_date" value="<?php echo e($client->birth_date); ?>" required><br>
        <textarea name="address"><?php echo e($client->address); ?></textarea><br>
        <input type="text" name="city" value="<?php echo e($client->city); ?>" required><br>
        <input type="text" name="country" value="<?php echo e($client->country); ?>" required><br>
        <button type="submit">Оновити</button>
    </form>
</body>
</html>
<?php /**PATH C:\Users\Home\Desktop\3 курс лаб\2 сем\веб метелап\2lab\ClientFormApp\resources\views/clients/edit.blade.php ENDPATH**/ ?>