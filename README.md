# BigChess

This project is a monorepo containing both the backend and frontend.

## Setup

to perform the project setup please execute this command in your terminal

```bash
yarn
```

# Backend Setup

## Requirements

- make sure you have docker installed.

## Steps

### Step 1
Make sure you have docker running. Execute this command in the backend folder to setup mongodb in docker

```bash
yarn db:start
```

verify that your docker container for mongodb is running correctly.

### Step 2
Next, make sure you add the following config to your hosts file

```
127.0.0.1  mongo0
127.0.0.1  mongo1
127.0.0.1  mongo2
```

this is to make sure you have access to mongodb locally.

if everything is good, you should be able to access your database using MongoDB compass.

### Step 3

generate certificates using the script `cert.generate.sh` in scripts folder.

### Step 4

verify that you can run the backend using the command

```bash
yarn dev
```

if all went well, you should have your backend server running correctly

