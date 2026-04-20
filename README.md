# Telesink SDK for JavaScript

**Know what your product is doing. Right now.**

Official JavaScript client for [telesink.com](https://telesink.com) - real-time
event tracking.

**Note**: Low activity here doesn’t mean this is abandoned. It’s intentionally
simple, so there’s not much to change.

## Requirements

- Node.js 18+
- Any modern browser (with native `fetch` and `AbortController`)

## Getting started

### Install

```sh
npm install telesink
```

### Configuration

#### Node.js

Set the environment variable:

```sh
export TELESINK_ENDPOINT=https://app.telesink.com/api/v1/sinks/your_sink_token_here/events
```

#### Browsers

```sh
window.TELESINK_ENDPOINT = "https://app.telesink.com/api/v1/sinks/your_sink_token_here/events";
```

To disable tracking (e.g. in test/dev):

```sh
export TELESINK_DISABLED=true
```

(or `window.TELESINK_DISABLED = true` in the browser)

### Usage

#### Node.js and modern bundlers

```js
import telesink from "telesink";

telesink.track({
  event: "User signed up",
  text: "user@example.com",
  emoji: "👤",
  properties: {
    user_id: 123,
    email_address: "user@example.com",
  },
  occurredAt: new Date(),
  idempotencyKey: "my-key",
});
```

#### Browser without bundler (Import Maps)

```html
<script type="importmap">
  {
    "imports": {
      "telesink": "https://esm.sh/telesink"
    }
  }
</script>

<script type="module">
  import telesink from "telesink";

  telesink.track({
    event: "page.viewed",
    text: "Homepage visited",
  });
</script>
```

#### Override endpoint

You can pass an `endpoint` property to send the event to a different sink (takes
precedence over `TELESINK_ENDPOINT` / `window.TELESINK_ENDPOINT`):

```js
telesink.track({
  event: "Job succeeded",
  text: "ProcessUserData",
  emoji: "✅",
  properties: { duration_ms: 420 },
  endpoint: process.env.TELESINK_TEST_ENDPOINT, // or window.TELESINK_TEST_ENDPOINT in browser
});

#### Returns

- `true` — event sent successfully
- `false` — disabled, missing endpoint, or network error

### License

MIT (see [LICENSE.md](/LICENSE.md)).
```
