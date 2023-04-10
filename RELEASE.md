## Release Checklist

#### Update version, tag, and publish
- [ ] git checkout main
- [ ] git pull origin
- [ ] Update dependencies and version number in `package.json`
- [ ] npm install
- [ ] npm run all
- [ ] git add . && git commit -m 'vA.B.C'
- [ ] git tag vA.B.C
- [ ] git push origin main vA.B.C
- [ ] Go to https://github.com/rapideditor/pixi-texture-allocator/tags
- [ ] Convert the tag to a release
- [ ] npm publish
