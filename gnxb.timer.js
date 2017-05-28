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
        diff: 1,
        interval: 1000,
        delay: 0,
        pad: { // If you want output as integer, set pad: false
            h: 2,
            m: 2,
            s: 2
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
    _.loop = function() {
        _.output.h = Math.floor(_._time / 3600);
        var h = _._time % 3600;
        _.output.m = Math.floor(h / 60);
        _.output.s = Math.floor(h % 60);

        if (_.pad) {
            for (var i in _.output) {
                _.output[i] = _.pad(_.output[i], _.pad[i]);
            }
        }

        _.callback(_.output);
        _._time += _.diff;

        if (!_.condition()) {
            _._time -= _.diff;
            _.event.stop(_._time);
            clearInterval(_._interval);
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
        _.loop();
    };



    /**
    * @function {stop}
    */
    _.stop = function() {
        _.event.stop(_._time);
        _._time = _.time;
        clearInterval(_._interval);
    };



    // Set method of on event
    _.on = function(event, _callback) {
        _.event[event] = _callback;
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

    _.pad = function(n, size) {
        n = n.toString();
        while (n.length < (size || 2)) {n = "0" + n;}
        return n;
    };




    _._setTime(_.time, 'time');
    _._time = _.time;
};