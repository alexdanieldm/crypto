import cryptography
import sys 

#* Extract data from the arguments sent by pyshell
public_key_path = sys.argv[1]
input_file_path = sys.argv[2]
file_original_name = sys.argv[3]

#* Reading Public Key
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

with open(public_key_path, "rb") as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read(),
        backend=default_backend()
    )

#* Define file
f = open(input_file_path, 'rb')
input_file_content = f.read()
f.close()

#* Split the file name and file extension
import os
name_without_extension, extension_without_name = os.path.splitext(file_original_name)

#* Generate symmetric key
from cryptography.fernet import Fernet
key = Fernet.generate_key()
fernet_key = Fernet(key)

#* File content symmetric encryption
encrypted_file = fernet_key.encrypt(input_file_content)

#* Key asymmetric encryption
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

#* Make hybrid content
file_and_key = encrypted_key + encrypted_file

#* Calculate Desktop path
username = os.getlogin()
desktop_path = ('/Users/' + username + '/Desktop/')

#* Store encrypted content on a New file
final_path = desktop_path + name_without_extension + '-encrypted' + extension_without_name
f = open(final_path, 'wb')
f.write(file_and_key)
f.close()