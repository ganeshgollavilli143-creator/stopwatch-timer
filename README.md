# Stopwatch and Timer

A small React app with a stopwatch and a configurable countdown timer.

## Features

- Stopwatch with start, pause, and reset controls
- Countdown timer with hour, minute, and second inputs
- Timer inputs accept nonnegative whole numbers; minutes and seconds are capped at 59

## Requirements

- Node.js and npm

This project uses Create React App 4. On Node.js 17 or newer, set the OpenSSL compatibility option before starting or building:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

## Run locally

```bash
npm install
npm start
```

The app opens at http://localhost:3000.

## Pages

- / — Stopwatch
- /timer — Countdown timer

## Production build

After setting the compatibility option above, run:

```bash
npm run build
```
