# Improve the translation of Geargrave Outlands

Geargrave Outlands is in Early Access and ships in nine languages. If a line
reads wrong, sounds clumsy or is still in English, you can suggest a better one
right from the game. Each suggestion reaches us as a small file, and a
maintainer reviews it and adds it to the next update.

You need a free [GitHub account](https://github.com/signup). You don't need Git
or any other tools.

## 1. Fix the text in the game

1. On the world map, press **Ctrl+T** to open the **Translation helper**.
2. Choose the **Source** language (usually English) and the **Translation**
   language you want to improve.
3. Search for the text. Type at least 5 characters of a word you saw on screen.
   The search looks at the label, the source text and the translation.
4. Click the label on the left, correct the text in the box at the bottom and
   press **Commit**. Changed lines are shown in gold.
5. Repeat for as many lines as you like. Your changes are kept between sessions.
   If you clear the search box, the list shows everything you have changed so far.

Please keep `{0}`, `{1}`, … and markup such as `[b]…[/b]` exactly as they are.
The game fills in numbers and names at those spots.

## 2. Save the file

Enter your GitHub user name (or a nickname) under **Your name (GitHub)** and
press **Save for GitHub**. The game writes one file that holds only the lines
you changed, and opens its folder:

```
i18n-modifications/for-github/translation-de-yourname-20260923-1412.json
                              └ language  └ you    └ date and time
```

The folder is inside the game's install folder. If the game can't write there,
it uses the game's user data folder instead
(`%APPDATA%\Godot\app_userdata\Geargrave Outlands\i18n-modifications\for-github\`).

## 3. Upload it to GitHub

1. Press **Open GitHub upload page**. Your browser opens the upload page for
   your language's folder in this repository, for example `i18n-contributions/de/`.
2. Drag the file into the page. Don't rename it.
3. Enter a short description, such as "German: fixes in the loot screen", and
   press **Propose changes**, then **Create pull request**.

GitHub creates your own copy of this repository (a fork) and opens the pull
request. An automatic check confirms that the file is readable, and then a
maintainer reviews your lines. We may ask questions in the pull request, so
please watch your GitHub notifications.

Please send one file per language and pull request. For a later round, simply
save and upload a new file.

## What the automatic check looks at

- The file name, folder and language match (`translation-<language>-<name>-<date>-<time>.json`
  in `i18n-contributions/<language>/`).
- No line is empty, and no line adds a `{n}` placeholder that the original
  doesn't have.
- `[b]`, `[i]`, `[color]` and similar tags are closed properly.
- The pull request only adds files in this folder.

If the check fails, its message says which line is affected. Fix the line in
the game, save again and upload the new file.

By contributing you agree to the terms in [CONTRIBUTING.md](../CONTRIBUTING.md).
