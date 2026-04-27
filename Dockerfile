# 1. Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# [중요] deploy.yml의 --build-arg에서 넘겨주는 변수명을 선언합니다.
ARG REACT_APP_API_BASE_URL
# Vite는 보안상 VITE_로 시작하는 변수만 클라이언트 코드에 노출하므로 이름을 변환합니다.
ENV VITE_API_BASE_URL=$REACT_APP_API_BASE_URL

COPY package.json ./
RUN npm install
COPY . ./

# 빌드 시점에 ENV 값이 정적으로 파일에 심어집니다.
RUN npm run build

# 2. Production Stage (Nginx)
FROM nginx:alpine
# Vite의 기본 빌드 결과물 폴더인 dist를 복사합니다.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]