#!/bin/bash

# Define the name of the encrypted file
encrypted_file="private.tar.gpg"

# Define the name of the decrypted file
decrypted_file="private.tar"

tar_password=$1
if [ -z "$tar_password" ]; then
    echo "Enter password for zip file:"
    read -s tar_password
fi

echo $tar_password | gpg --batch --quiet --yes --passphrase-fd 0 -d $encrypted_file >$decrypted_file

tar -xf $decrypted_file
