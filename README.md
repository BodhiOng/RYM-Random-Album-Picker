# RYM Random Album Picker

Picks a random page from your Rate Your Music visual collection and opens a random album from that page in a new tab.

## What it does

- Detects your current collection visual URL (e.g. `/collection/<user>/visual/15`)
- Detects your current collection visual URL (e.g. `/collection/<user>/visual/` or `/collection/<user>/visual/15`)
- Finds available visual page numbers from page navigation links
- Randomly chooses one page
- Fetches that page and parses the 5x5 album grid (`table.viz`)
- Randomly chooses one album and opens it in a new tab
- Logs and returns the selected result

## File

- [rym-random-album-picker.js](rym-random-album-picker.js)

## How to use

1. Open a RYM visual collection page while logged in, for example:
  - `https://rateyourmusic.com/collection/<your-username>/visual/`
   - `https://rateyourmusic.com/collection/<your-username>/visual/1`
2. Open browser DevTools Console.
3. Paste the full contents of `rym-random-album-picker.js` and press Enter.
4. Allow popups for Rate Your Music if your browser blocks the new tab.

## Output

The script logs an object like:

```js
{
  randomPage: 23,
  pageUrl: "https://rateyourmusic.com/collection/yourname/visual/23",
  albumTitle: "Example Album",
  albumUrl: "https://rateyourmusic.com/release/album/..."
}
```

## Notes

- Run it from a **visual collection page** only.
- If the selected page has no detectable albums, it throws an error.
- Uses your current login session via `fetch(..., { credentials: "include" })`.
