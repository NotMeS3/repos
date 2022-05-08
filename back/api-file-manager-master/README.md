
# Api to simple file manager

## Project setup
```
npm install
```

### Command to run project
```
npm run api
```

### Directory with all files
```
./_FILES_/
```
<hr>

# Routes

### get all files from directory
```
http://127.0.0.1:5000/api/v1/files/all?q=/

q -> dir
method -> GET
```

### create new directory
```
http://127.0.0.1:5000/api/v1/files/create/dir

method -> POST
body: {
    "dir":"/"
}

```

### upload file from form

```
http://127.0.0.1:5000/api/v1/files/upload

method -> POST
body: {
    "dir":"/"
}

name of file with input is "file"
```

### delete object

```
http://127.0.0.1:5000/api/v1/files/delete

method -> DELETE
body: {
    "item":"/"
}

```
<hr>

# HTTP answers

### create new directory
```
400 - Invalid request
201 - Created
200 - OK
```

=======
# Api to simple file manager

## Project setup
```
npm install
```

### Command to run project
```
npm run api
```

### Directory with all files
```
./_FILES_/
```
<hr>

# Routes

### get all files from directory
```
http://127.0.0.1:5000/api/v1/files/all?q=/

q -> dir
method -> GET
```

### create new directory
```
http://127.0.0.1:5000/api/v1/files/create/dir

method -> POST
body: {
    "dir":"/"
}

```

### upload file from form

```
http://127.0.0.1:5000/api/v1/files/upload

method -> POST
body: {
    "dir":"/"
}

name of file with input is "file"
```
<hr>

# HTTP answers

### create new directory
```
400 - Invalid request
201 - Created
200 - OK
```

>>>>>>> e6f0fc54fc0457c39e8a7b9cd43bd65a664d0be7
