<?php

require_once( WWW_ROOT . 'dao' . DS . 'DAO.php');
class PostDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `scores`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

}
