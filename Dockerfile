FROM ruby:2.4.2-stretch

RUN gem install t

CMD ["t", "whoami"]
