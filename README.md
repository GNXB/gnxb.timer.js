# gnxb.timer.js
Light-Weight Timer and switchable (based on timestamp)

# Quick Start
```javascript
var timer = new gnxb.timer("countdown", {
  time: 60, // In second
  callback: function(e) {
    $('#result').html('Time ' + e.h +':'+ e.m +':'+ e.s); // Not matter what framework you use
  }
});

timer.start();
```

# Key Features
- Light-Weight Timer Plugin with more features
- It can be a timer or countdown or both (It can switch mode while it's running)
- From above, that means you can use with sport activity (Ex. Be a timer to count how long you run from A to B and Be a countdown for coming back to A)
- No need pattern like `"#H:#M:#S", "%h%:%M%:%S%"`. No need to put DOM Element into the class. This class uses callback that you can manage how to use output by yourself.
- All variable, function, object is accessible, you can overwrite its value if you want it to work differently from my provided.
- Useful handle-event `on('stop', callback);` that helps about variable scope.

# Upcoming Features
- Millisecond (but not affect to performance if you set to use in second mode)
- Minus time (when time is less than zero, it still count in minus time)

# Documentation
Read how to use this class and APIs [click here](./DOCUMENT.md)
