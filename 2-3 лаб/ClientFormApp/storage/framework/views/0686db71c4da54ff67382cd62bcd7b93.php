<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Список клієнтів</title>
</head>
<body>
    <h2>Список клієнтів</h2>
    <a href="<?php echo e(route('clients.create')); ?>">Додати нового клієнта</a>
    <?php if(session('success')): ?>
        <p style="color: green;"><?php echo e(session('success')); ?></p>
    <?php endif; ?>
    <table border="1">
        <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Місто</th>
            <th>Дія</th>
        </tr>
        <?php $__currentLoopData = $clients; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $client): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <tr>
            <td><?php echo e($client->first_name); ?></td>
            <td><?php echo e($client->last_name); ?></td>
            <td><?php echo e($client->email); ?></td>
            <td><?php echo e($client->phone); ?></td>
            <td><?php echo e($client->city); ?></td>
            <td>
                <a href="<?php echo e(route('clients.edit', $client)); ?>">Редагувати</a>
                <form action="<?php echo e(route('clients.destroy', $client)); ?>" method="POST" style="display:inline;">
                    <?php echo csrf_field(); ?>
                    <?php echo method_field('DELETE'); ?>
                    <button type="submit">Видалити</button>
                </form>
            </td>
        </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </table>
</body>
</html>
<?php /**PATH C:\Users\Home\Desktop\3 курс лаб\2 сем\веб метелап\2lab\ClientFormApp\resources\views/clients/index.blade.php ENDPATH**/ ?>