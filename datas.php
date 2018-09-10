<?php

	$specialDB = new PDO('mysql:host=localhost;dbname=datas;charset=utf8', 'root', '');

	$specialDB->exec("set names utf8");
	
	$query = $specialDB->prepare('SELECT * FROM datas ORDER BY id ASC LIMIT :com_limit, 10');

	$limit = isset($_GET['limit']) ? $_GET['limit'] : 0;

	$query->bindValue(':com_limit', (int) $limit, PDO::PARAM_INT);
	$query->execute();

	$results = array();
	while ( $satir = $query->fetch(PDO::FETCH_OBJ) ){ array_push($results, $satir); }

	print_r(json_encode($results));

?>