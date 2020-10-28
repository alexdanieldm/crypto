import cryptography
import sys 

private_key = sys.argv[1]
file = sys.argv[2]

#* Reading Private Key
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

private_key_path = private_key

with open(private_key_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )

#* Define file
file_path = file
f = open(file_path, 'rb')
file_content = f.read()
f.close()

#* File parameters
import os
file_name, file_extension = os.path.splitext(file_path)

#* Get symmetric key 
symmetric_key = file_content[0:512]

#* Get encripted file
encrypted_file = file_content[512:]

#* Asymmetric Decrypt key
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

key = private_key.decrypt(
        symmetric_key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
)

#* Decrypt file
from cryptography.fernet import Fernet
fernet_key = Fernet(key)
original_message = fernet_key.decrypt(encrypted_file)

#* Store Decrypted file
f = open(file_name + '-Decrypted' + file_extension, 'wb')
f.write(original_message)
f.close()