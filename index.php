<?php
// Chargez vos données JSON
$data = file_get_contents('assets/article.json');
$blocs = json_decode($data, true);

// Initialisez le tableau de résultats
$results = [];

// Vérifiez si un terme de recherche a été envoyé
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['search'])) {
        $searchTerm = strtolower($_GET['searchTerm']);
    
        // Parcourez les blocs et recherchez ceux qui correspondent au terme de recherche
        foreach ($blocs as $bloc) {
            if (stripos(strtolower($bloc['famille']), $searchTerm) !== false || 
                stripos(strtolower($bloc['libelle']), $searchTerm) !== false) {
                $results[] = $bloc;
            }
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/index.css">
    <title>Test Rendu</title>
</head>
<body>
<br>
    <br>
    <div class="container">
        <div class="row">
        
        <form action="index.php" method="post">
            <div class="input-group mb-3">
                <input type="text" name="search" class="form-control" placeholder="Entrer votre Recherche..." aria-describedby="basic-addon2">
            </div>
        </form>
            <div class="input-group-append">
                
            
        </div>
        
        </div>
        
    </div>
    <div class="container">
    
    <div class="row">
        <div class="col-6">
        <button id="searchInput" class="btn btn-sm btn-primary">Rechercher</button>
        </div>
        </div>
    </div>
    <br>
    <br>

     <div class="container" id="liste-blocs">
        <!-- Les blocs seront ajoutés ici dynamiquement par le fichier index.js -->
    </div>
    <script src="assets/js/index.js"></script>
</body>
</html>