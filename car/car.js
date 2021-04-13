// Build a Car class!
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.odometer = 0;
    }

    drive(...legs) {
        const distance = legs.reduce((acc, leg) => acc + leg);

        this.odometer += distance;
        return distance;
    }

    // The delay should be a function of the speed and the distance. 
    //
    // If the speed represents "miles per hour", what if the speed is 60, and
    // the distance is 120? Do we really want to have the app wait for 2 hours
    // before it returns?
    // 
    // Even with smaller values, the testing time can be prohibitive. What if
    // the speed is 5, and the distance is 5? That would be an hour. What if the
    // speed is 120 and the distance is 5? That's still 2.5 minutes of waiting
    // just for the test to finish. 
    //
    // To make it testable, we should allow the function to receive very small
    // values. Perhaps the speed parameter should represent miles/millisecond?
    // 
    // Then, to represent 60 mph, you would need to pass in (60/360,000), or
    // 1/6000. 
    // 
    // On the flip side, passing in 60 would allow you to return from the
    // function after 1 millisecond, something much more manageable from a
    // testing point of view. 
    // 
    // Note that you would need to test values like 60 mph, but that wouldn't
    // necessarily need to be a unit test. It could be a functional test that is
    // run less often. 
    // 
    // One thing I will note here, however... if you pick a "miles per
    // millisecond" metric, you will find reasonable values difficult to test.
    delayedDrive(speed, ...legs) {

        const distance = legs.reduce((acc, leg) => acc + leg);
        // speed = distance / time.
        // time = distance / speed.
        // If the speed is in mph, and our waitValue must be in milliseconds
        // (for the setTimeout() function call), then... 
        // waitValue = (distance/speed) * 3600 * 1000 (because there are 3600
        // seconds in an hour, and 1000 milliseconds in a second);
        const waitValue = (distance / speed) * 3600 * 1000;

        // If we want this function to return in a reasonable time -- say, < 4
        // seconds -- we need to pass in a distance/speed ratio of 4/3,600,000, 
        // or 1/900,000. Our distance should be 1 mile, with a speed of 900 mph.
        // Or a distance of 100 miles, with a speed of 90,000,000 mph.

        // a later functional test can test more reasonable values, if desired.

        const returnValue = new Promise((resolve) => {
            setTimeout(() => {
                // set the odometer
                this.odometer += distance;
                resolve(distance);
            }, waitValue);
        });

        return returnValue;
    }
}

module.exports = Car;