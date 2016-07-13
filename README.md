# ascii-server
A server which delivers ASCII art through its API. This is an open source Mixmax Slash Command.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl http://localhost:5000/asciify/suggest?text=cats
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:5000/asciify/resolve?text=cats
```
