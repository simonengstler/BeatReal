#!/bin/bash

# Define the name of the zip file
tarfile="private.tar"

# Define the directories to zip
directory="./private"

# Use the zip command to zip all files in the specified directories
tar -cf $tarfile $directory

tar_password=$1
if [ -z "$tar_password" ]
then
    echo "Enter password for zip file:"
    read -s tar_password
fi


echo $tar_password | gpg --batch --yes --passphrase-fd 0 -c $tarfile
