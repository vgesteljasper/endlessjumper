<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'ScoreDAO.php';

class ScoreController extends Controller {

	protected $scoreDAO;

	function __construct() {
		$this->scoreDAO = new ScoreDAO();
	}

	public function index() {

	}

}
