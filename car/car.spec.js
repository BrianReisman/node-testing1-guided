//----------------------------------------------------------------------------//
// The following is an import of a NodeJS "performance hook", which we use to
// run a performance test at the end of this file. It allows us to see the
// amount of time elapsed since the program started running, in fractional
// milliseconds. 
//----------------------------------------------------------------------------//
const { performance } = require('perf_hooks');

//----------------------------------------------------------------------------//
// Jest is the unit testing framework maintained by Facebook.
//
// Unit testing is a type of testing that ensures that small units of
// functionality in a project are maintained. Unit tests are written in code
// (usually the same language as the system being tested.) 
//
// It is not uncommon for a decent-sized system to have many thousands of unit
// tests.
//
// With Jest, unit tests are written as JavaScript or TypeScript files that call
// "global" methods in the Jest library. However, rather than running Jest tests
// through Node.js, you execute the Jest framework. Because of this, you don't
// need to import the Jest module. 
//
// When Jest is executed, it searches the project directory structure for files
// that contain test functions, loads them, and executes the test functions.
// Because Jest is executing the test code, the Jest library is already
// available. The test code is brought into the Jest environment (not the other
// way around.) 
//
// Jest can be started in "watch" mode with the "--watch" or "--watchAll"
// command line parameter. See the "test" script definition in ./package.json,
// and the following URL, for more informatino:
// 
//      https://jestjs.io/docs/en/cli#--watch 
// 
// (Note that the "--watch" parameter will detect which specific files have
// changed, using git, and will only re-run tests related to the files that have
// changed, while "--watchAll" will re-run ALL tests when ANY file is changed.
// Because of this, --watch can only be used with projects that are hosted in a
// git repo. Note also that there is a third option: --watchman. This allows
// Jest to work with the "watchman" file watcher service, which is maintained by
// Facebook. See https://facebook.github.io/watchman/).
// 
// Each file that contains one or more defined Jest test is called a "suite". 
// 
// This suite is testing functionality found in ./car/car.js. Because of
// this, we need to import ./car/car.js, so we can call the functions we are
// testing. 
//----------------------------------------------------------------------------//
const Car = require('./car.js');

//----------------------------------------------------------------------------//
// Jest provides a number of "global" functions. 
// 
// One of the global functions is "describe". The describe function allows you
// to create "blocks" of tests that are related, and provide a descriptive name
// or phrase to them. This is helpful, because if/when a test fails, the
// name of the descriptive block it is in is displayed along with the failure
// message. This makes it easy to track down failed tests (very handy when you
// have many thousands of them, possibly within a single suite.) In addition, it
// provides a simple way to organize your tests. 
// 
// Describe blocks can be nested. See here for info on describe: 
//      
//              https://jestjs.io/docs/en/api#describename-fn 
// 
//----------------------------------------------------------------------------//

describe('intro to unit testing', () => {

    test('that adding two numbers equals the sum', () => {
        expect(2 + 2).toBe(4);
    });

    it('should add 2 numbers', () => {
        expect(2 + 2).toBe(4);
    });
})


describe('car class', () => {

    let prius;
    let make = 'toyota';
    let model = 'prius'

    // There are a variety of globals that allow you to take steps before all
    // tests are run, and before each test is run, allowing you to centralize
    // setup of each test. In this case, we create a "prius" instance of the Car
    // class before each test. This ensures that each test gets a clean copy of
    // the instance, without any "cruft" or "artifacts" left over after previous
    // tests have finished. 
    // 
    // In a similar way, you can run a method *after* each test, to tear down
    // any setup you had to do for the test (if necessary), etc. 
    beforeEach(() => {
        prius = new Car(make, model);
    });

    // The unit test consists of a descriptive name or phrase, a function
    // that contains the expectations to test, and an optional third
    // argument that specifies a timeout (we will learn about that in the
    // next lecture... fun fact, the default timeout is 5 secnods, and if
    // the test is not completed in that time frame, it is aborted, and
    // considered to have failed.) 
    //
    // Each test should only test one thing (but possibly different aspects
    // of that one thing.)
    //
    // This test checks that the Car class exists after our import of car.js.
    //
    // The it() and test() alias' allows you to write tests that read a
    // little more naturally (such as it('should return the sum of 2
    // numbers'), or test('that it returns the sum of 2 numbers'), etc.)
    test('that car class exists', () => {
        // inside the test, the expect() global is used to "assert"
        // something about a value. Values can represent the return value of
        // a function, or a system "state" value that changes as the system
        // operates. Almost always, a call to expect() is chained with a
        // call to a "matcher". The parameter to expect() generates or
        // contains the value to be tested, and the matcher tests it. 
        // 
        // Here, the "toBeDefined()" matcher is used to assert that the value
        // passed to expect() is defined. 
        // 
        // There are many matchers. See https://jestjs.io/docs/en/expect. 
        // 
        // Some of the member methods of "expect" are used as parameters to
        // matchers, for convenience. For example,
        // expect.stringContaining(stringParam) can be used to match any string
        // that contains stringParam: 
        // 
        //      expect(myFn()).toBe(expect.stringContaining('hello'))
        // 
        // ... would match 'hello world', 'hello kitty', 'i said hello',
        // etc. If the return value from myFn() contains 'hello', it would
        // match. 
        // 
        expect(Car).toBeDefined();
    })

    it('makes instances of Cars', () => {
        expect(prius).toBeInstanceOf(Car);
    })

    test('cars have a "make" property', () => {
        // simple matcher to ensure the property exists
        expect(prius).toHaveProperty('make');
        // this matcher also allows us to check the value of the field.
        expect(prius).toHaveProperty('make', make);
    });

    // RED-GREEN-REFACTOR - this is the pattern for Test Driven Development
    // (aka TDD). In TDD, the tests for a section of functionality to be
    // tested are written *first*. When they are written, they are run, to
    // confirm that they fail. The tests are now RED. 
    // 
    // Then, just enough code is written to make the tests pass. When the
    // tests are passing, they are now GREEN. 
    // 
    // Once tests are passing, THEN the code can be modified to make it more
    // efficient, effective, performant, etc. This is known as REFACTORing
    // the code. 
    // 
    // See https://martinfowler.com/bliki/TestDrivenDevelopment.html 
    //
    test('cars have a model property', () => {
        expect(prius).toHaveProperty('model', model);
    });

    test('cars have the make and model passed', () => {
        expect(prius).toMatchObject(
            { make, model }
        );
    });

    test('new cars have odometer set to 0', () => {
        expect(prius.odometer).toBe(0);
    })

    test('cars have a "drive()" method', () => {
        expect(prius.drive).toBeDefined();
        expect(prius.drive).toBeTruthy();
        expect(prius.drive).toBeInstanceOf(Function);
        expect(prius.drive).toBe(Car.prototype.drive);
    });

    test('drive() returns the driven distance', () => {
        expect(prius.drive(5)).toBe(5);
        expect(prius.drive(0)).toBe(0);
        expect(prius.drive(10)).toBe(10);
    });

    test('drive() increases the odometer by distance', () => {
        prius.drive(5);
        expect(prius.odometer).toBe(5);
        prius.drive(6);
        expect(prius.odometer).toBe(11);
        prius.drive(9);
        expect(prius.odometer).toBe(20);
    });

    test('drive supports comma-separated legs', () => {
        expect(prius.drive(1, 2, 3)).toBe(6);
        expect(prius.drive(4, 5, 6)).toBe(15);
        expect(prius.odometer).toBe(21);
    })

    // Suppose the product owner asks for a promise-based method that takes a
    // "speed" parameter, and a list of "leg" distances. The function should
    // wait an appropriate amount of time before returning, based on the speed. 
    // 
    // We can start thinking about ways to test this type of method... but
    // before we even begin, we can create a placeholder for the test using
    // .todo(). The .todo() method just defines a test name, but no function for
    // matchers/expect(). To-do test items show up in the Jest output as a
    // reminder that there are tests that are identified, but not yet
    // implemented. 
    // 
    // How would you implement this test? Hint: you might look at the Node.js
    // Performance Hooks, as well as the setTimeout() method, to be used in
    // Car.prototype.delayedDrive().
    test('delayedDrive() delays the appropriate time before returning', () => {
        // If the function actually runs on MPH and Miles, we can specify values
        // that will return in less than 5 seconds. 
        const speed = 1000;
        // this must be an array because we use the reduce function to calculate
        // the actual total distance (for use in calculating the expected
        // runtime), and we use the spread operator to pass the values into the
        // function (as the function doesn't take an array ... it takes a
        // comma-separated list of values.);
        const legValues = [1, 2, 3];
        const distance = legValues.reduce((acc, leg) => acc + leg);
        const maxMsOverage = 25;

        // Hint: we had to make the .delayedDrive() method take parameters that
        // allowed us to have sane tests. If it only took MPH within realistic
        // limits, or distances within realistic limits, our test could take
        // many minutes, if not hours, to execute. For example, a speed of 80mph
        // and a total distance of only 25 miles would take 20 minutes to
        // complete (if the .delayedDrive() function runs in real-time.)
        // 
        // By allowign .delayedDrive() to work with any number, we can verify
        // its function more reasonably. For example, a speed of 1000 MPH and a
        // distance of 1 mile should only take ~3.6 seconds to run. 

        const start = performance.now();
        return prius.delayedDrive(speed, ...legValues)
            .then(() => {
                const end = performance.now();

                let actual = end - start;
                let exactExpected = (distance / speed) * 3600 * 1000;
                let msOverage = actual - exactExpected;
                // since setTimeout() puts something on the timer queue with a
                // *minimum* timeout, it's possible that it will take longer to
                // run than the actual timeout. We need to specify how much
                // longer it can take before we consider it to be a "failure".
                let variance = msOverage / exactExpected;
                // through observation, I have seen that it can take as much as
                // an extra 22 ms more than the timeout value before my timer 
                // event set in Car.delayedDrive() executes from the timer 
                // queue. We will use this to calculate our tolerance as a
                // percentage, based on our expected runtime. That way, if we
                // happen to change the speed or distance in this test, the
                // tolerance can be automatically calculated (with 25 being the
                // static max number of milliseconds we can tolerate waiting
                // after our timer expires.)
                let tolerance = maxMsOverage / exactExpected;
                console.log({ legValues, distance, actual, exactExpected, msOverage, variance, tolerance });

                expect(variance).toBeLessThanOrEqual(tolerance);
            });

    }, 60000);

});