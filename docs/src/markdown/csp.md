# CSP

Tonic is `Content Security Policy` friendly. [This][0] is a good introduction to
`CSP`s if you're not already familiar with how they work. This is an example policy,
it's quite liberal, in a real app you would want these rules to be more specific.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    font-src 'self' https:;
    img-src 'self' https: data:;
    style-src 'self' 'nonce-123' https:;
    script-src 'self' 'nonce-123';
    connect-src 'self' https:;">
```

For `Tonic` to work with a CSP, you need to set the [`nonce`][1] property. For
example, given the above policy you would add the following to your javascript...

```js
Tonic.nonce = 'c213ef6'
```

[0]:https://developers.google.com/web/fundamentals/security/csp/
[1]:https://en.wikipedia.org/wiki/Cryptographic_nonce
