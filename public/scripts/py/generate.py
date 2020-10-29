import cryptography
import sys 

key_name = sys.argv[1]

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=4096,
        backend=default_backend()
)
public_key = private_key.public_key()

#* Calculate Desktop path
import os
username = os.getlogin()
desktop_path = ('/Users/' + username + '/Desktop/')

#* Storing the keys
from cryptography.hazmat.primitives import serialization
pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
)
with open(desktop_path + key_name + '_private.pem', 'wb') as f:
    f.write(pem)

pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
)
with open(desktop_path +  key_name + '_public.pem', 'wb') as f:
    f.write(pem)