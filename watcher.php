<?php

$dir = dirname( __FILE__ ).'/';

$restart_node = true;

$sockets = array();
$folders = array();

$read = array();
$write = NULL;
$except = NULL;

function watch_dir( $dir ) {
	global $sockets, $folders;

	$inf = inotify_init();
	stream_set_blocking( $inf, 1 );
	inotify_add_watch( $inf, $dir, IN_MODIFY | IN_CREATE );

	$i = count( $sockets );
	$sockets[$i] = $inf;
	$folders[$i] = dirname( $dir );
}

watch_dir( $dir.'server' );
watch_dir( $dir.'server.js' );

do {
	sleep( 1 );

	foreach( $read as $inf ) {
		$changes = inotify_read( $inf );

		foreach( $changes as $change ) {
			$i = array_search( $inf, $sockets );
			$folder = $folders[$i];

			if( $change['mask'] & IN_ISDIR ) {
				$dirname = $folder . DIRECTORY_SEPARATOR . $change['name'];
				if( !in_array( $dirname, $folders )) watch_dir( $dirname );
			} else {
				$restart_node = true;
			}
		}
	}

	if( $restart_node ) {
		foreach( explode( "\n", `ps ax|grep server` ) as $line)
			if( preg_match( '/^\s*(\d+)\s.*server.js$/', $line, $proc )) `kill {$proc[1]}`;

		sleep( 1 );
		$restart_node = false;

		`node {$dir}server.js > {$dir}logs/nodejs.log &`;
		echo date( '[d.m.Y H:i:s] ')."Restarted nodejs\n";
	}

	$read = $sockets;
} while( stream_select( $read, $write, $except, NULL ));

