FROM node:18.14-alpine 
#FROM을 통해 base image를 만든다. node는 이미지 지원. 뒤의 숫자는 버전. alpine은 작은 단위의 리눅스 명시 

WORKDIR /app
#WORKDIR은 cd를 의미. /app 디렉토리로 이미지를 복사해올 것을 지정

COPY package.json .
#COPY를 통해 /app에 파일을 복사한다. 빈번이 작성되는 것을 후순위에서 복사한다. package.json을 먼저 복사하도록 하자
#COPY package.json package-lock.json ./

# RUN npm install -g npm@9.6
RUN npm install yarn --legacy-peer-deps \
yarn install
#yarn이 아니라 기본 npm이었으면 이 시점에서 npm install 실행. yarn을 쓸 때는 우선적으로 yarn을 다운받아야 한다.
#npm7 버전부터 peerDependencies를 자동으로 설치하게 되는데, 이때 이미 설치되어 있는 의존성과 동일하지만 버전이 다른 peerDependencies가 존재하고 있으면 충돌이 발생한다.
#--legacy-peer-deps를 통해 peerDependencies를 무시하고 설치하도록 한다.

COPY . .
#소스파일들을 복사한다. 첫 번째 인자로 복사할 파일들 지정, 두 번째 인자로 복사위치 지정. 여기서는 모든 파일들을 WORKDIR로 복사. 

RUN yarn build

CMD [ "yarn", "start" ]

#docker login
#docker build -t kimhyunyul/planit:0.4 .    .은 현재 디렉토리의 도커파일로
#docker push kimhyunyul/planit:0.4
#ssh -i side-project.pem ubuntu@3.34.12.188
#docker login
#다른 사람이 도커 로그인 되어있을 경우 docker logout 후 내 계정으로 로그인
#docker pull kimhyunyul/planit:0.4
#docker ps -a 로 돌아가고 있는 컨테이너가 예전 버전 이미지면 지우고 새로운 이미지 docker run
#docker run -d -p 3000:3000 --name planit-front  kimhyunyul/planit:0.4