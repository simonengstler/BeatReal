#!/bin/bash

# Define the name of the zip file
tarfile="private.tar"

# Define the directories to zip
directory="./private"

# Use the zip command to zip all files in the specified directories
tar -cf $tarfile $directory

echo "Enter password for zip file:"
read -s tar_password
echo $tar_password | gpg --batch --yes --passphrase-fd 0 -c $tarfile
