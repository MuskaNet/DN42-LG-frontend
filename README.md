# DN42 Looking Glass Frontend

This is the frontend for Muska Network DN42 Looking Glass.

## API

We're using [bird-lg-go](https://github.com/xddxdd/bird-lg-go) for our server-side API.

## Build and deploy

You can configure it by modify this file: `src/config.ts`.  
We're using PNPM for package management.  
Alternatively, you can use any other package manager you prefer.

```bash
#npm run build-only
pnpm build-only
```

The output is now in dist/. Simply deploy it and enjoy!
