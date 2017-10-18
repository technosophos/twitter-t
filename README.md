# Twitter-T: A Dockerized version of the t client

This is just support Dockerfile and information for the `t` Twitter client.

http://sferik.github.io/t/

## Credentials

To set up your credentials, go to http://apps.twitter.com and create a new app.

Next, you will want to generate some credentials for yourself.

```console
$ docker run -it technosophos/twitter-t /bin/bash
# t authorize
```

Follow the steps there. When that is done, running `# t whoami` should return... well... you.

At this point, if you revisit your apps.twitter.com page for the newly-registered
app, you will see:

- Consumer Key - $CONSUMER_KEY
- Consumer Secret - $CONSUMER_SECRET
- Owner - $OWNER
- Access Token - $ACCESS_TOKEN
- Access Token Secret -- $ACCESS_SECRET

All of those are (a) important, and (b) private. We will use them later.

## Generating a Credentials File

To generate a credentials file, copy this and replace all the $FOO stuff with
the values from above. Traditionally, the name of this file is `.trc`.

```yaml
---
configuration:
  default_profile:
  - $OWNER
  - $CONSUMER_KEY
profiles:
  $OWNER:
    $CONSUMER_KEY:
      username: $OWNER
      consumer_key: $CONSUMER_KEY
      consumer_secret: $CONSUMER_SECRET
      token: $ACCESS_TOKEN
      secret: $ACCESS_SECRET
```

> You can also generate this file by running `env2creds`, which is included in this GitHub repo.
> `env2creds` can be called from inside of the container as well, if you provide
> the necessary environment variables.

This file can now be mounted into the Docker container at `/root/.trc`. Now, in
future runs of the client you will not need to re-run `t autorize`.

```console
$ docker run -it --mount type=bind,source=$(pwd)/.trc,target=/root/.trc,readonly  technosophos/twitter-t /bin/bash
# t whoami
```

At this point, any typical `t` commands can be used inside of the container.
