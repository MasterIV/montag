#!/usr/bin/php5
<?php

$dir = dirname( __FILE__ ).'/';

if( !preg_match( "/node ".addcslashes($dir, "/")."server.js/", `ps ax|grep server` ) ) {
	`node {$dir}server.js > {$dir}logs/nodejs.log &`;
}
