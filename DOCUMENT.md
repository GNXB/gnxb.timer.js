# Get Started
```javascript
// Here is all option and its default value
var timer = new gnxb.timer("timer", {
    time: 60, // can be Number or String Number
    endTime: false, // Only uses in "timer" mode, when you want class to end at a time
    callback: function(e) { console.log(e.h+":"+e.m+":"+e.s); },
    diff: 1, // In second(s)
    interval: 1000, // In millisecond(s)
    delay: 0, // In millisecond(s)
    pad: { // If you want output as integer, set pad: false
        h: 2,
        m: 2,
        s: 2
    }
});
```

If you want to use this class as countdown just set first constructor arguement to `"countdown"`
```javascript
var timer = new gnxb.timer("countdown", { /* options go here */ });
```

# Callback
Callback function will be called every `interval` you set.
There is only one `Object` argument that contains `.h` `.m` `.s`
```javascript
callback: function(e) { console.log(e.h+":"+e.m+":"+e.s); },
```

# Key Methods
- [`.start()`](https://github.com/GNXB/gnxb.timer.js#start)
- [`.pause()`](https://github.com/GNXB/gnxb.timer.js#pause)
- [`.continue()`](https://github.com/GNXB/gnxb.timer.js#continue)
- [`.stop()`](https://github.com/GNXB/gnxb.timer.js#stop)

## `.start()`
To start from time that set in options
## `.start(time)`
To start from a time you want

## `.pause()`

## `.continue()`
To continue from current time
## `.continue(time)`
To continue from a time you want

## `.reset()`
To reset time to time that set in options
## `.reset(time)`
To reset time to a time you want (you can use this method to sync time from server like the following script)
```javascript
$.post('/path/to/backend.file', function(res) {
    timer.reset(res.time);
});
```

## `.stop()`

# Set Method
- [`.setMode(mode)`](https://github.com/GNXB/gnxb.timer.js#setmodemode)
- [`.setTime(time)`](https://github.com/GNXB/gnxb.timer.js#settimetime)
- [`.setEndTime(time)`](https://github.com/GNXB/gnxb.timer.js#setendtimetime)

## `.setMode(mode)`
`mode` in `String` type with two possible value `"timer"` and `"countdown"` Then it will change mode instantly.

## `.setTime(time)`
Instead of setting `.time = // your number goes here` directly, using this function will be parse  
String Number or Number to Number automatically
***REMEMBER*** If you want to set running time, use `.reset(time)`. This function just set default time and it will be seen
when you do `.start()`, `.reset()` and `.continue()` again.

## `.setEndTime(time)`
`time` can be String Number or Number
