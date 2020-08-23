<?php

class Connection

{

	public static function make()

	{

		try{

			return new PDO('mysql:host=localhost;dbname=ad','root','', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

		} catch (PDOException $e) {

			die($e->getMessage());

		}
		
	}

}