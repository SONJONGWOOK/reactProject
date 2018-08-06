module.exports = {
    apps: [
        {
            // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
            "name": "index",
            // pm2로 실행될 파일 경로
            "script": "./build/index.js",
            "merge_logs"      : true,
            "out_file"        : "/hdd2/pm2log/index_out.log",
            "error_file"      : "/hdd2/pm2log/index_err.log",
            "log_date_format" : "YYYY-MM-DD HH:mm Z",
            // 개발환경시 적용될 설정 지정
            "env": {
                // "PORT": 3000,
                "NODE_ENV": "development"
            },
            // 배포환경시 적용될 설정 지정
            "env_production" : {
                "PORT": 8080,
                "NODE_ENV": "production"
            }
        }
    ]
};