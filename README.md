# playwright

## 환경

* Visual Studio Code 이용 (Windows or WSL2)  

* Docker 기반은 WSL2 Ubuntu 환경에서 테스트  
  2022년3월 현재 playwright 버전은 Linux는 Ubuntu만 지원됨    
  Only Ubuntu 18.04 and Ubuntu 20.04 are officially supported.   

* e2e 테스트를 위한 프로젝트 생성  
`npm init playwright`  

* headless browser 사용을 위해 playwright 수동 설치  
`npm install playwright`  
`npx playwright install chromium`  

## 실행

* npm install을 통해서 의존성 업데이트

* static 서버 실행  
`node server`   

* playwright를 이용해서 static 서버로 부터 페이지를 로드하고 arjs 보고서 export  
`node index.js`  

* playwright를 이용해서 e2e 테스트  
`npx playwright test`  

## 실행 (Docker in WSL2)

* 컨테이너 실행 (static 서버 실행 포함)  
`docker-compose up -d`  

* arjs 보고서 export  
`docker -it 컨테이너아이디 bash`  

* 컨테이너 종료 및 삭제  
`docker-compose rm -fsv` 

## 참조

https://playwright.dev/docs/intro  
