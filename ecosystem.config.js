module.exports = {
    apps: [
        {
            
            "name": "index",
            "script": "./build/index.js",
            "merge_logs"      : true,
            "out_file"        : "/hdd2/pm2log/index_out.log",
            "error_file"      : "/hdd2/pm2log/index_err.log",
            "log_date_format" : "YYYY-MM-DD HH:mm Z",
            
            "env": {
            
                "NODE_ENV": "development"
            },
            
            "env_production" : {
                "PORT": 8080,
                "NODE_ENV": "production"
            }
        }
    ]
};