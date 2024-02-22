# JS CLI Prototype

## Running locally

```console
# Deinfed in .too-version
$ node -v
v20.11.1

# Defined in package.json
$ npm -v
10.4.0

$ node index.js
starting
this line goes to stderr
since: 2024-01-01
until: 2024-12-31
workspace: 123456789
workspace is an odd number

# Passing arguments as environment variables
$ WORKSPACE=999 SINCE=1999-12-31 node index.js
starting
this line goes to stderr
since: 1999-12-31
until: 2024-12-31
workspace: NaN
--workspace is not an integer
$ echo $?
0

# Exit non-zero when errored
$ WORKSPACE=not-an-integer SINCE=1999-12-31 node index.js
starting
this line goes to stderr
since: 1999-12-31
until: 2024-12-31
workspace: NaN
--workspace is not an integer
$ echo $?
1

# Print to stdout and stderr
$ WORKSPACE=not-an-integer node index.js > stdout.log 2> stderr.log
$ cat stdout.log
starting
since: 2024-01-01
until: 2024-12-31
workspace: NaN
$ cat stderr.log
this line goes to stderr
--workspace is not an integer
```

## Docker

### Local

```console
$ docker --version
Docker version 25.0.3, build 4debf41

$ docker build . -t my-local-js-cli-prototype

$ docker run --rm -e WORKSPACE=123 -e SINCE=1999-12-31 my-local-js-cli-prototype

starting
this line goes to stderr
since: 1999-12-31
until: 2024-12-31
workspace: 123
workspace is an odd number
```

### Remote

Build, push and signed via GitHub Action. See [.github/workflows/release.yml](.github/workflows/release.yml).

```console
# Verify the container
$ docker run --rm -it gcr.io/projectsigstore/cosign verify \
--certificate-identity-regexp='https://github.com/tangrufus/js-cli-protptype/.github/workflows/.*@refs/.*' \
--certificate-oidc-issuer='https://token.actions.githubusercontent.com' \
--output=text \
ghcr.io/tangrufus/js-cli-protptype:latest

Verification for ghcr.io/tangrufus/js-cli-protptype:latest --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The code-signing certificate was verified using trusted certificate authority certificates
Certificate subject: https://github.com/tangrufus/js-cli-protptype/.github/workflows/release.yml@refs/tags/0.0.14
Certificate issuer URL: https://token.actions.githubusercontent.com
GitHub Workflow Trigger: push
GitHub Workflow SHA: 79a2ba03ad1b5a470303921545146d5ebfa76c0c
GitHub Workflow Name: Release
GitHub Workflow Repository: tangrufus/js-cli-protptype
GitHub Workflow Ref: refs/tags/0.0.14
{"critical":{"identity":{"docker-reference":"ghcr.io/tangrufus/js-cli-protptype"},"image":{"docker-manifest-digest":"sha256:fdb5296c7aedb77672d4a4e9ab74b11253f73e7a68d792528ac0ae19356ae313"},"type":"cosign container image signature"},"optional":null}

# Run from docker
$ docker run --rm -e WORKSPACE=123 -e SINCE=1999-12-31 ghcr.io/tangrufus/js-cli-protptype:latest
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
starting
this line goes to stderr
since: 1999-12-31
until: 2024-12-31
workspace: 123
workspace is an odd number
```
