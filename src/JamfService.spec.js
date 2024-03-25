const { getToken, getPolicyName } = require('./JamfService');
jest.unmock('./JamfService');

describe.skip('getToken', () => {
  test('not error', async () => {
    await getToken();
  });
});

describe.skip('getPolicyName', () => {
  test('not found', async () => {
    const policyName = await getPolicyName(63);
    console.log({ policyName });
  });
});
