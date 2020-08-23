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
		$totalMisc = 0;
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
			$totalMisc += $record['amount'];

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

		//$totalMisc = $data['total_misc_cash'] + $data['total_misc_cheque'];
		$pdf->Cell(243,8,'TOTAL',1,0,'R',true);
		$pdf->setTextColor(255,0,0);
		$pdf->CellFitScale(50,8,'P '.number_format($totalMisc,2,'.',','),'1','L','',true);

		$filename = "../pdf/miscRecords.pdf";
		$pdf->Output($filename,'F');

	}

?>