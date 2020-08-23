<?php


class dentalChart{

	protected $dentalChart = array();

	public function __construct($results){

		$dentalInfo = array();

		foreach ($results as $result) {

			$dentalInfo['t18Code'] = getTreatmentCode($result['t18']);
			$dentalInfo['t18'] = getTreatment($result['t18']);
			$dentalInfo['t18_1'] = getTeethPart1($result['t18']);
			$dentalInfo['t18_2'] = getTeethPart2($result['t18']);
			$dentalInfo['t18_3'] = getTeethPart3($result['t18']);
			$dentalInfo['t18_4'] = getTeethPart4($result['t18']);
			$dentalInfo['t18_5'] = getTeethPart5($result['t18']);

			$dentalInfo['t17Code'] = getTreatmentCode($result['t17']);
			$dentalInfo['t17'] = getTreatment($result['t17']);
			$dentalInfo['t17_1'] = getTeethPart1($result['t17']);
			$dentalInfo['t17_2'] = getTeethPart2($result['t17']);
			$dentalInfo['t17_3'] = getTeethPart3($result['t17']);
			$dentalInfo['t17_4'] = getTeethPart4($result['t17']);
			$dentalInfo['t17_5'] = getTeethPart5($result['t17']);

			$dentalInfo['t16Code'] = getTreatmentCode($result['t16']);
			$dentalInfo['t16'] = getTreatment($result['t16']);
			$dentalInfo['t16_1'] = getTeethPart1($result['t16']);
			$dentalInfo['t16_2'] = getTeethPart2($result['t16']);
			$dentalInfo['t16_3'] = getTeethPart3($result['t16']);
			$dentalInfo['t16_4'] = getTeethPart4($result['t16']);
			$dentalInfo['t16_5'] = getTeethPart5($result['t16']);

			$dentalInfo['t15Code'] = getTreatmentCode($result['t15']);
			$dentalInfo['t15'] = getTreatment($result['t15']);
			$dentalInfo['t15_1'] = getTeethPart1($result['t15']);
			$dentalInfo['t15_2'] = getTeethPart2($result['t15']);
			$dentalInfo['t15_3'] = getTeethPart3($result['t15']);
			$dentalInfo['t15_4'] = getTeethPart4($result['t15']);
			$dentalInfo['t15_5'] = getTeethPart5($result['t15']);

			$dentalInfo['t14Code'] = getTreatmentCode($result['t14']);
			$dentalInfo['t14'] = getTreatment($result['t14']);
			$dentalInfo['t14_1'] = getTeethPart1($result['t14']);
			$dentalInfo['t14_2'] = getTeethPart2($result['t14']);
			$dentalInfo['t14_3'] = getTeethPart3($result['t14']);
			$dentalInfo['t14_4'] = getTeethPart4($result['t14']);
			$dentalInfo['t14_5'] = getTeethPart5($result['t14']);

			$dentalInfo['t13Code'] = getTreatmentCode($result['t13']);
			$dentalInfo['t13'] = getTreatment($result['t13']);
			$dentalInfo['t13_1'] = getTeethPart1($result['t13']);
			$dentalInfo['t13_2'] = getTeethPart2($result['t13']);
			$dentalInfo['t13_3'] = getTeethPart3($result['t13']);
			$dentalInfo['t13_4'] = getTeethPart4($result['t13']);
			$dentalInfo['t13_5'] = getTeethPart5($result['t13']);

			$dentalInfo['t12Code'] = getTreatmentCode($result['t12']);
			$dentalInfo['t12'] = getTreatment($result['t12']);
			$dentalInfo['t12_1'] = getTeethPart1($result['t12']);
			$dentalInfo['t12_2'] = getTeethPart2($result['t12']);
			$dentalInfo['t12_3'] = getTeethPart3($result['t12']);
			$dentalInfo['t12_4'] = getTeethPart4($result['t12']);
			$dentalInfo['t12_5'] = getTeethPart5($result['t12']);

			$dentalInfo['t11Code'] = getTreatmentCode($result['t11']);
			$dentalInfo['t11'] = getTreatment($result['t11']);
			$dentalInfo['t11_1'] = getTeethPart1($result['t11']);
			$dentalInfo['t11_2'] = getTeethPart2($result['t11']);
			$dentalInfo['t11_3'] = getTeethPart3($result['t11']);
			$dentalInfo['t11_4'] = getTeethPart4($result['t11']);
			$dentalInfo['t11_5'] = getTeethPart5($result['t11']);

			// 2

			$dentalInfo['t28Code'] = getTreatmentCode($result['t28']);
			$dentalInfo['t28'] = getTreatment($result['t28']);
			$dentalInfo['t28_1'] = getTeethPart1($result['t28']);
			$dentalInfo['t28_2'] = getTeethPart2($result['t28']);
			$dentalInfo['t28_3'] = getTeethPart3($result['t28']);
			$dentalInfo['t28_4'] = getTeethPart4($result['t28']);
			$dentalInfo['t28_5'] = getTeethPart5($result['t28']);

			$dentalInfo['t27Code'] = getTreatmentCode($result['t27']);
			$dentalInfo['t27'] = getTreatment($result['t27']);
			$dentalInfo['t27_1'] = getTeethPart1($result['t27']);
			$dentalInfo['t27_2'] = getTeethPart2($result['t27']);
			$dentalInfo['t27_3'] = getTeethPart3($result['t27']);
			$dentalInfo['t27_4'] = getTeethPart4($result['t27']);
			$dentalInfo['t27_5'] = getTeethPart5($result['t27']);

			$dentalInfo['t26Code'] = getTreatmentCode($result['t26']);
			$dentalInfo['t26'] = getTreatment($result['t26']);
			$dentalInfo['t26_1'] = getTeethPart1($result['t26']);
			$dentalInfo['t26_2'] = getTeethPart2($result['t26']);
			$dentalInfo['t26_3'] = getTeethPart3($result['t26']);
			$dentalInfo['t26_4'] = getTeethPart4($result['t26']);
			$dentalInfo['t26_5'] = getTeethPart5($result['t26']);

			$dentalInfo['t25Code'] = getTreatmentCode($result['t25']);
			$dentalInfo['t25'] = getTreatment($result['t25']);
			$dentalInfo['t25_1'] = getTeethPart1($result['t25']);
			$dentalInfo['t25_2'] = getTeethPart2($result['t25']);
			$dentalInfo['t25_3'] = getTeethPart3($result['t25']);
			$dentalInfo['t25_4'] = getTeethPart4($result['t25']);
			$dentalInfo['t25_5'] = getTeethPart5($result['t25']);

			$dentalInfo['t24Code'] = getTreatmentCode($result['t24']);
			$dentalInfo['t24'] = getTreatment($result['t24']);
			$dentalInfo['t24_1'] = getTeethPart1($result['t24']);
			$dentalInfo['t24_2'] = getTeethPart2($result['t24']);
			$dentalInfo['t24_3'] = getTeethPart3($result['t24']);
			$dentalInfo['t24_4'] = getTeethPart4($result['t24']);
			$dentalInfo['t24_5'] = getTeethPart5($result['t24']);

			$dentalInfo['t23Code'] = getTreatmentCode($result['t23']);
			$dentalInfo['t23'] = getTreatment($result['t23']);
			$dentalInfo['t23_1'] = getTeethPart1($result['t23']);
			$dentalInfo['t23_2'] = getTeethPart2($result['t23']);
			$dentalInfo['t23_3'] = getTeethPart3($result['t23']);
			$dentalInfo['t23_4'] = getTeethPart4($result['t23']);
			$dentalInfo['t23_5'] = getTeethPart5($result['t23']);

			$dentalInfo['t22Code'] = getTreatmentCode($result['t22']);
			$dentalInfo['t22'] = getTreatment($result['t22']);
			$dentalInfo['t22_1'] = getTeethPart1($result['t22']);
			$dentalInfo['t22_2'] = getTeethPart2($result['t22']);
			$dentalInfo['t22_3'] = getTeethPart3($result['t22']);
			$dentalInfo['t22_4'] = getTeethPart4($result['t22']);
			$dentalInfo['t22_5'] = getTeethPart5($result['t22']);

			$dentalInfo['t21Code'] = getTreatmentCode($result['t21']);
			$dentalInfo['t21'] = getTreatment($result['t21']);
			$dentalInfo['t21_1'] = getTeethPart1($result['t21']);
			$dentalInfo['t21_2'] = getTeethPart2($result['t21']);
			$dentalInfo['t21_3'] = getTeethPart3($result['t21']);
			$dentalInfo['t21_4'] = getTeethPart4($result['t21']);
			$dentalInfo['t21_5'] = getTeethPart5($result['t21']);

			// 3
			$dentalInfo['t38Code'] = getTreatmentCode($result['t38']);
			$dentalInfo['t38'] = getTreatment($result['t38']);
			$dentalInfo['t38_1'] = getTeethPart1($result['t38']);
			$dentalInfo['t38_2'] = getTeethPart2($result['t38']);
			$dentalInfo['t38_3'] = getTeethPart3($result['t38']);
			$dentalInfo['t38_4'] = getTeethPart4($result['t38']);
			$dentalInfo['t38_5'] = getTeethPart5($result['t38']);

			$dentalInfo['t37Code'] = getTreatmentCode($result['t37']);
			$dentalInfo['t37'] = getTreatment($result['t37']);
			$dentalInfo['t37_1'] = getTeethPart1($result['t37']);
			$dentalInfo['t37_2'] = getTeethPart2($result['t37']);
			$dentalInfo['t37_3'] = getTeethPart3($result['t37']);
			$dentalInfo['t37_4'] = getTeethPart4($result['t37']);
			$dentalInfo['t37_5'] = getTeethPart5($result['t37']);

			$dentalInfo['t36Code'] = getTreatmentCode($result['t36']);
			$dentalInfo['t36'] = getTreatment($result['t36']);
			$dentalInfo['t36_1'] = getTeethPart1($result['t36']);
			$dentalInfo['t36_2'] = getTeethPart2($result['t36']);
			$dentalInfo['t36_3'] = getTeethPart3($result['t36']);
			$dentalInfo['t36_4'] = getTeethPart4($result['t36']);
			$dentalInfo['t36_5'] = getTeethPart5($result['t36']);

			$dentalInfo['t35Code'] = getTreatmentCode($result['t35']);
			$dentalInfo['t35'] = getTreatment($result['t35']);
			$dentalInfo['t35_1'] = getTeethPart1($result['t35']);
			$dentalInfo['t35_2'] = getTeethPart2($result['t35']);
			$dentalInfo['t35_3'] = getTeethPart3($result['t35']);
			$dentalInfo['t35_4'] = getTeethPart4($result['t35']);
			$dentalInfo['t35_5'] = getTeethPart5($result['t35']);

			$dentalInfo['t34Code'] = getTreatmentCode($result['t34']);
			$dentalInfo['t34'] = getTreatment($result['t34']);
			$dentalInfo['t34_1'] = getTeethPart1($result['t34']);
			$dentalInfo['t34_2'] = getTeethPart2($result['t34']);
			$dentalInfo['t34_3'] = getTeethPart3($result['t34']);
			$dentalInfo['t34_4'] = getTeethPart4($result['t34']);
			$dentalInfo['t34_5'] = getTeethPart5($result['t34']);

			$dentalInfo['t33Code'] = getTreatmentCode($result['t33']);
			$dentalInfo['t33'] = getTreatment($result['t33']);
			$dentalInfo['t33_1'] = getTeethPart1($result['t33']);
			$dentalInfo['t33_2'] = getTeethPart2($result['t33']);
			$dentalInfo['t33_3'] = getTeethPart3($result['t33']);
			$dentalInfo['t33_4'] = getTeethPart4($result['t33']);
			$dentalInfo['t33_5'] = getTeethPart5($result['t33']);

			$dentalInfo['t32Code'] = getTreatmentCode($result['t32']);
			$dentalInfo['t32'] = getTreatment($result['t32']);
			$dentalInfo['t32_1'] = getTeethPart1($result['t32']);
			$dentalInfo['t32_2'] = getTeethPart2($result['t32']);
			$dentalInfo['t32_3'] = getTeethPart3($result['t32']);
			$dentalInfo['t32_4'] = getTeethPart4($result['t32']);
			$dentalInfo['t32_5'] = getTeethPart5($result['t32']);

			$dentalInfo['t31Code'] = getTreatmentCode($result['t31']);
			$dentalInfo['t31'] = getTreatment($result['t31']);
			$dentalInfo['t31_1'] = getTeethPart1($result['t31']);
			$dentalInfo['t31_2'] = getTeethPart2($result['t31']);
			$dentalInfo['t31_3'] = getTeethPart3($result['t31']);
			$dentalInfo['t31_4'] = getTeethPart4($result['t31']);
			$dentalInfo['t31_5'] = getTeethPart5($result['t31']);

			// 4

			$dentalInfo['t48Code'] = getTreatmentCode($result['t48']);
			$dentalInfo['t48'] = getTreatment($result['t48']);
			$dentalInfo['t48_1'] = getTeethPart1($result['t48']);
			$dentalInfo['t48_2'] = getTeethPart2($result['t48']);
			$dentalInfo['t48_3'] = getTeethPart3($result['t48']);
			$dentalInfo['t48_4'] = getTeethPart4($result['t48']);
			$dentalInfo['t48_5'] = getTeethPart5($result['t48']);

			$dentalInfo['t47Code'] = getTreatmentCode($result['t47']);
			$dentalInfo['t47'] = getTreatment($result['t47']);
			$dentalInfo['t47_1'] = getTeethPart1($result['t47']);
			$dentalInfo['t47_2'] = getTeethPart2($result['t47']);
			$dentalInfo['t47_3'] = getTeethPart3($result['t47']);
			$dentalInfo['t47_4'] = getTeethPart4($result['t47']);
			$dentalInfo['t47_5'] = getTeethPart5($result['t47']);

			$dentalInfo['t46Code'] = getTreatmentCode($result['t46']);
			$dentalInfo['t46'] = getTreatment($result['t46']);
			$dentalInfo['t46_1'] = getTeethPart1($result['t46']);
			$dentalInfo['t46_2'] = getTeethPart2($result['t46']);
			$dentalInfo['t46_3'] = getTeethPart3($result['t46']);
			$dentalInfo['t46_4'] = getTeethPart4($result['t46']);
			$dentalInfo['t46_5'] = getTeethPart5($result['t46']);

			$dentalInfo['t45Code'] = getTreatmentCode($result['t45']);
			$dentalInfo['t45'] = getTreatment($result['t45']);
			$dentalInfo['t45_1'] = getTeethPart1($result['t45']);
			$dentalInfo['t45_2'] = getTeethPart2($result['t45']);
			$dentalInfo['t45_3'] = getTeethPart3($result['t45']);
			$dentalInfo['t45_4'] = getTeethPart4($result['t45']);
			$dentalInfo['t45_5'] = getTeethPart5($result['t45']);

			$dentalInfo['t44Code'] = getTreatmentCode($result['t44']);
			$dentalInfo['t44'] = getTreatment($result['t44']);
			$dentalInfo['t44_1'] = getTeethPart1($result['t44']);
			$dentalInfo['t44_2'] = getTeethPart2($result['t44']);
			$dentalInfo['t44_3'] = getTeethPart3($result['t44']);
			$dentalInfo['t44_4'] = getTeethPart4($result['t44']);
			$dentalInfo['t44_5'] = getTeethPart5($result['t44']);

			$dentalInfo['t43Code'] = getTreatmentCode($result['t43']);
			$dentalInfo['t43'] = getTreatment($result['t43']);
			$dentalInfo['t43_1'] = getTeethPart1($result['t43']);
			$dentalInfo['t43_2'] = getTeethPart2($result['t43']);
			$dentalInfo['t43_3'] = getTeethPart3($result['t43']);
			$dentalInfo['t43_4'] = getTeethPart4($result['t43']);
			$dentalInfo['t43_5'] = getTeethPart5($result['t43']);

			$dentalInfo['t42Code'] = getTreatmentCode($result['t42']);
			$dentalInfo['t42'] = getTreatment($result['t42']);
			$dentalInfo['t42_1'] = getTeethPart1($result['t42']);
			$dentalInfo['t42_2'] = getTeethPart2($result['t42']);
			$dentalInfo['t42_3'] = getTeethPart3($result['t42']);
			$dentalInfo['t42_4'] = getTeethPart4($result['t42']);
			$dentalInfo['t42_5'] = getTeethPart5($result['t42']);

			$dentalInfo['t41Code'] = getTreatmentCode($result['t41']);
			$dentalInfo['t41'] = getTreatment($result['t41']);
			$dentalInfo['t41_1'] = getTeethPart1($result['t41']);
			$dentalInfo['t41_2'] = getTeethPart2($result['t41']);
			$dentalInfo['t41_3'] = getTeethPart3($result['t41']);
			$dentalInfo['t41_4'] = getTeethPart4($result['t41']);
			$dentalInfo['t41_5'] = getTeethPart5($result['t41']);



			$this->dentalChart = $dentalInfo;
		}

		//return $this->rosterCount = $i;

	}

	public function dentalChart(){

		return $this->dentalChart;

	}


}

function getTreatment($data){

	$treatment = "";

	$treatmentCode = substr($data, 0, -6);

	if($treatmentCode == 11) $treatment = "A";
	else if($treatmentCode == 12) $treatment = "AP";
	else if($treatmentCode == 13) $treatment = "CA";
	else if($treatmentCode == 14) $treatment = "AP";
	else if($treatmentCode == 15) $treatment = "CD";
	else if($treatmentCode == 16) $treatment = "CO";
	else if($treatmentCode == 17) $treatment = "CP";
	else if($treatmentCode == 18) $treatment = "CT";
	else if($treatmentCode == 19) $treatment = "FL";
	else if($treatmentCode == 99) $treatment = "NONE";

	return $treatment;
}

function getTreatmentCode($data){

	return substr($data, 0, 2);

}

function getTeethPart1($data){

	return substr($data, 3, 1);

}

function getTeethPart2($data){

	return substr($data, 4, 1);
	
}

function getTeethPart3($data){

	return substr($data, 5, 1);
	
}

function getTeethPart4($data){

	return substr($data, 6, 1);
	
}

function getTeethPart5($data){

	return substr($data, 7, 1);
	
}


?>