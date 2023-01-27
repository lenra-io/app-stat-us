const ui = require('../views/utils/ui');

describe('color', () => {
    test('black contrast', () => {
        expect(ui.color.betterContrast(ui.color.black)).toBe(ui.color.white);
    });
    test('black contrast black & white', () => {
        expect(ui.color.betterContrast(ui.color.black, ui.color.black, ui.color.white)).toBe(ui.color.white);
    });
    test('white contrast', () => {
        expect(ui.color.betterContrast(ui.color.white)).toBe(ui.color.black);
    });
    test('white contrast black & white', () => {
        expect(ui.color.betterContrast(ui.color.white, ui.color.black, ui.color.white)).toBe(ui.color.black);
    });
});