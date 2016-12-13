<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'ScoreDAO.php';

class ScoreController extends Controller {

	protected $scoreDAO;

	function __construct() {
		$this->scoreDAO = new ScoreDAO();
	}

	public function index() {
    $this->_processAddItemFormIfNeeded();
    $items = $this->scoreDAO->selectAll();
    if($this->isAjax) {
      header('Content-Type: application/json');
      echo json_encode($items);
      exit();
    }
    $this->set('items', $items);
  }

	public function getValidationErrors($data) {
    $errors = array();
    if ( empty($data['duration']) || empty($data['score']) || empty($data['username']) ) {
      $errors['stats'] = "Error pushing stats to server";
    }
    return $errors;
  }

  private function _processAddItemFormIfNeeded() {
    if(!empty($_POST['action']) && $_POST['action'] == 'add-stat') {
      $data = array_merge($_POST, array('created' => date('Y-m-d H:i:s')));
			$errors = $this->getValidationErrors($data);
			if (empty($errors)) {
	      if($result = $this->scoreDAO->insert($data)) {
	        if($this->isAjax) {
	          header('Content-Type: application/json');
	          echo json_encode(array('result' => 'ok', 'inserted_id' => $result));
	          exit();
	        }
	        $this->redirect('index.php');
	      } else {
	        if($this->isAjax) {
	          header('Content-Type: application/json');
	          echo json_encode(array('result' => 'error', 'errors' => $errors));
	          exit();
	        }
	        $this->set('errors', $errors);
	      }
			}
    }
  }

}
