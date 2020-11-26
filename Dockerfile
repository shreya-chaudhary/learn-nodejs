FROM node:12.18-alpine3.9

RUN mkdir -p /service
#Setting the work dir
WORKDIR /service

#Copy json file to install the libraries
COPY . /service
#Install global packages and libraries for application

RUN npm install --no-optional

#Expose to the API port
EXPOSE 8000

#Starting the service
CMD export PORT=8000 && npm start