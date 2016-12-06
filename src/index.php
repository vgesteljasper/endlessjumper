<?php

// display errors
// development only
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

$routes = array(
  'game' => array(
    'controller' => 'Game',
    'action' => 'index'
  ),
  'home' => array(
    'controller' => 'Score',
    'action' => 'index'
  )
);

if(empty($_GET['page'])) {
  $_GET['page'] = 'game';
}

if(empty($routes[$_GET['page']])) {
  header('Location: index.php');
  exit();
}

$route = $routes[$_GET['page']];
$controllerName = $route['controller'] . 'Controller';

require_once WWW_ROOT . 'controller' . DS . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();
$controllerObj->render();
