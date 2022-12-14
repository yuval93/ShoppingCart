class Config {
    port = 3001;
}

class DevelopmentConfig extends Config {
    mongoConnectionString = "mongodb://127.0.0.1:27017/shoppingCart";
    constructor() {
        super();
    }
}

const config = new DevelopmentConfig();

module.exports = config;    
