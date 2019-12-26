# Todo App

## Create Certificate

On MacOS

```
openssl req -newkey rsa:2048 -x509 -nodes -keyout key.pem -out cert.pem -subj /CN=localhost -reqexts SAN -extensions SAN -config <(cat /System/Library/OpenSSL/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:localhost')) -days 365
```
