FROM ruby:3.1.3-alpine3.17 as build

RUN apk add --no-cache build-base postgresql-dev
RUN gem install bundler --version 2.3

WORKDIR /app
COPY Gemfile Gemfile.lock ./

RUN bundle config set without development test
RUN bundle config set --local deployment true
RUN bundle install

COPY . .
ENV RAILS_ENV=production
ENTRYPOINT [ "bundle", "exec", "rake", "startup" ]
