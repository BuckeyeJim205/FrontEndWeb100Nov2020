describe('types', () => {

    describe('declaring variables and stuff', () => {

        it('a little review of declaring variables', () => {

            let y: any;
            y = 'tacos';
            expect(y).toBe('tacos');
            y = 3.19;
            y = (a: number, b: number) => a + b;
            expect(y(2, 2)).toBe(4);



            const zz = 'Tacos';



            let someVariable: string | number;

            someVariable = 'dog';

            someVariable = 3.14;

            // someVariable = [];
            // someVariable = {};

        });
        it('using let', () => {
            let x = 10;

            x = 30;

            let z = 'Dale';
            z = 'Dianne';

            let q: string[];

            q = ['bird', 'plane', 'tacos'];

            let y: any = 3;

            y = 3.14;

            y = 'Tacos are delicious';
            y = ['dog', 'cat', 'mouse'];

            const p = 'pizza';

        });

        it('some more details about let', () => {
            let a: number | string; // Union Type.

            a = 'Pizza';

            a = 42;

            const x = 12;
            const y = 'Bird';
            const z = { cat: 'Meow' };
        });

        it('a bit about constants', () => {
            // They are names that cannot be reassigned to. THat is IT. No More.

            const a = 12; // with a const you MUST initialize the variable.

            // a = 13; // can't do this. We use the single equals sign to ASSIGN a value, with a const you an only do this when you declare it.

            const luckyNumbers = [7, 9, 20];

            luckyNumbers[1] = 10;

            expect(luckyNumbers).toEqual([7, 10, 20]);

            const show = { title: 'The Mandalorian', network: 'Disney +', yearReleased: 2017 };
            show.yearReleased = 2019;

        });
        it('so what is so wrong with the var keyword anyhow?', () => {

            const age = 21;

            // if (age >= 21) {
            //     // tslint:disable-next-line: no-var-keyword
            //     var message = 'Old Enough';
            // } else {
            //     // tslint:disable-next-line: no-var-keyword
            //     var message = 'Too Young';
            // }
            let message: string;
            if (age >= 21) {
                message = 'Old Enough';
            } else {
                message = 'Too Young';
            }

            expect(message).toBe('Old Enough');

        });

    });

    describe('literals', () => {

        describe('number literals', () => {

            it('some samples', () => {


                let sample: number;
                sample = 10;
                sample = 10.5;
                sample = 0xff;
                sample = 0o22; // base 8
                sample = 0b01010; // base 2 - binary
                sample = 18_989_098_928.22;

                sample = parseFloat('555.55');
                expect(sample).toBe(555.55);
                sample = parseInt('3.1415927', 10);
                expect(sample).toBe(3);

                sample = +'1.33';
                expect(sample).toBe(1.33);
            });
        });

        describe('some strings', () => {

            it('delimiting strings', () => {
                const message1 = 'Hello How Are You?';
                // tslint:disable-next-line: quotemark
                const message2 = "Hello How Are You?";
                expect(message1).toEqual(message2);
            });

            it('has format strings, too', () => {
                const story = `Chapter 1.

It was a dark and stormy night.

The End.`;

                console.log(story);

                const name = 'Bob';
                const salary = 32_123.23;

                const report1 = 'The Employee ' + name + ' has a salary of $' + salary + ' per year';
                const report2 = `The Employee ${name} has a salary of $${salary} per year`;
                expect(report1).toEqual(report2);
            });
        });
    });
    describe('array literals', () => {
        it('using them', () => {
            const stuff = ['dogs', 'birds', 18];

            const first = stuff[0];

            expect(stuff.length).toBe(3);
            stuff[2] = 'Owls';
            expect(stuff).toEqual(['dogs', 'birds', 'Owls']);

            const missing = stuff[99];
            expect(missing).toBeUndefined();

            // const someOtherArray: (string | number)[] = [];
            const someOtherArray: Array<string | number> = [];
            const friends: Array<string> = [];

        });
        it('using a tuple', () => {
            const warren: [string, string, number, string] = ['Warren', 'Ellis', 58, 'Musician'];
            const lName = warren[1];
            const age = warren[2];

        });
        describe('tuples and objects and stuff like that', () => {

            it('doing it with objects', () => {

                // String FormatName(string first, string last) {... }
                interface FormattedNameInfo { fullName: string, numberOfLetters: number }
                function formatName(first: string, last: string): FormattedNameInfo {
                    const name = `${last}, ${first}`;
                    return {
                        fullName: name,
                        numberOfLetters: name.length
                    }
                }

                // const fullName = formatName('Han', 'Solo');
                // expect(fullName.fullName).toBe('Solo, Han');
                // expect(fullName.numberOfLetters).toBe(9);
                // object destructuring
                const { fullName: name, numberOfLetters: letters } = formatName('Han', 'Solo');
                expect(name).toBe('Solo, Han');
                expect(letters).toBe(9);

                // const result = formatName('Han', 'Solo');
                // const name = result.fullName;
                // const letters = result.numberOfLetters;
            });

            it('doing it with a tuple', () => {
                type NameInfo = [string, number];
                function formatName(first: string, last: string): NameInfo {
                    const name = `${last}, ${first}`;
                    return [name, name.length];
                }

                // const info = formatName('Han', 'Solo');
                // expect(info[0]).toBe('Solo, Han');
                // expect(info[1]).toBe(9);

                const [name, length] = formatName('Han', 'Solo');
                expect(name).toBe('Solo, Han');
                expect(length).toBe(9);
            });

        });

    });
    describe('object literals', () => {

        it('a couple details on object literals', () => {
            interface ArtistInfo {
                firstName: string;
                lastName: string;
                birthYear: number;
            };
            interface Song {
                title: string;
                artist: string;
                lastPlayed?: string;
                year?: number;
                [key: string]: any,
                artistInfo?: ArtistInfo
            }

            interface Album {
                songs: Song[]
            }

            const rof: Song = {
                title: 'Renegades of Funk',
                artist: 'Rage agains thte Machine',
                lastPlayed: 'This morning',
                producedBy: 'Joe Smith'
            }

            const bg: Song = {
                title: 'Bad Guy',
                artist: 'Billie Eilish',
                genre: 'POP',
                artistInfo: {
                    firstName: 'Billie',
                    lastName: 'Eilish',
                    birthYear: 2012
                }
            };

            expect(bg.genre).toBe('POP');
        });
        it('basic object literals', () => {
            interface Movie {
                title: string;
                director: string;
                yearReleased: number;
            }
            const thor: Movie = {
                title: 'Thor Ragnorak',
                director: 'Taikia Waititi',
                yearReleased: 2017
            }

            thor.yearReleased = 2016;
            interface Song {
                artist: string;
                title: string;
                album: string;
            };
            const song: Song = {
                artist: 'David Bowie',
                title: 'Starman',
                album: 'Ziggy Stardust'
            }

            // thor.yearreleased = 2018;
            const fwwm: Movie = {
                title: 'Twin Peaks: Fire Walk With Me',
                director: 'Lynch',
                yearReleased: 1992
            }
            showInfo(thor);
            showInfo(fwwm);
            showInfo({ title: 'The Empire Strikes Back', yearReleased: 1983, director: 'Kershner' });

            function showInfo(movie: Movie) {
                console.log(`That is ${movie.title} by ${movie.director} released in ${movie.yearReleased}`);
            }

        });
        it('structural typing with objects', () => {

            interface MessageHavingThing { message: string }
            function logIt(thingy: MessageHavingThing) {
                console.log(`On ${new Date().toLocaleTimeString()} you said ${thingy.message}`);
            }

            logIt({ message: 'Call your mom' });

            interface PhoneCall {
                from: string;
                time: string;
                message: string;
                returned?: boolean
            }
            const phoneCall: PhoneCall = {
                from: 'Bill',
                time: 'This morning',
                message: 'Call Me',
                returned: false
            };

            logIt(phoneCall);

            interface SuperGroup { times: number, message: string }
            function doThisThing(something: SuperGroup) {

            }

            type MathOp = (x: number, y: number) => number;
            interface Mathable {
                num1: number;
                num2: number;
                op: MathOp;
            }

            const adder: Mathable = {
                num1: 10,
                num2: 5,
                op: (a, b) => a + b
            }

            // 1. Type Aliases are an alias for a data type.
            type DateTime = string;

            interface Event {
                where: string;
                when: DateTime
            }

            const tacoTuesday: Event = {
                where: 'Kitchen',
                when: new Date().toISOString()
            }

            // type Person = Employee | Contractor | Retiree;

            type NumberOrString = string | number;




        });

    });

    describe('function literals', () => {

        it('has three ways but we use two.', () => {


            expect(add(2, 3)).toBe(5);

            // Named
            function add(a: number, b: number): number {
                return a + b;
            }
            // Anonymous functions
            const subtract = function (a: number, b: number): number {
                return a - b;
            }

            type MathOp = (x: number, y: number) => number;

            let multiply: MathOp;
            multiply = (a: number, b: number): number => a * b;
            const divide: MathOp = (a: number, b: number): number => {
                if (b === 0) {
                    console.log('Are you trying to open a black hole!?');
                }
                return a / b;
            }

            const doIt = (message: string): void => console.log(message);

            expect(multiply(3, 3)).toBe(9);
            expect(subtract(10, 2)).toBe(8);
            doIt('tacos are good');

            function doMathAndDoubleIt(op: MathOp, num1: number, num2: number): number {
                return op(num1 + num1, num2 + num2);
            }

            // Higher-ordered function - a function that takes one or more functions as arguments, and/or returns a function.
            const result = doMathAndDoubleIt(add, 10, 5);
            const result2 = doMathAndDoubleIt(divide, 3, 8);
            const result3 = doMathAndDoubleIt((x, y) => x % y, 5, 1);

            const weridMath = (p: number, q: number) => p * 2 + q;
            const result4 = doMathAndDoubleIt(weridMath, 10, 2);
            // doMathAndDoubleIt(add, 'tacos', 20); "Structural Typing"

            expect(result).toBe(30);
            expect(result2).toBe(0.375);
            expect(result3).toBe(0);

        });
    });
});