# Todo App

## Create Certificate

On MacOS

```
openssl req -newkey rsa:2048 -x509 -nodes -keyout key.pem -out cert.pem -subj /CN=localhost -reqexts SAN -extensions SAN -config <(cat /System/Library/OpenSSL/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:localhost')) -days 365
```

```
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
 -keyout key.pem -out cert.pem -extensions san -config \
 <(echo "[req]";
echo distinguished_name=req;
echo "[san]";
echo subjectAltName=DNS:localhost
) \
 -subj /CN=localhost
```

serve the frontend via `yarn serve`

use https://localhost:8080 to access the app
