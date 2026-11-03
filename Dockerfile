FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY server.js ./
COPY data ./data
COPY public ./public
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
CMD ["node", "server.js"]
