FROM ubuntu:20.04

# nodejs 설치
RUN apt-get update
RUN apt-get upgrade --yes 
RUN apt-get install curl --yes
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install nodejs --yes

# 소스 COPY
WORKDIR /home/exporter

COPY ./*.js ./
COPY ./package.json ./
COPY ./resources ./resources

# playwright 등 nodejs 의존성 설치
RUN npm install

# 웹브라우져 및 의존성 설치
RUN npx playwright install-deps

# static 리소스 서버 start
# api 필요 시 기능 추가해야 함
ENTRYPOINT node /home/exporter/server.js