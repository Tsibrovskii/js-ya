module.exports = {
    sub: {},
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (!this.sub.hasOwnProperty(event)) {
            this.sub[event] = [];
        }
        this.sub[event].push({subscriberObj: subscriber, callBack: handler});
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        for (var i = 0; i < Object.keys(this.sub).length; i++) {
            var prop = Object.keys(this.sub)[i];
            if (prop === event) {
                var resArray = [];
                for(var j = 0; j < this.sub[prop].length; j++) {
                    if (subscriber !== this.sub[prop][j].subscriberObj) {
                        resArray.push(this.sub[prop][j]);
                    }
                }
                this.sub[prop] = resArray;
            }
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        for (var i = 0; i < Object.keys(this.sub).length; i++) {
            var prop = Object.keys(this.sub)[i];
            if (prop === event) {
                for(var j = 0; j < this.sub[prop].length; j++) {
                    this.sub[prop][j].callBack.call(this.sub[prop][j].subscriberObj);
                }
            }
        }
        return this;
    }
};
