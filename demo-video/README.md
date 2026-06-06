# klaut.pro Portal Demo Video

HyperFrames HTML composition showcasing the unified portal UI (sidebar, Books chat, Secrets).

## Preview locally

Open `index.html?preview=1` in a browser for animated scene cycling.

## Render MP4 (requires Node ≥22 + FFmpeg)

```bash
cd demo-video
npx hyperframes render . -o renders/klaut-portal-demo.mp4
```

## Snapshot frames (lighter on Windows)

```bash
cd demo-video
npx hyperframes snapshot . --frame 120 --output renders/books-scene.png
npx hyperframes snapshot . --frame 360 --output renders/secrets-scene.png
npx hyperframes snapshot . --frame 660 --output renders/end-card.png
```

## Composition spec

| Property | Value |
| --- | --- |
| Resolution | 1920×1080 |
| Duration | 25s |
| FPS | 30 |
| Scenes | Title → Books → Clarify → Secrets → End |

From repo root:

```bash
npm run demo:video
```
