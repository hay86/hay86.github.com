<?php
/**
 * Combine.php - Script for combining .js and .css files
 *
 * Copyright (c) 2011 Kaifeng Xu - xukaifeng1986(at)gmail(dot)com | http://kfun.me
 * Dual licensed under MIT and GPL.
 * Date: 12/27/2011
 * @author: Kaifeng Xu
 * @version: 0.0.1
 *
 * http://project.kfun.me
 */
 
$type = $_GET['type'];
$src = $_GET['src'];

if($type == 'js')
	header("Content-type: application/x-javascript");
else if($type == 'css')
	header("Content-type: text/css");

$files = explode(';', $src);

foreach($files as $file)
{
	$str = file_get_contents($type.'/'.$file);
	echo $str;
}

?>