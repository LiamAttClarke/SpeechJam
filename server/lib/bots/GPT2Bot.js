const axios = require('axios');
const { GPT2_URL } = require('../../constants');
const { BaseBot, BotState, BotEvent } = require('./BaseBot');

module.exports = class GPT2Bot extends BaseBot {

  constructor() {
    super();
    this._timeout = null;
  }

  start() {
    if (this.state !== BotState.Idle) return;
    this.awake();
    this._state = BotState.Chatting;
    try {
      this.generateMessage();
    } catch (e) {
      console.error(e);
      this.emit(BotEvent.Error, e);
    }
  }

  stop() {
    clearTimeout(this._timeout);
    this._state = BotState.Idle;
  }

  async generateMessage() {
    console.log('GENERATING');
    // Server truncates to last 500 chars.
    const prefix = this._context.slice(-500);
    const { data } = await axios.post(GPT2_URL, {
      prefix,
      length: Math.floor(10 + Math.random() * 25),
      temperature: 1, // recommended range: 0.7 - 1.0
    });
    let generatedText = data.text;
    console.log(`GENERATED: <<<${generatedText}>>>`);

    // Remove Prefix
    generatedText = generatedText.slice(this._context.length).trim();
    // Remove new lines
    generatedText = generatedText.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g,' ')
    // Remove <|endoftext|>
    generatedText = generatedText.replace('<|endoftext|>',' ');

    console.log(`OUTPUT: <<<${generatedText}>>>`);

    if (this.state === BotState.Chatting) {
      if (generatedText) {
        this.emit(BotEvent.Message, generatedText);
      }
      const delay = 1000 + Math.random() * 2000;
      this._timeout = setTimeout(this.generateMessage.bind(this), delay);
    }
  }

  // Wake up the GCP CloudRun server
  async awake() {
    return axios.get(GPT2_URL + '/awake');
  }
}
