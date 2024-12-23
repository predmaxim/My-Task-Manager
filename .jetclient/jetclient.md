```toml
name = 'MTM'
id = 'aa7b7996-4bf2-4e0c-bb7b-506c6444e9cf'

[[environmentGroups]]
name = 'Default'

[[environmentGroups]]
name = 'auth'
environments = ['tokens', 'cookies']
```

#### Variables

```json5
{
  tokens: {
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTczMDYzOTEzNiwiZXhwIjoxNzMwNjQwMDM2fQ.PvLjZ1Yf5TOwQbPAN1TClgUMwT1oomU5eA6azFGL974",
    refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNk16RXNJbWxoZENJNk1UY3pNRFl6TmpZMk1pd2laWGh3SWpveE56TXdOak0zTlRZeWZRLkR6MGRlNUFaMzFfR2dnZ3NqLXRmVG5PMmxfa3hReGtJMTRYNjRrU1hWQU0iLCJpYXQiOjE3MzA2MzY2NjIsImV4cCI6MTczMzIyODY2Mn0.L46y2qmF71aagTo3jTT4wWLaKyBBxP3Ga-_ZLAaS9K4"
  },
  cookies: {
    refresh_token_cookie: "mtm_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNk16RXNJbWxoZENJNk1UY3pNRFl6TmpZMk1pd2laWGh3SWpveE56TXdOak0zTlRZeWZRLkR6MGRlNUFaMzFfR2dnZ3NqLXRmVG5PMmxfa3hReGtJMTRYNjRrU1hWQU0iLCJpYXQiOjE3MzA2MzY2NjIsImV4cCI6MTczMzIyODY2Mn0.L46y2qmF71aagTo3jTT4wWLaKyBBxP3Ga-_ZLAaS9K4; Max-Age=2592000; Domain=localhost; Path=/; Expires=Tue, 03 Dec 2024 12:24:22 GMT; HttpOnly"
  }
}
```
