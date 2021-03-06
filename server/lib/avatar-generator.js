const GraphemeSplitter = require('grapheme-splitter');
const { getRandomElement } = require('./utils');

const splitter = new GraphemeSplitter();
// Robot avatar is reserved for AI
const emojis = "๐๐๐๐๐๐๐๐โน๏ธ๐๐ ๐ก๐๐๐ฃ๐๐ข๐ญ๐๐จ๐ง๐ฆ๐ฑ๐ซ๐ฉ๐ฎ๐ฏ๐ฒ๐๐๐๐๐๐๐๐๐๐๐๐ค๐ค๐๐๐๐๐ณ๐๐๐ค๐ถ๐๐ผ๐๐๐ช๐๐๐ต๐๐ค๐ค๐ท๐คข๐คจ๐ฌ๐๐ฃ๐๐ถ๐๐ณ๐๐ฅ๐ด๐๐๐๐ถ๐ต๐๐๐๐๐๐๐๐๐ฉ๐๐๐๐ซ๐ฉ๐ช๐บ๐ธ๐น๐ป๐ผ๐ฝ๐๐ฟ๐พ๐ฑ๐๐๐คญ๐๐ต๐คฆ๐ฝ๐พ๐๐๐๐ค๐ฒ๐ฎ๐ฏ๐๐จ๐ฑ๐ฎ๐ฒ๐คท";
const avatars = splitter.splitGraphemes(emojis);

module.exports = function(reservedAvatars = []) {
  while (true) {
    const avatar = getRandomElement(avatars);
    if (!reservedAvatars.includes(avatar)) {
      return avatar;
    }
  }
}
