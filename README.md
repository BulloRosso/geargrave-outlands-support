# Geargrave Outlands — player support

Geargrave Outlands is in **Early Access**. This repository is where players
help improve the game in two ways:

| You can… | How | Takes |
|---|---|---|
| **Improve a translation** | In the game, press **Ctrl+T** on the map, fix the text and press **Save for GitHub**. Then upload the file here as a pull request. | 5 minutes and a free GitHub account |
| **Report a broken image** | In the game, press **F10** on any screen, click the broken image and press **Report on GitHub**. The issue form opens with the exact image ID already filled in. | 2 minutes and a free GitHub account |

The game's source code is not in this repository. It only collects translation
fixes and image reports.

---

## Improve a translation

The game ships in English, German, French, Spanish, Italian, Japanese, Chinese,
Russian and Brazilian Portuguese. Most translations have not yet been reviewed
by a native speaker, so your eye helps.

1. On the world map, press **Ctrl+T**. This opens the **Translation helper**.
2. Pick your language, search for the line, correct it and press **Commit**.
3. Enter your GitHub name and press **Save for GitHub**. The game writes a file
   named like `translation-de-yourname-20260923-1412.json`. It contains only the
   lines you changed.
4. Press **Open GitHub upload page**, drag the file in and choose
   **Propose changes** and then **Create pull request**.

Step-by-step guide with details: [i18n-contributions/README.md](i18n-contributions/README.md)

An automatic check validates your file within a minute. After that, a
maintainer reviews the wording and adds it to the next update of the game.

## Report a broken image

For stretched, cut-off, blurry or wrong art, or a picture that shows
something it shouldn't:

1. Press **F10** on any screen. The game freezes the view.
2. Point at the broken image. It gets a red outline and its **image ID** is
   shown, for example `assets/locations/location_scene_rust_market.png`. If
   several images overlap, use the mouse wheel to choose the right one.
3. Click it, describe what looks wrong (optional) and press **Report on GitHub**.
4. Your browser opens the [image defect form](https://github.com/BulloRosso/geargrave-outlands-support/issues/new?template=image-defect.yml)
   with the image ID, game version, screen and language already filled in.
   The game also saves a screenshot with the image outlined in red. Please drag
   it into the form.

Each image ID names exactly one file, so we can fix the right picture. It also
lets us group all reports about the same image. Before reporting, you can
[search the issues](https://github.com/BulloRosso/geargrave-outlands-support/issues?q=label%3Aimage-defect) for the image ID to see
if someone already has.

## Everything else

Please send gameplay bugs, balance feedback and ideas through the game's
Steam community hub. This repository only accepts translation files and image
reports, and pull requests that change anything else are closed.

By contributing you agree to the terms in [CONTRIBUTING.md](CONTRIBUTING.md).
