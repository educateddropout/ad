<?php

class QueryBuilder

{

	protected $pdo;
	public $branch = 1; // 1-kamuning // 2-makati
	public $defaulPassword = "ampongdental";

	public function __construct($pdo)

	{

		$this->pdo = $pdo;

	}

	public function authenticateUser($username, $password){

		$archive = 0; // active
		$password = md5($password);

		$statement = $this->pdo->prepare("SELECT user_id as 'id', name, user_type, is_dentist
											FROM users
											WHERE username = '{$username}' and password = '{$password}' and archive = '{$archive}'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function checkCurrentPassword($password, $userId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, name, user_type, is_dentist
											FROM users
											WHERE password = ? and user_id = ?");

		$statement->execute([md5($password),$userId]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function changePassword($password, $userId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("UPDATE users
											SET password = ?
											WHERE user_id = ?");

		$statement->execute([md5($password),$userId]);

		return $statement->rowCount();
		//return $statement->errorInfo();

	}

	public function checkIfUsernameExist($username){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id
											FROM users
											WHERE username = ?");

		$statement->execute([$username]);

		return $statement->rowCount();
		//return $statement->errorInfo();

	}

	public function lockUser($data, $userId){

		$archive = 1; // lock account
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function unlockUser($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function resetUserPassword($data, $userId){

		
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET password = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([md5($this->defaulPassword),$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function approveUser($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function disApproveUser($data, $userId){

		$archive = 3; // declined/deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function promoteUser($data, $userId){

		$userType = 3; // superAdmin
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET user_type = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$userType,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function demoteUser($data, $userId){

		if($data['isDentist'] == 1){
			$userType = 2; // dentist
		} else {
			$userType = 1; // administrator
		}

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE users
											SET user_type = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$userType,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();

	}

	public function listOfTreatmentRecordToday($date, $userType, $userId){

		$archive = 0; // active
		
		if($userType != 2){
			

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE a.archive = ? AND a.treatment_date = ? 
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $date]);

		} else {

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE a.archive = ? AND a.treatment_date = ? AND a.dentist_id = ?
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $date, $userId]);

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfTreatmentRecordThisMonth($month, $year, $userType, $userId){

		$archive = 0; // active

		if($userType != 2){

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE a.archive = ? AND month(a.treatment_date) = ? AND year(a.treatment_date) = ?
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $month, $year]);

		} else {

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE 
													a.archive = ? AND month(a.treatment_date) = ? AND year(a.treatment_date) = ? AND a.dentist_id = ?
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $month, $year, $userId]);

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfTreatmentRecordThisYear($year, $userType, $userId){

		$archive = 0; // active

		if($userType != 2){

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE a.archive = ? AND year(a.treatment_date) = ?
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $year]);

		} else {

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE a.archive = ? AND year(a.treatment_date) = ? AND a.dentist_id = ?
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $year, $userId]);

		}


		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfTreatmentRecordFromTo($date_from, $date_to, $userType, $userId){

		$archive = 0; // active

		if($userType != 2){

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE a.archive = ? AND (a.treatment_date BETWEEN ? AND ?)
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $date_from, $date_to]);

		} else {

			$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, CONCAT(pi.last_name, ', ', pi.first_name, ' ',pi.middle_name) as 'patient_name', a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
												FROM treatment_record a
												LEFT JOIN patient_info pi
													ON a.patient_id = pi.patient_id
												LEFT JOIN users c
													ON c.user_id = a.dentist_id
												LEFT JOIN
													(SELECT SUM(payment) AS 'total_payment', SUM(ROUND((payment*(payment_percentage/100)),2)) AS 'total_payment_fee' , treatment_id
													FROM payments
													WHERE archive = ?
													GROUP BY treatment_id) b 
													ON b.treatment_id = a.id
												WHERE a.archive = ? AND (a.treatment_date BETWEEN ? AND ?) AND a.dentist_id = ?
												GROUP BY a.id
												ORDER BY a.treatment_date DESC, a.last_modified DESC");

			$statement->execute([$archive, $archive, $date_from, $date_to, $userId]);

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function totalPendingPatientCount(){

		$archive = 1; // pending in patient info

		$statement = $this->pdo->prepare("SELECT count(id) as 'total_pending'
											FROM patient_info
											WHERE archive = ?");

		$statement->execute([$archive]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function totalTreatmentsCount(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT count(id) as 'total_treatments'
											FROM treatment_record
											WHERE archive = ?");

		$statement->execute([$archive]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function deleteMiscExpenses($data, $userId){

		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // deleted

		$statement = $this->pdo->prepare("UPDATE misc_expenses 
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE id = ?");

		$statement->execute([$archive, $currentDate, $userId, $data['id']]);

		return $statement->rowCount();

	}

	public function updateMiscExpenses($data, $userId){

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE misc_expenses 
											SET date_charge = ?, description = ?, amount = ?, payment_type = ?, last_modified = ?, last_modified_by = ?
											WHERE id = ?");

		$statement->execute([$data['date'], $data['description'], $data['amount'], $data['paymentType'], $currentDate, $userId, $data['id']]);

		return $statement->rowCount();

	}

	public function addMiscExpenses($data, $userId){

		$archive = 0; // active

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT misc_expenses (date_charge, description, amount, archive, payment_type, last_modified, last_modified_by)
											VALUES (?,?,?,?,?,?,?)" );

		$statement->execute([$data['date'], $data['description'], $data['amount'], $archive, $data['paymentType'], $currentDate, $userId]);

		return $statement->rowCount();

	}

	public function listOfMiscRecord($dateTo, $dateFrom){

		$archive = 0; // active
		
		$statement = $this->pdo->prepare("SELECT id, amount, description, date_charge, payment_type
											FROM misc_expenses 
											WHERE date_charge >= ? AND date_charge <= ? AND archive = ?
											ORDER BY date_charge DESC, last_modified DESC");

		$statement->execute([$dateTo,$dateFrom,$archive]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfTreatments($patientId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT a.id, a.treatment_amount, a.patient_id, a.treatment_date, a.tooth, a.dentist_id, c.name as 'dentist_name', a.dentist_percentage, a.laboratory_fee, a.treatment, SUM(a.treatment_amount - b.total_payment) AS 'payment_diff', b.* 
											FROM treatment_record a
											LEFT JOIN users c
												ON c.user_id = a.dentist_id
											LEFT JOIN
												(SELECT SUM(payment) AS 'total_payment', treatment_id
												FROM payments
												WHERE archive = ? AND patient_id = ?
												GROUP BY treatment_id) b 
												ON b.treatment_id = a.id
											WHERE a.archive = ? AND a.patient_id = ?
											GROUP BY a.id
											ORDER BY a.treatment_date DESC, a.last_modified DESC");

		$statement->execute([$archive,$patientId,$archive,$patientId]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfPaymentRecordToday($date, $userType, $userId){

		$archive = 0; // active

		if($userType != 2){

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.patient_id, p.is_printed_receipt, p.id, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND p.payment_date = ?
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive,$date]);

		} else {

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.patient_id, p.is_printed_receipt, p.id, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND p.payment_date = ? AND b.dentist_id = ?
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive,$date, $userId]);

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);


	}

	public function listOfPaymentRecordThisMonth($month, $year, $userType, $userId){

		$archive = 0; // active

		if($userType != 2){

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, p.patient_id, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.id, p.is_printed_receipt, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND month(p.payment_date) = ? AND year(p.payment_date) = ?
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive, $month, $year]);

		} else {

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, p.patient_id, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.id, p.is_printed_receipt, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND month(p.payment_date) = ? AND year(p.payment_date) = ? AND b.dentist_id = ?
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive, $month, $year, $userId]);

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfPaymentRecordThisYear($year, $userType, $userId){

		$archive = 0; // active

		if($userType != 2){

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, p.patient_id, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.id, p.is_printed_receipt, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND year(p.payment_date) = ?
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive,$year]);

		} else {

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, p.patient_id, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.id, p.is_printed_receipt, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND year(p.payment_date) = ? AND b.dentist_id = ?
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive,$year, $userId]);

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfPaymentRecordFromTo($date_from, $date_to, $userType, $userId){

		$archive = 0; // active

		if($userType != 2){

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, p.patient_id, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.id, p.is_printed_receipt, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND (p.payment_date BETWEEN ? AND ?)
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive,$date_from, $date_to]);

		} else {

			$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, p.patient_id, CONCAT(pi.last_name, ', ', pi.first_name,' ',  pi.middle_name) as 'patient_name', p.id, p.is_printed_receipt, p.last_modified, lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date, b.dentist_percentage, p.payment_percentage
												FROM payments p
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id
													LEFT JOIN lib_payment_type lp
														ON p.payment_type = lp.id
													LEFT JOIN 
														(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date, tr.dentist_percentage
																FROM treatment_record tr
																	LEFT JOIN users u
																		ON tr.dentist_id = u.user_id) b 
																			ON p.treatment_id = b.id
												WHERE p.archive = ? AND (p.payment_date BETWEEN ? AND ?) AND b.dentist_id = ?
												ORDER BY
													p.payment_date DESC, p.last_modified DESC");

			$statement->execute([$archive,$date_from, $date_to, $userId]);

		}

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfPayments($patientId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT p.payment_date, p.payment, p.patient_id, p.id, p.last_modified, p.payment_percentage, p.is_printed_receipt, lp.id as 'payment_type_id', lp.name as 'payment_type', b.treatment, b.name as 'dentist_name', b.dentist_id, b.treatment_date
											FROM payments p
												LEFT JOIN lib_payment_type lp
													ON p.payment_type = lp.id
												LEFT JOIN 
													(SELECT tr.id, u.name, tr.treatment, tr.dentist_id, tr.treatment_date
															FROM treatment_record tr
																LEFT JOIN users u
																	ON tr.dentist_id = u.user_id) b 
																		ON p.treatment_id = b.id
											WHERE p.archive = ? AND p.patient_id = ?
											ORDER BY
												p.payment_date DESC, p.last_modified DESC");

		$statement->execute([$archive,$patientId]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function getPaymentRecordById($paymentId){

		$statement = $this->pdo->prepare("SELECT p.id, p.payment_date, p.payment_type, tr.treatment, p.payment, CONCAT(pi.last_name, ', ', pi.first_name, ' ', pi.middle_name) as 'patient_name'
												FROM payments p
													LEFT JOIN treatment_record tr
														ON p.treatment_id = tr.id
													LEFT JOIN patient_info pi
														ON p.patient_id = pi.patient_id

												WHERE p.id = ?");

		$statement->execute([$paymentId]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfTimeSchedules(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, name, nick
											FROM lib_time_schedule
											WHERE archive = '{$archive}' ");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function listOfPaymentTypes(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, name, percentage
											FROM lib_payment_type
											WHERE archive = '{$archive}' ");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function listOfDentist(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT user_id as 'id', name
											FROM users
											WHERE archive = '{$archive}' AND is_dentist = '1'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function listOfActiveDentist(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT user_id as 'id', name, nickname
											FROM users
											WHERE archive = '{$archive}' AND is_dentist = '1' AND is_active = 'Y'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function listOfUsers(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT user_id as 'id', name, username, user_type, is_dentist, is_active, archive
											FROM users

											ORDER BY user_type DESC, name");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getPatientDentalRecord($patientId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT uuid as 'id', 
													t18, t17, t16, t15, t14, t13, t12, t11,
													t48, t47, t46, t45, t44, t43, t42, t41,
													t38, t37, t36, t35, t34, t33, t32, t31,
													t28, t27, t26, t25, t24, t23, t22, t21,
													last_modified, date_added
												FROM patient_dental_info
												WHERE patient_id = ? AND archive = ?
												ORDER BY date_added DESC, last_modified DESC");

		$statement->execute([$patientId,$archive]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function listOfDentalRecord($patientId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, last_modified
											FROM patient_dental_info
											WHERE archive = '{$archive}' AND patient_id = '$patientId'
											ORDER BY last_modified DESC");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function listOfPatientsSchedule(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id as 'old_id', patient_id as 'id', CONCAT(last_name, ', ', first_name, ' ',middle_name) as 'patient_name', mobile_no
											FROM patient_info
											WHERE archive = '{$archive}'
											ORDER BY last_name, first_name, middle_name");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getPatientsDetails(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id as 'old_id', patient_id as 'id', first_name, last_name, middle_name , date_of_birth, address, mobile_no
											FROM patient_info
											WHERE archive = '{$archive}'
											ORDER BY last_name, first_name, middle_name");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getPatientsDetails2(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id as 'old_id', patient_id as 'id', first_name, last_name, middle_name , date_of_birth, address, mobile_no
											FROM patient_info
											ORDER BY last_name, first_name, middle_name");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getPatientsDetails3(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT * FROM patient_info WHERE id < 1722 and id > 1486 ORDER BY id DESC");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getPendingPatientsDetails(){

		$archive = 1; // pending

		$statement = $this->pdo->prepare("SELECT patient_id as 'id', first_name, last_name, middle_name , date_of_birth, address, mobile_no
											FROM patient_info
											WHERE archive = '{$archive}'
											ORDER BY last_name, first_name, middle_name");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getUserDetails($id){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, patient_id,first_name,middle_name,last_name, date_of_birth, sex, mobile_no, email_address, address, occupation, dental_insurance_name, dental_insurance_validity, referred_by, reason, dental_insurance, last_dental_visit, physician_name, physician_specialty, office_address, office_no, q1, q2, q2_ans, q3, q3_ans, q4, q4_ans, q5, q5_ans, q6, q7, 
			q8_1, q8_2, q8_3, q8_4, q8_5, q8_6, q8_6Other, 
			q9, q10_1, q10_2, q10_3, q11, q12, 
			q13_1, q13_2, q13_3, q13_4, q13_5, q13_6, q13_7, q13_8,
			q13_9, q13_10, q13_11, q13_12, q13_13, q13_14, q13_15, q13_16, q13_16Other,
			signature_loc
											FROM patient_info
											WHERE patient_id='{$id}' and archive = '{$archive}'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getPatientDentalImages($id){

		$archive = 0; // active
		
		$statement = $this->pdo->prepare("SELECT id, file_name, file_directory, added_by, date_taken
											FROM patient_dental_image
											WHERE patient_id = ? AND archive = ?");

		$statement->execute([$id, $archive]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getPatientDentalOtherInfo($id){

		$archive = 0; // active
		
		$statement = $this->pdo->prepare("SELECT id, file_name, file_directory, added_by, date_added, pdf_file_name
											FROM patient_dental_other_info
											WHERE patient_id ='{$id}' AND archive = '{$archive}'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function archivePatientDentalOtherInfo($fileId){

		$archive = 2; // deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_dental_other_info 
											SET archive = ?
											WHERE id = ?" );

		$statement->execute([$archive,$fileId]);

		return $statement->rowCount();

	}

	public function archivePatientDentalImage($fileId){

		$archive = 2; // deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_dental_image 
											SET archive = ?
											WHERE id = ?" );

		$statement->execute([$archive,$fileId]);

		return $statement->rowCount();

	}

	public function savePatientDentalImage($patientId, $fileName, $fileDir, $userId, $dateTaken){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT patient_dental_image (patient_id, file_name, file_directory, date_taken, added_by, date_added, archive)
											VALUES (?,?,?,?,?,?,?)" );

		$statement->execute([$patientId, $fileName, $fileDir, $dateTaken, $userId, $currentDate, $archive]);

		return $statement->rowCount();

	}

	public function savePatientPdfFile($patientId, $fileName, $fileDir, $userId, $pdfFileName){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT patient_dental_other_info (patient_id, file_name, file_directory, pdf_file_name, added_by, date_added, archive)
											VALUES (?,?,?,?,?,?,?)" );

		$statement->execute([$patientId, $fileName, $fileDir, $pdfFileName, $userId, $currentDate, $archive]);

		return $statement->rowCount();

	}

	public function getProfilePicture($id){

		$archive = 0; // active
		
		$statement = $this->pdo->prepare("SELECT file_name, file_directory, last_modified_by
											FROM patient_profile_picture
											WHERE patient_id ='{$id}'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	// will be use for creating id
	public function countPatient(){

		$statement = $this->pdo->prepare("SELECT max(id) as 'patient_count'
											FROM patient_info");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	// will be use for creating id
	public function countImage($patient_id){

		$statement = $this->pdo->prepare("SELECT max(id) as 'image_count'
											FROM patient_dental_image
											WHERE patient_id = '{$patient_id}'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	// will be use for creating id
	public function countPdfFiles($patient_id){

		$statement = $this->pdo->prepare("SELECT max(id) as 'image_count'
											FROM patient_dental_other_info
											WHERE patient_id = '{$patient_id}'");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function saveProfilePicture($patientId, $fileName, $fileDir, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT patient_profile_picture (patient_id, file_name, file_directory, last_modified, last_modified_by, archive)
											VALUES (?,?,?,?,?,?)" );

		$statement->execute([$patientId, $fileName, $fileDir, $currentDate, $userId, $archive]);

		return $statement->rowCount();

	}

	public function updateProfilePicture($patientId, $fileName, $fileDir, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_profile_picture 
											SET file_directory = ?, last_modified = ?, last_modified_by = ?
											WHERE patient_id = ?" );

		$statement->execute([$fileDir,$currentDate,$userId,$patientId]);

		return $statement->rowCount();

	}

	public function savePatientDetails($uuid,$data, $signatureLocation){

		$archive = 1; // pending for approval
		$currentDate = date("Y-m-d H:i:s");
		if($data['dental_insurance_validity'] == ""){
				$dentalInsuranceValidity = '0001-01-01';
		}
		else{
			$dentalInsuranceValidity = $data['dental_insurance_validity'];
		}

		$statement = $this->pdo->prepare("INSERT patient_info ( patient_id, first_name, last_name, middle_name, sex, date_of_birth, mobile_no, email_address, address, occupation, referred_by, reason, 														dental_insurance, dental_insurance_name,dental_insurance_validity, physician_name, physician_specialty, office_address,
														office_no, q1, q2, q2_ans, q3, q3_ans, q4, q4_ans, q5, q5_ans, q6, q7,
														q8_1, q8_2, q8_3, q8_4, q8_5, q8_6, q8_6Other,  
														q9, q10_1, q10_2, q10_3, q11, q12, 
														q13_1, q13_2, q13_3, q13_4, q13_5, q13_6, q13_7, q13_8, 
														q13_9, q13_10, q13_11, q13_12, q13_13, q13_14, q13_15, q13_16, q13_16Other,  
														signature_loc, date_registered, archive, branch)
											VALUES (?,?,?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,?,?)" );

		$statement->execute([ $uuid, $data['first_name'], $data['last_name'], $data['middle_name'], $data['sex'], $data['date_of_birth'], $data['mobile_no'],  $data['email_address'],
								$data['address'], $data['occupation'], $data['referral'], $data['reason_for_dental'], $data['dental_insurance'], $data['dental_insurance_name'], 
								$dentalInsuranceValidity,  $data['physician_name'], $data['physician_specialty'],  $data['physician_address'], $data['physician_number'],  $data['q1'],
								$data['q2'],  $data['q2_2'], $data['q3'],  $data['q3_2'], $data['q4'],  $data['q4_2'],
								$data['q5'],  $data['q5_2'], $data['q6'],  $data['q7'], 
								$data['q8_1'],  $data['q8_2'], $data['q8_3'],  $data['q8_4'], $data['q8_5'],  $data['q8_6'], $data['q8_6Other'],
								$data['q9'],  $data['q10_1'],
								$data['q10_2'],  $data['q10_3'], $data['q11'],  $data['q12'], 
								$data['q13_1'],  $data['q13_2'], $data['q13_3'],  $data['q13_4'], $data['q13_5'],  $data['q13_6'], $data['q13_7'], $data['q13_8'],
								$data['q13_9'],  $data['q13_10'], $data['q13_11'],  $data['q13_12'], $data['q13_13'],  $data['q13_14'], $data['q13_15'], $data['q13_16'], $data['q13_16Other'],
								$signatureLocation,  $currentDate, $archive, $this->branch]);

		return $statement->rowCount();


	}



	public function approvedPendingPatient($patientId, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		//print_r($data['id']);

		$statement = $this->pdo->prepare("UPDATE patient_info 
											SET archive = ?, approved_by = ?
											WHERE patient_id = ?" );

		$statement->execute([$archive,$userId,$patientId]);

		return $statement->rowCount();

	}

	public function disApprovedPendingPatient($patientId, $userId){

		$archive = 3; // disapproved
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_info 
											SET archive = ?, approved_by = ?
											WHERE patient_id = ?" );

		$statement->execute([$archive,$userId,$patientId]);

		return $statement->rowCount();

	}

	public function archivePersonalInformation($data, $userId){

		$archive = 2; // deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_info 
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE patient_id = ?" );

		$statement->execute([$archive,$currentDate,$userId,$data['patient_id']]);

		return $statement->rowCount();

	}

	public function updatePatientUuid($patientId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");
		$uuid = guidv4();

		$statement = $this->pdo->prepare("UPDATE patient_info 
											SET patient_id = ?
											WHERE id = ?" );

		$statement->execute([$uuid, $patientId]);

		return $statement->rowCount();

	}

	public function updatePatientDentalInfoPatientId($uuid, $patientId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_dental_info 
											SET patient_id = ?
											WHERE patient_id = ?" );

		$statement->execute([$uuid, $patientId]);

		return $statement->rowCount();

	}

	public function updatePatientDentalImagePatientId($uuid, $patientId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_dental_image 
											SET patient_id = ?
											WHERE patient_id = ?" );

		$statement->execute([$uuid, $patientId]);

		return $statement->rowCount();

	}

	public function updatePaymentPatientId($uuid, $patientId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE payments 
											SET patient_id = ?
											WHERE patient_id = ?" );

		$statement->execute([$uuid, $patientId]);

		return $statement->rowCount();

	}

	public function deletePaymentRecord($paymentId, $userId){

		$archive = 1; // deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE payments 
											SET archive = ?, last_modified_by = ?, last_modified = ?
											WHERE id = ?" );

		$statement->execute([$archive, $userId, $currentDate, $paymentId]);

		return $statement->rowCount();

	}

	public function deleteTreatmentRecord($treatmentId, $userId){

		$archive = 1; // deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE treatment_record 
											SET archive = ?, last_modified_by = ?, last_modified = ?
											WHERE id = ?" );

		$statement->execute([$archive, $userId, $currentDate, $treatmentId]);

		return $statement->rowCount();

	}

	public function deletePaymentRecordByTreatmentId($treatmentId, $userId){

		$archive = 1; // deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE payments 
											SET archive = ?, last_modified_by = ?, last_modified = ?
											WHERE treatment_id = ?" );

		$statement->execute([$archive, $userId, $currentDate, $treatmentId]);

		return $statement->rowCount();

	}

	public function updateTreatmentRecordPatientId($uuid, $patientId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE treatment_record 
											SET patient_id = ?
											WHERE patient_id = ?" );

		$statement->execute([$uuid, $patientId]);

		return $statement->rowCount();

	}

	public function updatePatientProfilePatientId($uuid, $patientId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_profile_picture 
											SET patient_id = ?
											WHERE patient_id = ?" );

		$statement->execute([$uuid, $patientId]);

		return $statement->rowCount();

	}

	public function updatePersonalInformation($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_info 
											SET first_name = ?, middle_name = ?, last_name = ?, sex = ?, date_of_birth = ?,
											mobile_no = ?, email_address = ?, address = ?, occupation = ?, dental_insurance = ?, referred_by = ?, reason = ?, last_modified = ?, last_modified_by = ?
											WHERE patient_id = ?" );

		$statement->execute([$data['first_name'],$data['middle_name'],$data['last_name'],$data['sex'],$data['birthdate'],$data['mobile_no'],$data['email_address'],$data['address'],$data['occupation'],$data['dental_insurance'],$data['referral'],$data['reason_for_dental'],$currentDate,$userId,$data['patient_id']]);

		return $statement->rowCount();

	}

	public function updateMedicalHistory($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_info 
											SET physician_name = ?, physician_specialty = ?, office_address = ?, office_no = ?,
											q1 = ?, q2 = ?, q2_ans = ?, q3 = ?, q3_ans = ?,
											q4 = ?, q4_ans = ?, q5 = ?, q5_ans = ?, q6 = ?, q7 = ?, q8_1 = ?,
											q8_2 = ?, q8_3 = ?, q8_4 = ?, q8_5 = ?, q8_6Other = ?, q9 = ?, q10_1 = ?,
											q10_2 = ?, q10_3 = ?, q11 = ?, q12 = ?, q13_1 = ?, q13_2 = ?, q13_3 = ?,
											q13_4 = ?, q13_5 = ?, q13_6 = ?, q13_7 = ?, q13_8 = ?, q13_9 = ?, q13_10 = ?,
											q13_11 = ?, q13_12 = ?, q13_14 = ?, q13_15 = ?, q13_16 = ?, q13_16Other = ?,
											last_modified = ?, last_modified_by = ?
											WHERE patient_id = ?" );

		$statement->execute([$data['physician_name'],$data['physician_specialty'],$data['physician_address'],$data['physician_number'],
							$data['q1'],$data['q2'],$data['q2_ans'],$data['q3'],$data['q3_ans'],
							$data['q4'],$data['q4_ans'],$data['q5'],$data['q5_ans'],$data['q6'],$data['q7'],$data['q8_1'],
							$data['q8_2'],$data['q8_3'],$data['q8_4'],$data['q8_5'],$data['q8_6Other'],$data['q9'],$data['q10_1'],
							$data['q10_2'],$data['q10_3'],$data['q11'],$data['q12'],$data['q13_1'],$data['q13_2'],$data['q13_3'],
							$data['q13_4'],$data['q13_5'],$data['q13_6'],$data['q13_7'],$data['q13_8'],$data['q13_9'],$data['q13_10'],
							$data['q13_11'],$data['q13_12'],$data['q13_14'],$data['q13_15'],$data['q13_16'],$data['q13_16Other'],
							$currentDate,$userId,$data['patient_id']]);

		return $statement->rowCount();

	}

	public function saveTreatmentRecord($data, $userId){

		//print_r($data);
		//echo $patientId = $data['patient_id'];

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT treatment_record (patient_id, treatment_date, tooth, treatment, treatment_amount, dentist_id, dentist_percentage, laboratory_fee, last_modified, last_modified_by, archive,branch)
											VALUES (?,?,?,?,?,?,?,?,?,?,?,?)" );

		$statement->execute([$data['patient_id'], $data['treatment_date'], $data['tooth_nos'], $data['procedure'], $data['treatment_amount'], $data['treatment_dentist'], $data['dentist_percentage'], $data['laboratory_fee'], $currentDate, $userId, $archive, $this->branch]);

		return $statement->rowCount();

	}

	public function updateTreatmentRecord($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE treatment_record 
											SET treatment_date = ?, tooth = ?, treatment = ?, treatment_amount = ?, dentist_id = ?,
											dentist_percentage = ?, laboratory_fee = ?, last_modified = ?, last_modified_by = ?
											WHERE id = ?" );

		$statement->execute([$data['treatment_date'],$data['tooth_nos'],$data['procedure'],$data['treatment_amount'],$data['treatment_dentist'],$data['dentist_percentage'],$data['laboratory_fee'],$currentDate,$userId,$data['treatment_id']]);

		return $statement->rowCount();

	}

	public function saveUser($data){

		$archive = 2; // pending for approval

		$currentDate = date("Y-m-d H:i:s");
		$password = "ampongdental"; //default password
		$isActive = 'Y';

		if($data['isDentist'] == 1) $userType = 2;
		else $userType = 1;

		$uuid = guidv4();

		$statement = $this->pdo->prepare("INSERT users (user_id, name, nickname, username, password, user_type, is_dentist, is_active, archive, last_modified, branch)
											VALUES (?,?,?,?,?,?,?,?,?,?,?)" );

		$statement->execute([$uuid, $data['fullname'], $data['nickname'], $data['username'], md5($password), $userType, $data['isDentist'], $isActive,  $archive, $currentDate, $this->branch]);

		return $statement->rowCount();

	}

	public function savePaymentType($data, $userId){

		$archive = 0; // active

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT lib_payment_type (name, percentage, archive, last_modified, last_modified_by)
											VALUES (?,?,?,?,?)" );

		$statement->execute([$data['name'], $data['percentage'], $archive, $currentDate, $userId]);

		return $statement->rowCount();

	}

	public function savePayment($data, $userId){

		//print_r($data);
		//echo $patientId = $data['patient_id'];

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");
		$printedReceipt = "N"; //Always no upon saving 

		$statement = $this->pdo->prepare("INSERT payments (treatment_id, patient_id, payment, payment_type, payment_date, payment_percentage, last_modified, last_modified_by, is_printed_receipt,archive)
											VALUES (?,?,?,?,?,?,?,?,?,?)" );

		$statement->execute([$data['treatment_id'], $data['patient_id'], $data['payment_amount'], $data['payment_type'], $data['payment_date'], $data['payment_percentage'], $currentDate, $userId, $printedReceipt, $archive]);

		return $statement->rowCount();

	}

	public function updatePayment($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE payments 
											SET payment = ?, payment_type = ?, payment_date = ?, payment_percentage = ?, last_modified_by = ?, last_modified = ?
											WHERE id = ?" );

		$statement->execute([$data['payment_amount'], $data['payment_type'], $data['payment_date'], $data['payment_percentage'], $userId, $currentDate, $data['payment_id']]);

		return $statement->rowCount();

	}

	public function updatePaymentPrintedReceipt($paymentId, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");
		$printedReceipt = "Y"; //Always yes if creating receipt 

		$statement = $this->pdo->prepare("UPDATE payments 
											SET is_printed_receipt = ?, last_modified_by = ?
											WHERE id = ?" );

		$statement->execute([$printedReceipt, $userId, $paymentId]);

		return $statement->rowCount();

	}

	public function updatePaymentType($data, $userId){

		//print_r($data);
		//echo $patientId = $data['patient_id'];

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE lib_payment_type 
											SET name = ?, percentage = ?, last_modified_by = ?, last_modified = ?
											WHERE id = ?" );

		$statement->execute([$data['name'], $data['percentage'], $userId, $currentDate, $data['id']]);

		return $statement->rowCount();

	}

	public function saveDentalRecord($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");
		
		$statement = $this->pdo->prepare("INSERT patient_dental_info (patient_id, uuid,
																		t18, t17, t16, t15, t14, t13, t12, t11,
																		t21, t22, t23, t24, t25, t26, t27, t28,
																		t48, t47, t46, t45, t44, t43, t42, t41,
																		t31, t32, t33, t34, t35, t36, t37, t38,
																		date_added, last_modified_by, last_modified, archive)
											VALUES (?, ?,
													?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,
													?,?,?,?,?,?,?,?,
													?,?,?,?)" );

		$statement->execute([$data['patient_id'], $data['uuid'],

							$data['upper_right_teeth'][0], $data['upper_right_teeth'][1], $data['upper_right_teeth'][2], $data['upper_right_teeth'][3], $data['upper_right_teeth'][4], $data['upper_right_teeth'][5], $data['upper_right_teeth'][6], $data['upper_right_teeth'][7],

							$data['upper_left_teeth'][0], $data['upper_left_teeth'][1], $data['upper_left_teeth'][2], $data['upper_left_teeth'][3], $data['upper_left_teeth'][4], $data['upper_left_teeth'][5], $data['upper_left_teeth'][6], $data['upper_left_teeth'][7],

							$data['lower_right_teeth'][0], $data['lower_right_teeth'][1], $data['lower_right_teeth'][2], $data['lower_right_teeth'][3], $data['lower_right_teeth'][4], $data['lower_right_teeth'][5], $data['lower_right_teeth'][6], $data['lower_right_teeth'][7],

							$data['lower_left_teeth'][0], $data['lower_left_teeth'][1], $data['lower_left_teeth'][2], $data['lower_left_teeth'][3], $data['lower_left_teeth'][4], $data['lower_left_teeth'][5], $data['lower_left_teeth'][6], $data['lower_left_teeth'][7],

							$data['date_added'], $userId, $currentDate, $archive]);

		return $statement->rowCount();

	}

	public function updateDentalRecord($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_dental_info 
											SET t18 = ?, t17 = ?, t16 = ?, t15 = ?, t14 = ?, t13 = ?, t12 = ?, t11 = ?, 
												t21 = ?, t22 = ?, t23 = ?, t24 = ?, t25 = ?, t26 = ?, t27 = ?, t28 = ?, 
												t48 = ?, t47 = ?, t46 = ?, t45 = ?, t44 = ?, t43 = ?, t42 = ?, t41 = ?, 
												t31 = ?, t32 = ?, t33 = ?, t34 = ?, t35 = ?, t36 = ?, t37 = ?, t38 = ?,
												date_added = ?, last_modified_by = ?, last_modified = ?
											WHERE uuid = ?" );

		$statement->execute([

							$data['upper_right_teeth'][0], $data['upper_right_teeth'][1], $data['upper_right_teeth'][2], $data['upper_right_teeth'][3], $data['upper_right_teeth'][4], $data['upper_right_teeth'][5], $data['upper_right_teeth'][6], $data['upper_right_teeth'][7],

							$data['upper_left_teeth'][0], $data['upper_left_teeth'][1], $data['upper_left_teeth'][2], $data['upper_left_teeth'][3], $data['upper_left_teeth'][4], $data['upper_left_teeth'][5], $data['upper_left_teeth'][6], $data['upper_left_teeth'][7],

							$data['lower_right_teeth'][0], $data['lower_right_teeth'][1], $data['lower_right_teeth'][2], $data['lower_right_teeth'][3], $data['lower_right_teeth'][4], $data['lower_right_teeth'][5], $data['lower_right_teeth'][6], $data['lower_right_teeth'][7],

							$data['lower_left_teeth'][0], $data['lower_left_teeth'][1], $data['lower_left_teeth'][2], $data['lower_left_teeth'][3], $data['lower_left_teeth'][4], $data['lower_left_teeth'][5], $data['lower_left_teeth'][6], $data['lower_left_teeth'][7],

							$data['date_added'], $userId, $currentDate,

							$data['id']]);

		return $statement->rowCount();

	}

	public function deleteDentalRecord($data, $userId){

		$archive = 2; // remove
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE patient_dental_info
											SET last_modified_by = ?, last_modified = ?, archive = ?
											WHERE uuid = ?" );

		$statement->execute([

							$userId, $currentDate, $archive,

							$data['id']]);

		return $statement->rowCount();

	}

	public function getSchedulesByDentist($date, $dentistId){

		$statement = $this->pdo->prepare("SELECT t1, t2, t3, t4, t5, t6, t7, t8, t9, t10,
												t11, t12, t13, t14, t15, t16, t17, t18, t19, t20,
												t21, t22, t23, t24, t25
											FROM schedule_dentist
											WHERE dentist_id = ? AND date_of_schedule = ?");

		$statement->execute([$dentistId, $date,]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function hasExistingDentistSchedule($dateOfSchedule, $dentistId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id FROM schedule_dentist
											WHERE date_of_schedule = ? AND dentist_id = ?" );

		$statement->execute([$dateOfSchedule, $dentistId]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function updateDentistSchedule($dateOfSchedule, $dentistId, $userId, $timeSchedules, $scheduleId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE schedule_dentist 
												SET dentist_id = ?, date_of_schedule = ?, 
												t1 = ?, t2 = ?, t3 = ?, t4 = ?, t5 = ?,
												t6 = ?, t7 = ?, t8 = ?, t9 = ?, t10 = ?,
												t11 = ?, t12 = ?, t13 = ?, t14 = ?, t15 = ?,
												t16 = ?, t17 = ?, t18 = ?, t19 = ?, t20 = ?,
												t21 = ?, t22 = ?, t23 = ?, t24 = ?, t25 = ?,
												last_modified = ?, last_modified_by = ?
												WHERE id = ?" );

		$statement->execute([$dentistId, $dateOfSchedule,
								$timeSchedules[0], $timeSchedules[1], $timeSchedules[2], $timeSchedules[3], $timeSchedules[4],
								$timeSchedules[5], $timeSchedules[6], $timeSchedules[7], $timeSchedules[8], $timeSchedules[9],
								$timeSchedules[10], $timeSchedules[11], $timeSchedules[12], $timeSchedules[13], $timeSchedules[14],
								$timeSchedules[15], $timeSchedules[16], $timeSchedules[17], $timeSchedules[18], $timeSchedules[19],
								$timeSchedules[20], $timeSchedules[21], $timeSchedules[22], $timeSchedules[23], $timeSchedules[24],
			$currentDate, $userId, $scheduleId]);

		return $statement->rowCount();

	}

	public function createDentistSchedule($dateOfSchedule, $dentistId, $userId, $timeSchedules){

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT INTO schedule_dentist ( dentist_id, date_of_schedule, 
												t1, t2, t3, t4, t5,
												t6, t7, t8, t9, t10,
												t11, t12, t13, t14, t15,
												t16, t17, t18, t19, t20,
												t21, t22, t23, t24, t25,
												last_modified, last_modified_by)
											VALUES (?,?,
													?,?,?,?,?,
													?,?,?,?,?,
													?,?,?,?,?,
													?,?,?,?,?,
													?,?,?,?,?,
													?,?)" );

		$statement->execute([$dentistId, $dateOfSchedule,
								$timeSchedules[0], $timeSchedules[1], $timeSchedules[2], $timeSchedules[3], $timeSchedules[4],
								$timeSchedules[5], $timeSchedules[6], $timeSchedules[7], $timeSchedules[8], $timeSchedules[9],
								$timeSchedules[10], $timeSchedules[11], $timeSchedules[12], $timeSchedules[13], $timeSchedules[14],
								$timeSchedules[15], $timeSchedules[16], $timeSchedules[17], $timeSchedules[18], $timeSchedules[19],
								$timeSchedules[20], $timeSchedules[21], $timeSchedules[22], $timeSchedules[23], $timeSchedules[24],
			$currentDate, $userId]);

		return $statement->rowCount();

	}

	public function savePatientSchedule($data, $userId, $uuid){

		//print_r($data);
		//echo $patientId = $data['patient_id'];

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT INTO schedule_patient (patient_schedule_id, dentist_id, 
												patient_id, patient_name, date_of_schedule, treatment,
												contact_number, last_modified, last_modified_by, archive)
											VALUES (?,?,
													?,?,?,?,
													?,?,?,?)" );

		$statement->execute([$uuid, $data['dentist_id'], 
			$data['patient_id'], $data['patient_name'], $data['date_of_appointment'], $data['procedure'], 
			$data['contact_number'], $currentDate, $userId, $archive]);

		return $statement->rowCount();

	}

	public function cancelSchedule($data, $userId){

		//print_r($data);
		//echo $patientId = $data['patient_id'];

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");
		$cancelled = "Y";

		$statement = $this->pdo->prepare("UPDATE schedule 
											SET remarks = ?, cancelled = ?, last_modified = ?, last_modified_by = ?
											WHERE id = ?" );

		$statement->execute([$data['remarks'], $cancelled, $currentDate, $userId, $data['schedule_id']]);

		return $statement->rowCount();

		

	}

	public function checkDentistAvailability($data){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, patient_id_1, patient_id_2, patient_id_1_procedure, patient_id_2_procedure, 
												new_patient1_name, new_patient2_name
											FROM schedule
											WHERE archive = ? AND dentist_id = ? AND time_schedule = ? AND date_schedule = ?");

		$statement->execute([$archive,$data['dentist_id'],$data['time_schedule'],$data['date_of_appointment']]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function getCashDenominationByDate($date){

		$statement = $this->pdo->prepare("SELECT id, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10
											FROM cash_denomination
											WHERE date_added = ?");

		$statement->execute([$date,]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function saveCashDenomination($data, $userId){

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("INSERT cash_denomination (date_added, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, last_modified, last_modified_by)
											VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)" );

		$statement->execute([$data['date'], $data['m1'], $data['m2'], $data['m3'], $data['m4'], $data['m5'], $data['m6'], $data['m7'], $data['m8'], $data['m9'], $data['m10'], $currentDate, $userId]);

		return $statement->rowCount();

	}

	public function updateCashDenomination($data, $userId){

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE cash_denomination 
											SET m1 = ?, m2 = ?, m3 = ?, m4 = ?, m5 = ?, m6 = ?, m7 = ?, m8 = ?, m9 = ?, m10 = ?, last_modified = ?, last_modified_by = ?
											WHERE date_added = ?" );

		$statement->execute([$data['m1'], $data['m2'], $data['m3'], $data['m4'], $data['m5'], $data['m6'], $data['m7'], $data['m8'], $data['m9'], $data['m10'], $currentDate, $userId, $data['date']]);

		return $statement->rowCount();

	}
	


}

function guidv4($data = null)
{	
	$data = $data ?? random_bytes(16);
	
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}