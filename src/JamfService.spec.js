const { getPolicyName } = require('./JamfService');
jest.unmock('./JamfService');

describe('getPolicyName', () => {
  test('not found', async () => {
    await getPolicyName(42);
  });
});
