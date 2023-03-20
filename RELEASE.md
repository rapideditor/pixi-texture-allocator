## Release Checklist

#### Update version, tag, and publish
- [ ] git checkout main
- [ ] git pull origin
- [ ] npm install
- [ ] npm run all
- [ ] Update version number in `package.json`
- [ ] git add . && git commit -m 'vA.B.C'
- [ ] git tag vA.B.C
- [ ] git push origin main vA.B.C
- [ ] Go to https://github.com/rapideditor/pixi-dashed-line/tags
- [ ] Convert the tag to a release
- [ ] npm publish
