import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
    test('renders ToggleButton component', () => {
        const handler1 = jest.fn();
        const handler2 = jest.fn();
        const label1 = 'Left';
        const label2 = 'Right';

        const { container } = render(
            <ToggleButton
                label1={label1}
                label2={label2}
                handler1={handler1}
                handler2={handler2}
            />
        );

        expect(container.querySelector('.ToggleButton__button--selected').textContent).toBe(label1);
        fireEvent.click(screen.getByText(label2));
        expect(handler2).toHaveBeenCalledTimes(1);
        expect(container.querySelector('.ToggleButton__button--selected').textContent).toBe(label2);
        fireEvent.click(screen.getByText(label1));
        expect(handler1).toHaveBeenCalledTimes(1);
        fireEvent.click(screen.getByText(label1));
        expect(handler1).toHaveBeenCalledTimes(1);
    });
});
