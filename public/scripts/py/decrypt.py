import cryptography
import sys 

#* Extract data from the arguments sent by pyshell
private_key_path = sys.argv[1]
input_file_path = sys.argv[2]
file_original_name = sys.argv[3]
destination_path = sys.argv[4]

#* Reading Private Key
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

with open(private_key_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )

#* Define file
f = open(input_file_path, 'rb')
input_file_content = f.read()
f.close()

#* Split the file name and file extension
import os
name_without_extension, file_extension = os.path.splitext(file_original_name)

#* Get symmetric key 
symmetric_key = input_file_content[0:512]

#* Get encripted file
encrypted_file = input_file_content[512:]

#* Asymmetric Decrypt key
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

final_key = private_key.decrypt(
        symmetric_key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
)

#* Decrypt file
from cryptography.fernet import Fernet
fernet_with_key = Fernet(final_key)
original_content = fernet_with_key.decrypt(encrypted_file)

#* Calculate Desktop path
username = os.getlogin()
desktop_path = ('/Users/' + username + '/Desktop/')

#* Store Decrypted file
result_path = destination_path+ '/' + name_without_extension + '-desencriptado' + file_extension
f = open(result_path, 'wb')
f.write(original_content)
f.close()