import { render, fireEvent, screen } from '@testing-library/react';
import App from '../components/App';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { MemoryRouter } from 'react-router-dom';

describe('Leaderboard', () => {

    it('test Leaderboard display the correct information', async () => {
        var component = render(
            <MemoryRouter initialEntries={["/leaderboard"]}>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>)
        expect(await screen.findByTestId('username-input')).toBeInTheDocument();
        expect(await screen.findByTestId('password-input')).toBeInTheDocument();
        expect(await screen.findByTestId('submit')).toBeInTheDocument();
        var username = component.getByTestId('username-input');
        var password = component.getByTestId('password-input');
        var submitButton = component.getByTestId('submit');
        fireEvent.change(username, { target: { value: 'sarahedo' } });
        fireEvent.change(password, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        expect(await screen.findByTestId('leaderboard')).toBeInTheDocument();
        var row = component.queryByTestId('sarahedo')
        expect(row).toHaveTextContent("Sarah Edo");
        expect(row).toHaveTextContent("4");
        expect(row).toHaveTextContent("2");
        row = component.queryByTestId('mtsamis')
        expect(row).toHaveTextContent("Mike Tsamis");
        expect(row).toHaveTextContent("3");
        expect(row).toHaveTextContent("2");
        row = component.queryByTestId('tylermcginnis')
        expect(row).toHaveTextContent("Tyler McGinnis");
        expect(row).toHaveTextContent("2");
        expect(row).toHaveTextContent("2");
        row = component.queryByTestId('zoshikanlu')
        expect(row).toHaveTextContent("Zenobia Oshikanlu");
        expect(row).toHaveTextContent("1");
        expect(row).toHaveTextContent("0");
    });
})