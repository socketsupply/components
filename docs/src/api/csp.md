# 7. CSP

`CSP` stands for `Content Security Policy`. It's important to add one of these
to your app or website if you do anything beyond pure html. [This][0] is a good
introduction to `CSP`s if you're not already familiar with how they work.

This is an example policy, it's quite libral, in a real app you would want these
rules to be more specific.

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

In order to allow `Tonic` to execute properly when using a CSP, you might need
to set the `Tonic.nonce` property. For example, given the above policy you would
add the following to your javascript...

```js
Tonic.nonce = '123'
```

Note that `123` is a placeholder, this should be an actual [nonce][1].

[0]:https://developers.google.com/web/fundamentals/security/csp/
[1]:https://en.wikipedia.org/wiki/Cryptographic_nonce
