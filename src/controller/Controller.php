<?php

class Controller {

  public $route;
  protected $viewVars = array();
  protected $isAjax = false;
  protected $env = 'development';

  public function filter() {
    //if we're running the project from a folder other than src, it means we're in production mode (dist)
    if(basename(dirname(dirname(__FILE__))) != 'src') {
      $this->env = 'production';
    }
    //if the request accept headers are set to json, we should send back json data instead of rendering html
    if(!empty($_SERVER['HTTP_ACCEPT']) && strtolower($_SERVER['HTTP_ACCEPT']) == 'application/json') {
      $this->isAjax = true;
    }
    //call the correct function in the controller
    call_user_func(array($this, $this->route['action']));
  }

  public function render($name) {
    $this->set('css', '');
    $this->set('js', '<script src="http://localhost:3000/js/' . $name . '.js"></script>');
    if($this->env == 'production') {
      $this->set('css', '<link rel="stylesheet" href="css/style.css">');
      $this->set('js', '<script src="js/' . $name . '.js"></script>');
    }
    $this->createViewVarWithContent();
    $this->renderInLayout();
    $this->cleanupSessionMessages();
  }

  public function set($variableName, $value) {
    $this->viewVars[$variableName] = $value;
  }

  public function redirect($url) {
    header("Location: {$url}");
    exit();
  }

  private function createViewVarWithContent() {
    extract($this->viewVars, EXTR_OVERWRITE);
    ob_start();
    require WWW_ROOT . 'view' . DS . strtolower($this->route['controller']) . DS . $this->route['action'] . '.php';
    $content = ob_get_clean();
    $this->set('content', $content);
  }

  private function renderInLayout() {
    extract($this->viewVars, EXTR_OVERWRITE);
    include WWW_ROOT . 'view' . DS . 'layout.php';
  }

  private function cleanupSessionMessages() {
    unset($_SESSION['info']);
    unset($_SESSION['error']);
  }

}
