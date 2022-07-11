import { render, screen, fireEvent, } from '@testing-library/react';
import App from '../components/App';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../app/store';

describe('App', () => {

    it('test LoginPage component matches snapshot', async () => {
        var component = render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>)
        expect(await screen.findByTestId('username-input')).toBeInTheDocument();
        expect(await screen.findByTestId('password-input')).toBeInTheDocument();
        expect(await screen.findByTestId('submit')).toBeInTheDocument();
        expect(component).toMatchSnapshot();
    });

    it('test App shows LoginPage component and contains user and password inputs and submit button', async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>)
        expect(await screen.findByTestId('username-input')).toBeInTheDocument();
        expect(await screen.findByTestId('password-input')).toBeInTheDocument();
        expect(await screen.findByTestId('submit')).toBeInTheDocument();
    });


    it('test correct App login followed by render of dashboard', async () => {

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
        expect(await screen.findByTestId('dashboard')).toBeInTheDocument();
    });

    it('test incorrect App login and showing alert', async () => {

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
        fireEvent.change(username, { target: { value: 'nobody' } });
        fireEvent.change(password, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
        expect(component.getByTestId('alert')).toBeInTheDocument();
    });
});