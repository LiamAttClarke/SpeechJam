const GraphemeSplitter = require('grapheme-splitter');

const splitter = new GraphemeSplitter();
const emojis = "🙂😊😀😁😃😄😆😍☹️🙁😠😡😞😟😣😖😢😭😂😨😧😦😱😫😩😮😯😲😗😙😚😘😍😉😜😘😛😝😜🤑🤔😕😟😐😑😳😞😖🤐😶😇👼😈😎😪😏😒😵😕🤕🤒😷🤢🤨😬🎅😣😖👶😅😳😓😥😴😉😜😕😶😵🙄😀😅😆😃😄🙇😒😩😑😞😔😫😩😪😺😸😹😻😼😽🙀😿😾🐱🙍😔🤭😕😵🤦👽👾😙😚😎🤓😲😮😯😁😨😱😮😲🤷";
const avatars = splitter.splitGraphemes(emojis);

module.exports = function() {
  const a = avatars[Math.floor(Math.random() * avatars.length)];
  console.log(a);
  return a;
}
