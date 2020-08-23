<?php
	
	//$database = require '..\bootstrap.php';

	// setting return value
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	$data = json_decode(file_get_contents("php://input"), true);

	//$results = $database->getPaymentRecordById($data['payment_id']);


	//print_r($data['records'][0]['payment_date']);
	printPaymentRecords($data);

	function printPaymentRecords($data){

		require("../lib/fpdf/fpdf.php");
		require("../lib/cellfit.php");

		$f = new NumberFormatter("en", NumberFormatter::SPELLOUT);

		class PDF extends FPDF
		{
			// Page header
			function Header()
			{
			    // Logo
			    //$ampongDentalLogo = "images/ad_horizontal.jpg";
			    //$this->Image($ampongDentalLogo,90,6,40);
			    // Arial bold 15
			    if (!$this->skipHeader) {
			            // ...
			        
				    $this->SetFont('Arial','B',15);
				    // Move to the right
				    $this->Cell(80);
				    // Title
				    $this->Cell(30,10,'AMPONG DENTAL CLINIC',0,0,'C');
				    // Line break
				    $this->Ln(20);
			    }
			}

			// Page footer
			function Footer()
			{
				if (!$this->skipFooter) {
				    // Position at 1.5 cm from bottom
				    $this->SetY(-15);
				    // Arial italic 8
				    $this->SetFont('Arial','I',8);
				    // Page number
				    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
				}
			}
		}

		// Instanciation of inherited class
		$pdf = new FPDF_CellFit("L", "mm", array(210 ,297 ));
		$pdf->AliasNbPages();
		$pdf->skipHeader = true;
		$pdf->skipFooter = true;

		// breakdown
		$pdf->AddPage();
		$pdf->SetFont('Arial','B',10);

		$pdf->Image('../../assets/images/ad_horizontal.jpg',128,6,40);

		$pdf->SetY(20);
		$pdf->SetX(2);

		$pdf->SetFillColor(96,96,96);
		$pdf->SetTextColor(255,255,255);
		$pdf->MultiCell(180,8,'Income Breakdownss',1,'C',true);

		$pdf->SetX(2);
		$pdf->SetFillColor(192,192,192);
		$pdf->SetTextColor(0,0,0);
		$pdf->MultiCell(180,8,$data['selected_date_label'],1,'C',true);

		$pdf->SetX(2);
		$pdf->SetFillColor(204,255,204);
		$pdf->SetTextColor(0,0,0);
		$pdf->MultiCell(180,8,"Payments",1,'C',true);

		$pdf->SetFont('Arial','',8);
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0,0,0);

		$xAxis = 2;
		$yAxis = 44;
		foreach ($data['payment_type'] as $payment_type) {
			$pdf->SetY($yAxis);
			$pdf->SetX($xAxis);
			$pdf->Cell(120,7,"TOTAL PAYMENT IN ".$payment_type['type'],1,0,'R');
			$pdf->Cell(60,7,'P'.number_format($payment_type['total'],2,'.',','),1,0,'C');
			$yAxis += 7;

			if($payment_type['type'] == "CASH") $cashPayments = $payment_type['total'];
		}

		$pdf->SetFont('Arial','B',8);
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->Cell(120,7,"TOTAL PAYMENTS",1,0,'R');
		$pdf->Cell(60,7,'P'.number_format($data['total_payments'],2,'.',','),1,0,'C');
		
		$yAxis += 7;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFillColor(255,153,153);
		$pdf->SetTextColor(0,0,0);
		$pdf->MultiCell(180,8,"Deduction/Expenses",1,'C',true);

		$yAxis += 8;
		$pdf->SetFont('Arial','',8);
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0,0,0);

		$deductions = 0;
		foreach ($data['payment_type'] as $payment_type) {
			
			if($payment_type['percentage'] != 0){
				$pdf->SetY($yAxis);
				$pdf->SetX($xAxis);
				$pdf->Cell(120,7,"TOTAL DEDUCTION FROM ".$payment_type['type']." PAYMENT",1,0,'R');
				$pdf->Cell(60,7,'P'.number_format($payment_type['deductions'],2,'.',','),1,0,'C');
				$yAxis += 7;
				$deductions += $payment_type['deductions'];
			}

		}

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->Cell(120,7,"TOTAL DEDUCTION FROM DENTIST PERCENTAGE",1,0,'R');
		$pdf->Cell(60,7,'P'.number_format($data['total_dentist_fee'],2,'.',','),1,0,'C');
		$yAxis += 7;
		$deductions += $data['total_dentist_fee'];

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->Cell(120,7,"TOTAL MISCELLANEOUS EXPENSES PAID IN CASH",1,0,'R');
		$pdf->Cell(60,7,'P'.number_format($data['total_misc_cash'],2,'.',','),1,0,'C');
		$yAxis += 7;
		$deductions += $data['total_misc_cash'];

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->Cell(120,7,"TOTAL MISCELLANEOUS EXPENSES PAID IN CHEQUE",1,0,'R');
		$pdf->Cell(60,7,'P'.number_format($data['total_misc_cheque'],2,'.',','),1,0,'C');
		$yAxis += 7;
		$deductions += $data['total_misc_cheque'];

		$pdf->SetFont('Arial','B',8);
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->Cell(120,7,"TOTAL DEDUCTIONS",1,0,'R');
		$pdf->Cell(60,7,'P'.number_format($deductions,2,'.',','),1,0,'C');
		$yAxis += 7;

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFillColor(153,204,255);
		$pdf->SetTextColor(0,0,0);
		$pdf->SetFont('Arial','B',8);
		$pdf->Cell(120,7,"TOTAL NET",1,0,'R',1);
		$pdf->Cell(60,7,'P'.number_format(($data['total_payments']-$deductions),2,'.',','),1,0,'C',1);
		$yAxis += 7;

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0,0,0);
		$pdf->SetFont('Arial','B',8);
		$pdf->Cell(120,7,"TOTAL PAYMENT IN CASH - TOTAL EXPENSES PAID IN CASH",1,0,'R',1);
		$pdf->Cell(60,7,'P'.number_format(($cashPayments-$data['total_misc_cash']),2,'.',','),1,0,'C',1);

		$xAxis = 190;
		$yAxis = 20;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);

		if($data['print_cash_denomination'] == 1){
			if(count($data['cash_denomination']) > 0){

				// breakdown
				$pdf->SetFont('Arial','B',10);

				$pdf->SetFillColor(192,192,192);
				$pdf->SetTextColor(0,0,0);
				$pdf->MultiCell(103,8,$data['selected_date_label'],1,'C',true);

				$pdf->SetX($xAxis);
				$pdf->SetFillColor(96,96,96);
				$pdf->SetTextColor(255,255,255);
				$pdf->MultiCell(103,8,'Cash Denomination',1,'C',true);

				$pdf->SetFont('Arial','',8);
				$pdf->SetFillColor(255,255,255);
				$pdf->SetTextColor(0,0,0);

				$xAxis = 190;
				$yAxis = 37;
				$totalDenomination = 0;

				$pdf->SetY($yAxis);
				$pdf->SetX($xAxis);
				$pdf->Cell(30,7,'LABEL',1,0,'R');
				$pdf->Cell(30,7,'PIECES',1,0,'R');
				$pdf->Cell(43,7,'TOTAL',1,0,'R');
				$yAxis += 7;

				foreach ($data['cash_denomination'] as $cash) {
					$pdf->SetY($yAxis);
					$pdf->SetX($xAxis);
					$pdf->Cell(30,7,$cash['label'],1,0,'R');
					$pdf->Cell(30,7,$cash['pieces'],1,0,'R');
					$pdf->Cell(43,7,'P'.number_format($cash['pieces']*$cash['label'],2,'.',','),1,0,'R');

					$totalDenomination += ($cash['pieces']*$cash['label']);
					$yAxis += 7;
				}

				$pdf->SetFont('Arial','B',8);
				$pdf->SetY($yAxis);
				$pdf->SetX($xAxis);
				$pdf->Cell(60,7,"TOTAL",1,0,'R');
				$pdf->Cell(43,7,'P'.number_format($totalDenomination,2,'.',','),1,0,'R');
				
			} else {

				// breakdown
				$pdf->SetFont('Arial','B',10);

				$pdf->SetY($yAxis);
				$pdf->SetX($xAxis);

				$pdf->SetFillColor(192,192,192);
				$pdf->SetTextColor(0,0,0);
				$pdf->MultiCell(103,8,"No saved cash denomination on this day yet!...",1,'C',true);

			}
		}
		// MISC EXPENSES
		/*$pdf->AddPage();
		$pdf->SetFont('Arial','B',10);

		$pdf->Image('../../assets/images/ad_horizontal.jpg',128,6,40);

		$pdf->SetY(20);
		$pdf->SetX(2);

		$pdf->SetFillColor(96,96,96);
		$pdf->SetTextColor(255,255,255);
		$pdf->MultiCell(293,8,'Miscellaneous Expenses Records',1,'C',true);

		$pdf->SetX(2);
		$pdf->SetFillColor(192,192,192);
		$pdf->SetTextColor(0,0,0);
		$pdf->MultiCell(293,8,$data['selected_date_label'],1,'C',true);

		$pdf->SetFont('Arial','',8);
		$pdf->SetX(2);
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0,0,0);

		$pdf->CellFitScale(5,8,'',1,'C');
		$pdf->CellFitScale(45,8,'Date',1,'L');
		$pdf->CellFitScale(150,8,'Particulars',1,'L');
		$pdf->CellFitScale(43,8,'Payment Type',1,'L');
		$pdf->CellFitScale(50,8,'Amount',1,'L');

		$yAxis = 44;
		$xAxis = 2;

		$i = 1;
		$printedRecord = 1;
		$rowBreak = 18;
		foreach ($data['misc_expenses'] as $record) {


			$pdf->setTextColor(0,0,0);
			$pdf->SetY($yAxis);
			$pdf->SetX($xAxis);
			$pdf->CellFitScale(5,8,$i,'LBRT','C');
			$pdf->CellFitScale(45,8,$record['date_charge'],'BT','L');
			$pdf->CellFitScale(150,8,$record['description'],'BT','L');

			if($record['payment_type'] == 1) $pdf->CellFitScale(43,8,'CASH','BT','L');
			else if($record['payment_type'] == 2) $pdf->CellFitScale(43,8,'CHEQUE','BT','L');

			$pdf->CellFitScale(50,8,'P '.number_format($record['amount'],2,'.',','),'BRT','L');

			$yAxis += 8;
			$i++;

			$printedRecord++;

			if($printedRecord > $rowBreak){
				$rowBreak = 23;
				$pdf->AddPage();
				$printedRecord = 1;
				$yAxis = 4;
			}

		}

		$pdf->SetFont('Arial','B',10);
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		
		$pdf->SetTextColor(0,0,0);
		$pdf->SetFillColor(220,220,220);

		$totalMisc = $data['total_misc_cash'] + $data['total_misc_cheque'];
		$pdf->Cell(243,8,'TOTAL',1,0,'R',true);
		$pdf->setTextColor(255,0,0);
		$pdf->CellFitScale(50,8,'P '.number_format($totalMisc,2,'.',','),'1','L','',true);
		*/

		// PAYMENT RECORDS
		$pdf->AddPage();
		$pdf->SetFont('Arial','B',10);

		$pdf->Image('../../assets/images/ad_horizontal.jpg',128,6,40);

		
		$pdf->SetY(20);
		$pdf->SetX(2);

		$pdf->SetFillColor(96,96,96);
		$pdf->SetTextColor(255,255,255);
		$pdf->MultiCell(293,8,'Payment Records',1,'C',true);

		$pdf->SetX(2);
		$pdf->SetFillColor(192,192,192);
		$pdf->SetTextColor(0,0,0);
		$pdf->MultiCell(293,8,$data['selected_date_label'],1,'C',true);

		$pdf->SetFont('Arial','',8);
		$pdf->SetX(2);
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0,0,0);

		$pdf->CellFitScale(5,8,'',1,'C');
		$pdf->CellFitScale(18,8,'Payment Date',1,'L');
		$pdf->CellFitScale(35,8,'Patient Name',1,'L');
		$pdf->CellFitScale(132,8,'Procedure',1,'L');
		$pdf->CellFitScale(25,8,'Dentist Name',1,'L');
		$pdf->CellFitScale(18,8,'Treatment Date',1,'L');
		$pdf->CellFitScale(15,8,'Payment Type',1,'L');
		$pdf->CellFitScale(15,8,'Payment',1,'L');
		$pdf->CellFitScale(15,8,'Payment Fee',1,'L');
		$pdf->CellFitScale(15,8,'Dentist Fee',1,'L');

		$yAxis = 44;
		$xAxis = 2;

		$i = 1;
		$printedRecord = 1;
		$rowBreak = 18;
		foreach ($data['records'] as $record) {

			$payment = $record['payment'];
			$paymentPercentage = $record['payment_percentage'];
			$dentistPercentage = $record['dentist_percentage'];

			$pdf->setTextColor(0,0,0);
			$pdf->SetY($yAxis);
			$pdf->SetX($xAxis);
			$pdf->CellFitScale(5,8,$i,'LBRT','C');
			$pdf->CellFitScale(18,8,$record['payment_date'],'BT','L');
			$pdf->CellFitScale(35,8,$record['patient_name'],'BT','L');
			$pdf->CellFitScale(132,8,$record['treatment'],'BT','L');
			$pdf->CellFitScale(25,8,$record['dentist_name'],'BT','L');
			$pdf->CellFitScale(18,8,$record['treatment_date'],'BT','L');
			$pdf->CellFitScale(15,8,$record['payment_type'],'BT','L');

			$pdf->setTextColor(0,128,0);
			$pdf->CellFitScale(15,8,'P'.number_format($payment,2,'.',','),'BT','L');

			$paymentFee = $payment * ($paymentPercentage/100);

			$pdf->setTextColor(255,0,0);
			$pdf->CellFitScale(15,8,'P'.number_format($paymentFee,2,'.',','),'BT','L');

			$dentistFee = ($payment - $paymentFee) * ($dentistPercentage/100);

			$pdf->CellFitScale(15,8,'P'.number_format($dentistFee,2,'.',','),'BRT','L');

			$yAxis += 8;
			$i++;

			$printedRecord++;

			if($printedRecord > $rowBreak){
				$rowBreak = 23;
				$pdf->AddPage();
				$printedRecord = 1;
				$yAxis = 4;
			}

		}

		$pdf->SetFont('Arial','B',10);
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		
		$pdf->SetTextColor(0,0,0);
		$pdf->SetFillColor(220,220,220);

		$pdf->Cell(248,8,'TOTAL',1,0,'R',true);
		$pdf->setTextColor(0,128,0);
		$pdf->CellFitScale(15,8,'P'.number_format($data['total_payments'],2,'.',','),'1','L','',true);
		$pdf->setTextColor(255,0,0);
		$pdf->CellFitScale(15,8,'P'.number_format($data['total_payments_fee'],2,'.',','),'1','L','',true);
		$pdf->CellFitScale(15,8,'P'.number_format($data['total_dentist_fee'],2,'.',','),'1','L','',true);
		
		$yAxis += 8;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);

		$pdf->SetTextColor(0,0,0);
		$pdf->Cell(248,8,'TOTAL NET',1,0,'R',true);
		$pdf->setTextColor(0,128,0);
		$pdf->CellFitScale(45,8,'P'.number_format($data['total_net'],2,'.',','),'1','C','',true);

		

		$filename = "../pdf/paymentRecords.pdf";
		$pdf->Output($filename,'F');

	}

?>