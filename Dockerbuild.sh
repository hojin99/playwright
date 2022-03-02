#!/bin/sh

# 변수선언
_image_name="arjsexporter_apiserver" 

echo _image_name = "${_image_name}"

# docker build
docker build --network=host -t "${_image_name}" .

docker image prune -f