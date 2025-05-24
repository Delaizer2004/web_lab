<?php
$name = "Ім'я Прізвище";
$position = "Веб-розробник";
$about = "Я креативний веб-розробник з досвідом створення сучасних сайтів.";
$skills = ["HTML/CSS", "PHP/MySQL", "JavaScript", "Bootstrap"];
$experience = [
    "company" => "Компанія XYZ",
    "role" => "Веб-розробник",
    "years" => "2021–2023",
    "details" => "Розробка корпоративних сайтів, оптимізація швидкодії, створення API."
];
$education = [
    "university" => "Національний університет",
    "specialty" => "Інженерія програмного забезпечення",
    "years" => "2018–2022"
];
$contact = "email@example.com | +380 123 456 789";
?>

<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Резюме - <?php echo $name; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="resume-container">
        <header>
            <img src="img/avatar.jpg" alt="Фото" class="avatar">
            <h1><?php echo $name; ?></h1>
            <p>Посада: <?php echo $position; ?></p>
        </header>

        <section class="about">
            <h2>Про мене</h2>
            <p><?php echo $about; ?></p>
        </section>

        <section class="skills">
            <h2>Навички</h2>
            <ul>
                <?php foreach($skills as $skill): ?>
                    <li><?php echo $skill; ?></li>
                <?php endforeach; ?>
            </ul>
        </section>

        <section class="experience">
            <h2>Досвід роботи</h2>
            <p><strong><?php echo $experience["company"]; ?></strong> — <?php echo $experience["role"]; ?> (<?php echo $experience["years"]; ?>)</p>
            <p><?php echo $experience["details"]; ?></p>
        </section>

        <section class="education">
            <h2>Освіта</h2>
            <p><strong><?php echo $education["university"]; ?></strong> — <?php echo $education["specialty"]; ?> (<?php echo $education["years"]; ?>)</p>
        </section>

        <footer>
            <p>Контакти: <?php echo $contact; ?></p>
        </footer>
    </div>
</body>
</html>
