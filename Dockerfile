FROM ruby:2.4.2-stretch

RUN gem install t

COPY ./env2creds /usr/local/bin/env2creds

CMD ["t", "whoami"]
