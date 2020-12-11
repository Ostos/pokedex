import { getSearchSuggestions } from './utils';

describe('utils', () => {
    describe('getSearchSuggestions', () => {
        test('returns empty string', () => {
            const input = '';
            const dict = {};
            const suggestions = getSearchSuggestions(input, dict);
            expect(suggestions).toEqual([]);
        });

        test('returns empty string', () => {
            const input = 'a';
            const dict = {
                a: {
                    b: {
                        c: {}
                    },
                    d: {

                    }
                }
            };
            const suggestions = getSearchSuggestions(input, dict);
            expect(suggestions).toEqual(['abc', 'ad']);
        });
    });
});