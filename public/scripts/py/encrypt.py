import cryptography
import sys 

public_key_path = sys.argv[1]
input_file_path = sys.argv[2]

#* Reading Public Key
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

with open(public_key_path, "rb") as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read(),
        backend=default_backend()
    )

#* Define file
f = open(file_path, 'rb')
input_file_content = f.read()
f.close()

#* File parameters
import os
file_path_without_extension, file_extension = os.path.splitext(input_file_path)

#* Generate symmetric key
from cryptography.fernet import Fernet
key = Fernet.generate_key()
fernet_key = Fernet(key)

#* Symmetric encrypt file
encrypted_file = fernet_key.encrypt(input_file_content)

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
file_and_key = encrypted_key + encrypted_file

#* Store Encrypted file
result_file_path = file_path_without_extension + '-encrypted' + file_extension
f = open(result_file_path, 'wb')
f.write(file_and_key)
f.close()

# Print the output file path
print(result_file_path)