# /app 을 application root 로 사용합니다.
WORKDIR /app

# copy . . 의미는 전체 프로젝트를 복사한다는 뜻이다.
COPY . .

# 의존성 설치 및 프로젝트 빌드
# 새로운 레이어 명령어 실행 및 새로운 이미지 생성..
# 보통 패키지 설치 등 사용된다.
RUN npm install && \
    npm run build

# port 3000
EXPOSE 3000

# default 명령어? 파라미터 설정
# docker run 실행시 커맨드 주지 않으면 default 명령이 실행된다.
# cmd 주용도는 컨테이너 실행할 때 사용할 default 설정하는것이다.
CMD node dist/src/main
