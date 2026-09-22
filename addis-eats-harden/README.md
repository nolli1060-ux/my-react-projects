# Addis Eats

A React food-ordering mini-project for the Day 35 React requirements.

## Run locally

```bash
npm install
npm run dev
```

## Main routes

- `/`
- `/menu`
- `/menu/:id`
- `/cart`
- `/checkout`
- `/login`

## Test cases

- Use a normal phone number to test a successful order.
- Use `0900000000` during checkout to test the simulated server-side phone error.
- Open `/checkout` while signed out to test the guarded route.
- Open `/menu/does-not-exist` to test the unknown dish state.
- Add and remove dishes from the cart and change quantities.
