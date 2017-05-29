/**
  * [class]
  * GNXB 2017 All Right Reserved
  * Author: Apiwith Potisuk (po.apiwith@gmail.com)
  * Version: 1.0.0
*/

// Check for Namespace
if (!gnxb) var gnxb = {};


/**
* @class {gnxb.timer}
* @param  {String} mode    {possible value is "timer" and "countdown"}
* @param  {Object} options {arguements will contain object like _.default}
*/
gnxb.timer = function(mode, options) {
    var _ = this;

    _.default = {
        time: 60,
        endTime: false,
        callback: function(e) { console.log(e.h+":"+e.m+":"+e.s); },
        key: "hms",
        diff: 1,
        interval: 1000,
        delay: 0,
        pad: { // If you want output as integer, set pad: false
            Y: 1, M: 1, D: 1,
            h: 2, m: 2, s: 2
        }
    };


    // Move all constructor attributes (options) to be class attributes and accessible
    // If an attribute does not exist, it will be replaced by default
    for (var i in _.default) {
        _[i] = (options[i]) ? options[i] : _.default[i];
    }


    // #
    // ##
    // ### Prepare Section ###

    _._key = { Y:false, M:false, D:false, h: false, m: false, s:false };
    _.mode = mode;
    _.options = options;
    _._interval;
    _.output = {};

    _.condition = function() {
        return _._time >= 0 && ((!_.endTime) ? true : _._time <= _.endTime);
    }

    // If mode is countdown
    if (_.mode == "countdown") {
        _.diff *= -1;
    }

    // Reduce creating empty function object several time
    // by creating one and passed by object
    _.func = function() {};
    // Predefine event function to use with _.on('event name', callback)
    _.event = {
        continue: _.func,
        pause: _.func,
        reset: _.func,
        start: _.func,
        stop: _.func,
        setMode: _.func,
        setTime: _.func,
        setEndTime: _.func
    };

    // ### End of Prepare Section ###
    // ##
    // #




    /**
    * @function {loop}
    * @callback {Object} {Object of h,m,s}
    */
    var r;
    _.display = function() {
        r = _._time;
        if (_._key.Y) { _.output.Y = Math.floor(r / 31104000); _._pad('Y'); r %= 31104000; }
        if (_._key.M) { _.output.M = Math.floor(r / 2592000); _._pad('M'); r %= 2592000; }
        if (_._key.D) { _.output.D = Math.floor(r / 86400); _._pad('D'); r %= 86400; }
        if (_._key.h) { _.output.h = Math.floor(r / 3600); _._pad('h'); r %= 3600; }
        if (_._key.m) { _.output.m = Math.floor(r / 60); _._pad('m'); r %= 60; }
        if (_._key.s) { _.output.s = r; _._pad('s'); }

        _.callback(_.output);
    }

    _.loop = function() {
        _.display();
        _._time += _.diff;

        if (!_.condition()) {
            _.stop();
        }
    }




    /**
    * @function {start}
    * @param  {Number} time {does not require}
    */
    _.start = function(time) {
        _.event.start(time);
        if (time) {
            _.setTime(time);
        }

        setTimeout(function() {
            _._interval = setInterval(_.loop, _.interval);
            _.loop();
        }, _.delay);
    };



    /**
    * @function {pause}
    */
    _.pause = function() {
        _.event.pause(_._time);
        clearInterval(_._interval);
    };



    /**
    * @function {continue}
    * @param  {Number} time {does not require}
    */
    _.continue = function(time) {
        _.event.continue(_._time);
        if (time) {
            _._setTime(time, '_time');
        }
        _._interval = setInterval(_.loop, _.interval);
        _.loop();
    };



    /**
    * @function {reset}
    * @param  {Number} time {does not require}
    */
    _.reset = function(time) {
        _.event.reset(_._time);
        if (time) {
            _._setTime(time, '_time');
        } else {
            _._time = _.time;
        }
        _.display();
    };



    /**
    * @function {stop}
    */
    _.stop = function() {
        _.event.stop(_._time);
        _._time = _.time;
        _.display();
        clearInterval(_._interval);
    };



    // Set method of on event
    _.on = function(event, _callback) {
        _.event[event] = _callback;
    };


    _.setKey = function(key) {
        // Clear attribute
        _.output = {};
        for (var i in _._key) {
            if (_.key.indexOf(i) > -1) {
                _._key[i] = true;
            }
        }
    };
 

    _.setMode = function(mode) {
        _.mode = mode;
        _.event.setMode(mode);
        switch(mode) {
            case "timer": _.diff = Math.abs(_.diff); break;
            case "countdown": _.diff = Math.abs(_.diff) * -1; break;
        }
    };


    _._setTime = function(time, attr) {
        switch (typeof time) {
            case 'number':
            case 'string': _[attr] = parseInt(time);
                break;
            case 'object':
                if (time instanceof Date) {
                    _[attr] = Math.round(time.getTime() / 1000);
                    break;
                }
            default: console.error('[gnxb.timer]: Unknow datatype of time');
        }
    };

    _.setTime = function(time) {
        _.event.setTime(_.time);
        _._setTime(time, 'time');
    };

    _.setEndTime = function(time) {
        _.event.setEndTime(_._time);
        _._setTime(time, 'endTime');
    };

    _._pad = function(index) {
        if (_.pad[index] > 1) {
            var n = _.output[index].toString();
            while (n.length < (_.pad[index] || 2)) {n = "0" + n;}
            _.output[index] = n;
        }
    };




    _._setTime(_.time, 'time');
    _._time = _.time;
    _.setKey(_.key);
};