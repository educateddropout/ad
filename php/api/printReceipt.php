<?php
	
	$database = require '..\bootstrap.php';
	session_start();
	// setting return value
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	$data = json_decode(file_get_contents("php://input"), true);

	$userId = $_SESSION['ad_user_id'];
	$results = $database->updatePaymentPrintedReceipt($data['payment_id'],$userId);
	$results = $database->getPaymentRecordById($data['payment_id']);

	//print_r($results);
	printReceipt($results);


	function printReceipt($data){

		require("../lib/fpdf/fpdf.php");

		$f = new NumberFormatter("en", NumberFormatter::SPELLOUT);

		class PDF extends FPDF
		{

			//Cell with horizontal scaling if text is too wide
		    function CellFit($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='', $scale=false, $force=true)
		    {
		        //Get string width
		        $str_width=$this->GetStringWidth($txt);

		        //Calculate ratio to fit cell
		        if($w==0)
		            $w = $this->w-$this->rMargin-$this->x;
		        $ratio = ($w-$this->cMargin*2)/$str_width;

		        $fit = ($ratio < 1 || ($ratio > 1 && $force));
		        if ($fit)
		        {
		            if ($scale)
		            {
		                //Calculate horizontal scaling
		                $horiz_scale=$ratio*100.0;
		                //Set horizontal scaling
		                $this->_out(sprintf('BT %.2F Tz ET',$horiz_scale));
		            }
		            else
		            {
		                //Calculate character spacing in points
		                $char_space=($w-$this->cMargin*2-$str_width)/max($this->MBGetStringLength($txt)-1,1)*$this->k;
		                //Set character spacing
		                $this->_out(sprintf('BT %.2F Tc ET',$char_space));
		            }
		            //Override user alignment (since text will fill up cell)
		            $align='';
		        }

		        //Pass on to Cell method
		        $this->Cell($w,$h,$txt,$border,$ln,$align,$fill,$link);

		        //Reset character spacing/horizontal scaling
		        if ($fit)
		            $this->_out('BT '.($scale ? '100 Tz' : '0 Tc').' ET');
		    }

		    //Cell with horizontal scaling only if necessary
		    function CellFitScale($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
		    {
		        $this->CellFit($w,$h,$txt,$border,$ln,$align,$fill,$link,true,false);
		    }

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
		$pdf = new PDF("P", "mm", array(105 ,148 ));
		$pdf->AliasNbPages();
		$pdf->skipHeader = true;
		$pdf->skipFooter = true;
		$pdf->AddPage();
		$pdf->SetFont('Times','',10);

		$pdf->SetY(3);
		$pdf->SetX(1);
		$pdf->SetFont('Times','B',12);
		$pdf->Cell(105,4,"AMPONG DENTAL CLINIC",0, 2, 'L');
		$pdf->SetFont('Times','',8);
		$pdf->Cell(105,3,"2F Kamuning Place, Kamuning Road,",0, 2, 'L');
		$pdf->Cell(105,3,"Quezon City, Philippines",0, 2, 'L');
		$pdf->Cell(105,3,"Phone: (02) 8281-5482",0, 2, 'L');
		$pdf->Cell(105,3,"Cellphone: (63) 9178835013",0, 2, 'L');
		/*$pdf->Cell(105,3,"2257 Don Chino Roces Ave. Extension,",0, 2, 'L');
		$pdf->Cell(105,3,"Makati City, Philippines",0, 2, 'L');
		$pdf->Cell(105,3,"Phone: (02) 8298-7557",0, 2, 'L');
		$pdf->Cell(105,3,"Cellphone: (63) 9176398820",0, 2, 'L');*/

		$pdf->SetFont('Arial','B',20);
		$pdf->SetY(4);
		$pdf->SetX(60);
		$pdf->SetTextColor(169,169,169);
		$pdf->Cell(45,3,"INVOICE",0, 2, 'R');
		$pdf->SetTextColor(0,0,0);

		$pdf->SetFont('Arial','B',8);
		$pdf->SetFillColor(169,169,169);
		$pdf->SetY(12);
		$pdf->SetX(53);
		$pdf->CellFitScale(25,4.5,'INVOICE #','BRLT', 2, 'C',true);
		$pdf->SetY(12);
		$pdf->SetX(78);
		$pdf->CellFitScale(25,4.5,'DATE','BRLT', 2, 'C', true);
		$pdf->SetY(16.5);
		$pdf->SetX(53);
		$pdf->SetFont('Arial','',8);
		$pdf->CellFitScale(25,4.5,$data[0]['id'],'BRLT', 2, 'C');
		$pdf->SetY(16.5);
		$pdf->SetX(78);
		$pdf->CellFitScale(25,4.5,$data[0]['payment_date'],'BRLT', 2, 'C');


		$pdf->SetY(25);
		$pdf->SetX(1);
		$pdf->SetFont('Arial','B',8);
		$pdf->CellFitScale(60,4.5,'BILL TO','BRLT', 2, 'L',true);
		$pdf->SetFont('Arial','',8);
		$pdf->CellFitScale(60,4.5,$data[0]['patient_name'],'', 2, 'L');

		$pdf->SetY(40);
		$pdf->SetX(1);
		$pdf->Cell(75,4,"DESCRIPTION",'BRLT', 0, 'L',true);
		$pdf->Cell(28,4,"AMOUNT",'BRLT', 1, 'C',true);
		$pdf->SetX(1);
		$pdf->Cell(75,65," ",'BRLT', 0, 'L');
		$pdf->Cell(28,65,"",'BRLT', 1, 'C');
		$pdf->SetX(1);
		$pdf->SetFont('Arial','I',8);
		$pdf->Cell(55,6,"Thank you for your business!",'BRLT', 0, 'C');
		$pdf->SetFont('Arial','B',8);
		$pdf->Cell(20,6,"TOTAL",'BLT', 0, 'L');
		$pdf->Cell(28,6,'P '.$data[0]['payment'],'BRT', 1, 'L');


		$pdf->SetY(45);
		if(count( explode(" ", $data[0]['treatment'])) < 9){

			$pdf->SetX(2);
			$pdf->SetFont('Arial','',8);
			$pdf->CellFitScale(73,4.5,$data[0]['treatment'],'', 1, 'L');

		} else {

			$pieces = explode(" ", $data[0]['treatment']);
			$m1 = "";
			$m2 = "";
			for($x = 0; $x <= count($pieces); $x++){
				if($x <= floor(count($pieces)/2)-1) $m1 .= $pieces[$x]." ";
				else{
					if($x < count($pieces)) $m2 .= $pieces[$x]." ";
				}
			}

			$pdf->SetX(1);
			$pdf->SetFont('Arial','',8);
			$pdf->CellFitScale(73,4.5,$m1,'', 1, 'L');

			$pdf->SetX(1);
			$pdf->SetFont('Arial','',8);
			$pdf->CellFitScale(73,4.5,$m2,'', 1, 'L');

		}

		$pdf->SetY(45);
		$pdf->SetX(76);
		$pdf->Cell(28,4.5,'P '.$data[0]['payment'],'', 1, 'L');

		$pdf->SetY(118);
		$pdf->SetX(1);
		$pdf->SetFont('Times','I',9);
		$pdf->Cell(105,4.5,'If you have any questions about this invoice, please contact','', 1, 'C');
		$pdf->SetX(1);
		$pdf->Cell(105,4.5,'[accounting@ampongdental.com]','', 1, 'C');

		$filename = "../pdf/receipt.pdf";
		$pdf->Output($filename,'F');

	}

?>