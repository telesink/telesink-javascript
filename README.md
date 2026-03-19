# Telesink SDK for JavaScript

**Know what your product is doing. Right now.**

Official JavaScript client for [telesink.com](https://telesink.com) - real-time
event tracking.

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
  event: "user.signed.up",
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

#### Returns

- `true` — event sent successfully
- `false` — disabled, missing endpoint, or network error

### License

MIT (see [LICENSE.md](/LICENSE.md)).
