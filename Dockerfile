FROM node:14.9
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install
 
EXPOSE 3000
 
CMD [ "npm", "run", "start" ]