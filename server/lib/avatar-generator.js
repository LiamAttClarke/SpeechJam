const GraphemeSplitter = require('grapheme-splitter');
const { getRandomElement } = require('./utils');

const splitter = new GraphemeSplitter();
// Robot avatar is reserved for AI
const emojis = "🙂😊😀😁😃😄😆😍☹️🙁😠😡😞😟😣😖😢😭😂😨😧😦😱😫😩😮😯😲😗😙😚😘😍😉😜😘😛😝😜🤑🤔😕😟😐😑😳😞😖🤐😶😇👼😈😎😪😏😒😵😕🤕🤒😷🤢🤨😬🎅😣😖👶😅😳😓😥😴😉😜😕😶😵🙄😀😅😆😃😄🙇😒😩😑😞😔😫😩😪😺😸😹😻😼😽🙀😿😾🐱🙍😔🤭😕😵🤦👽👾😙😚😎🤓😲😮😯😁😨😱😮😲🤷";
const avatars = splitter.splitGraphemes(emojis);

module.exports = function(reservedAvatars = []) {
  while (true) {
    const avatar = getRandomElement(avatars);
    if (!reservedAvatars.includes(avatar)) {
      return avatar;
    }
  }
}
