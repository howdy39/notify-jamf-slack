/* eslint-disable no-redeclare */
// eslint-disable-next-line no-unused-vars
class BlockKitBuilder {
  constructor() {
    this.blockKit = [];
  }

  getBlockKit() {
    return this.blockKit;
  }

  addHeader(text) {
    this.blockKit.push({
      type: 'header',
      text: {
        type: 'plain_text',
        text: text,
      },
    });
    return this;
  }

  addDivider() {
    this.blockKit.push({ type: 'divider' });
    return this;
  }

  addSection(text) {
    this.blockKit.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: text,
      },
    });
    return this;
  }
  addSectionFields(textList) {
    this.blockKit.push({
      type: 'section',
      fields: textList.map((text) => {
        return {
          type: 'mrkdwn',
          text: text,
        };
      }),
    });
    return this;
  }
  addSectionWithImage(text, imageUrl, imageAltText) {
    this.blockKit.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: text,
      },
      accessory: {
        type: 'image',
        image_url: imageUrl,
        alt_text: imageAltText,
      },
    });
    return this;
  }

  addContext(text) {
    this.blockKit.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: text,
        },
      ],
    });
    return this;
  }
}

module.exports = BlockKitBuilder;
