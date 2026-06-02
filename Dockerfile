FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

EXPOSE 5300

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5300"]