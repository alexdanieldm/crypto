import cryptography
import sys

#* Reading Public Key
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

public_key_path = input("Enter your public key: ")

with open(public_key_path, "rb") as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read(),
        backend=default_backend()
    )

#* Define file
file_path = input("Enter your file: ")
f = open(file_path, 'rb')
file_content = f.read()
f.close()

#* File parameters
import os
file_name, file_extension = os.path.splitext(file_path)

#* Generate symmetric key
from cryptography.fernet import Fernet
key = Fernet.generate_key()
fernet_key = Fernet(key)

#* Symmetric encrypt file
encrypted_file = fernet_key.encrypt(file_content)

#* Asymmetric encrypt Key
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

encrypted_key = public_key.encrypt(
    key,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

#* Hybrid file
file_and_key =encrypted_key + encrypted_file

#* Store Encrypted file
f = open(file_name + '-Encrypted' + file_extension, 'wb')
f.write(file_and_key)
f.close()