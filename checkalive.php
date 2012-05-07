#!/usr/bin/php5
<?php

$alive = false;

foreach( explode( "\n", `ps ax|grep "ndoe server"` ) as $line)
	if( preg_match( '/^\s*(\d+)\s.* node server.js$/', $line, $proc ))
		$alive = true;;

if( !$alive ) {
	`node server.js > logs/nodejs.log &`;
}
