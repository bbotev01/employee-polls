import { render, fireEvent, screen } from '@testing-library/react';
import App from '../components/App';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {

    it('test Navbar component contains required links', async () => {
        var component = render(
            <MemoryRouter initialEntries={["/"]}>
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
        expect(await screen.findByTestId('navbar-home')).toBeInTheDocument();
        expect(await screen.findByTestId('navbar-leaderboard')).toBeInTheDocument();
        expect(await screen.findByTestId('navbar-new')).toBeInTheDocument();
        expect(await screen.findByTestId('navbar-logout')).toBeInTheDocument();
    });
})