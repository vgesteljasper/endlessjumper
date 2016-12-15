<?php

require_once( WWW_ROOT . 'dao' . DS . 'DAO.php');
class StatDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT `created`, `duration` FROM `PHA_stats`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getTopTen() {
    $sql = "SELECT `username`, max(`score`) as `highscore` FROM `PHA_stats` GROUP BY `username` order by `highscore` desc LIMIT 10";
    $stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT `created`, `duration` FROM `PHA_stats` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $sql = "INSERT INTO `PHA_stats` (`id`, `created`, `duration`, `score`, `username`) VALUES (NULL, :created, :duration, :score, :username)";
		$stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':created', $data['created']);
    $stmt->bindValue(':duration', $data['duration']);
    $stmt->bindValue(':score', $data['score']);
    $stmt->bindValue(':username', $data['username']);
    if ($stmt->execute()) {
      $insertedId = $this->pdo->lastInsertId();
      return $this->selectById($insertedId);
    }
  }

}
