describe('types', () => {

    describe('declaring variables and stuff', () => {
        it('using let', () => {
            let x = 10;
            x = 30;

            let z = 'test';
            z = z.concat('string');

            let q: string[];
            q = ['daxter', 'gizmo', 'simba'];
        });

        it('some more details about let', () => {
            let a: number | string; // union type
            a = 'Pizza';

            a = 42;
        });
    });
    describe('literals', () => {

        describe('number literals', () => {
            it('some samples', () => {
                let sample: number;
                sample = 10;
                sample = 10.5;
                sample = 0xff;
                sample = 0o22; // Sbase 8
                sample = 0b01110; // base 2
                sample = parseFloat('555.55');
                expect(sample).toBe(555.55);
                sample = parseInt('3.1415927', 10);
                expect(sample).toBe(3);
                sample = +'1.33';
                expect(sample).toBe(1.33);
            });
        });
        describe('some string', () => {

            it('delimiting strings', () => {
                const message1 = 'Hello How Are You?';
                const message2 = 'Hello How Are You?';
                expect(message1).toEqual(message2);
            });
            it('has format strings, too', () => {
                const story = `Chapter 1
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
        describe('array literals', () => {
            it('using them', () => {
                const stuff = ['dogs', 'birds', 18]; // union type array
                expect(stuff.length).toBe(3);
                stuff[2] = 'Owls';
                expect(stuff).toEqual(['dogs', 'birds', 'Owls']);
            });
            it('using a tuple', () => {
                const warren: [string, string, number, string] = ['Warren', 'Ellis', 58, 'Musician'];
                const lName = warren[1];
                const age = warren[2];

            });
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

                const { fullName: name, numberOfLetters: letters } = formatName('Han', 'Solo');
                expect(name).toBe('Solo, Han');
                expect(letters).toBe(9);
            });
            it('doing it with a tuple', () => {
                type NameInfo = [string, number];
                function formatName(first: string, last: string): NameInfo {
                    const name = `${last}, ${first}`;
                    return [name, name.length];
                }
                const info = formatName('Han', 'Solo');
                expect(info[0]).toBe('Solo, Han');
                expect(info[1]).toBe(9);
            });
        });
    });
});
describe('object literals', () => {
    it('structural typing with objects', () => {

    });

});
describe('function literals', () => {

    it('has three wayss but we use two', () => {
        // named vs anonymous

        expect(add(7, 4)).toBe(11);
        // named - can be forward referenced
        function add(a: number, b: number): number {
            return a + b;
        }

        // anonymous - cannot be forward referenced
        const subtract = function (a: number, b: number): number {
            return a - b;
        }

        type MathOp = (x: number, y: number) => number; // a MathOp is any function that takes two numbers and returns a number
        const multiply = (a: number, b: number): number => a * b;

        expect(add(2, 3)).toBe(5);
        expect(subtract(10, 2)).toBe(8);
        expect(multiply(3, 3)).toBe(9);
    });
});