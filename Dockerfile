# 1. Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# deploy.yml에서 넘겨주는 ARG를 정의합니다.
ARG REACT_APP_API_BASE_URL
# CRA 빌드 스크립트가 인식할 수 있도록 환경 변수로 설정합니다.
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

COPY package.json ./
# 의존성 설치
RUN npm install
COPY . ./

# [중요] CRA 빌드 실행 (결과물은 /app/build 폴더에 생깁니다)
RUN npm run build

# 2. Production Stage (Nginx)
FROM nginx:alpine
# [수정] dist가 아니라 build 폴더를 복사합니다.
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]