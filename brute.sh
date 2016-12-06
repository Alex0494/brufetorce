#!/bin/bash
while true 
do
	CURL='/usr/bin/curl'
	URL="http://localhost:3000/greet?name=foo"
	sleep 2
	echo $($CURL $URL)
done