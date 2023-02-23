FROM node:18.14-alpine

WORKDIR /app

COPY package.json .

RUN npm i yarn

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]

#docker login
#docker build -t dagger1423/plainit:0.2 .    .은 현재 디렉토리의 도커파일로
#docker push dagger1423/plainit:0.2
#ssh -i ~~~~ aws ec2
#docker login
#docker pull dagger1423/plainit:0.2
#docker run -d -p 3000:3000