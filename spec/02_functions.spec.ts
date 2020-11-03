import { isEven } from '../src/utils';

describe('functions', () => {
    describe('parameters and overloading', () => {
        describe('higher-ordered functions', () => {
            // a function that takes one or more functions as arguments, or returns a function is a HOF
            it('making a tagmaker function', () => {

                function tagMaker(element: string, content: string): string {
                    return `<${element}>${content}</${element}>`;
                }

                expect(tagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
                expect(tagMaker('h1', 'Goodbye')).toBe('<h1>Goodbye</h1>');
                expect(tagMaker('p', 'Body')).toBe('<p>Body</p>');
            });
            it('an OOP example', () => {
                class TagMaker {
                    constructor(private element: string) { }

                    make(content: string): string {
                        return `<${this.element}>${content}</${this.element}>`;
                    }
                }

                const h1Maker = new TagMaker('h1');
                const pMaker = new TagMaker('p');
                expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker.make('Goodbye')).toBe('<h1>Goodbye</h1>');
                expect(pMaker.make('Body')).toBe('<p>Body</p>');
            });

            it('a functional programmer approach', () => {

                function tagMaker(element: string): (content: string) => string {
                    return (c) => `<${element}>${c}</${element}>`
                }

                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker('Goodbye')).toBe('<h1>Goodbye</h1>');
                expect(pMaker('Body')).toBe('<p>Body</p>');
            });

        });
        it('destructuring arguments', () => {
            interface HttpStuff { method: 'GET' | 'POST' | 'PUT' | 'DELETE', format: string }
            function doApiCall(url: string, { method, format }: HttpStuff): void {
                console.log(`Making a request to ${url} using ${method} and format ${format}`);
            }

            doApiCall('/books', { method: 'GET', format: 'application/json' });
        });
        it('default valeus for functions', () => {
            function add(a: number = 2, b: number = 10, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((lhs, rhs) => rhs + lhs, firstTwo);
            }
            expect(add(2, 2)).toBe(4);
            expect(add(10)).toBe(20);
            expect(add()).toBe(12);
            expect(add(undefined, 8)).toBe(10);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
        describe('spread operator', () => {
            it('spreading on arrays', () => {
                const starter = [1, 2, 3, 4, 5];
                const newArray = [0, ...starter, 6, 7, 8, 9];
                expect(newArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                expect(starter).toEqual([1, 2, 3, 4, 5]);
            });
            it('spreading on objects', () => {
                const movie = {
                    title: 'Star Wars',
                    director: 'Lucas',
                    yearReleased: 1977
                }
                const newMovie = { ...movie, mpaaRating: 'PG' }
                expect(newMovie).toEqual({
                    title: 'Star Wars',
                    director: 'Lucas',
                    yearReleased: 1977,
                    mpaaRating: 'PG'
                });
                expect(movie).toEqual({
                    title: 'Star Wars',
                    director: 'Lucas',
                    yearReleased: 1977
                });
            });
        });
        it('you cannot overload', () => {
            function formatName(first: string, last: string, mi?: string): string {
                if (mi !== undefined) {  // could also just do if (mi), if mi is undefined it will return false
                    return `${last}, ${first} ${mi}.`;
                }
                else {
                    return `${last}, ${first}`;
                }
            }

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });
        it('falsy and truthy', () => {
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
            expect(0).toBeFalsy();
            expect(1).toBeTruthy();
            expect(-1).toBeTruthy();
            expect('').toBeFalsy();
            expect(' ').toBeTruthy();
            const numbers = [1, 2, 3];
            expect(numbers).toBeTruthy();
            expect(numbers[0]).toBeTruthy();
            expect(numbers[99]).toBeFalsy(); // because it is undefined
        });
        it('null coalescing stuff', () => {
            const answer = null || false || 0 || undefined || '' || 'tacos';
            expect(answer).toBe('tacos');
        });
    });
});

describe('common array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it('has a way to look at just each member of an array', () => {
        numbers.forEach((e, i, c) => console.log({ e, i, c }));
    });
    describe('array methods that create a new arry', () => {
        it('filtering', () => {
            const evens = numbers.filter(isEven);
            expect(evens).toEqual([2, 4, 6, 8]);
            expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

            const friends = ['Bill', 'Amy', 'Jessika', 'Billy', 'Sean'];
            const newFriends = friends.filter(f => f !== 'Billy');
            expect(newFriends).toEqual(['Bill', 'Amy', 'Jessika', 'Sean']);
        });
        it('mutating each element to create  new elements', () => {
            // c# Select LINQ
            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

            const x = numbers.map(n => isEven(n) ? 'Even' : 'Odd');
            expect(x).toEqual(['Odd', 'Even', 'Odd', 'Even', 'Odd', 'Even', 'Odd', 'Even', 'Odd'])
        });
    });
    describe('methods that return a single (scalar) value', () => {
        it('checking the membership of an array', () => {
            const allEven = numbers.every(isEven);
            expect(allEven).toBe(false);
            const someEven = numbers.some(isEven);
            expect(someEven).toBe(true);
        });
        it('reduce - "boil it down to a single value"', () => {
            const sum = numbers.reduce((s, n) => s + n);
            expect(sum).toBe(45);
            const sum2 = numbers.reduce((s, n) => s + n, 100);
            expect(sum2).toBe(145);
        });
    });
    describe('practice', () => {
        it('try it', () => {
            interface Vehicle {
                vin: string;
                make: string;
                model: string;
                mileage: number;
            }
            const vehicles: Vehicle[] = [
                { vin: '8888', make: 'Chevy', model: 'Bolt', mileage: 18_540 },
                { vin: '8938j3783', make: 'Honda', model: 'Pilot', mileage: 52_123 },
                { vin: '38938', make: 'Dodge', model: 'RAM', mileage: 82_233 }
            ];

            // your code here.
            // a high-mielage vehicle is a vehicle with over 50_000 miles on it.
            const highMileageVehicles = vehicles
                .filter(v => v.mileage > 50_000)
                .map(v => `${v.make} ${v.model}`);
            expect(highMileageVehicles).toEqual(['Honda Pilot', 'Dodge RAM']);
        });
    });
});