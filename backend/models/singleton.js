class Singleton{
    constructor() {
        if (this.constructor === Singleton) {
          throw new Error('Abstract class cannot be instantiated.');
        }
    }
    static getInstance(){
        if (!this.instance) {
            this.instance = new this();
          }
        return this.instance;
    }
}
module.exports = Singleton;