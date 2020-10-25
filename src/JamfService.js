const Buffer = require('buffer/').Buffer;
const fetch = require('node-fetch');
const memjs = require('memjs');
const client = memjs.Client.create();

const JAMF_USER = process.env.JAMF_USER;
const JAMF_PASSWORD = process.env.JAMF_PASSWORD;

const authData = Buffer.from(`${JAMF_USER}:${JAMF_PASSWORD}`).toString('base64');

class JamfService {
  static async getPolicyName(policyId) {
    const policies = await JamfService.findPolicies();
    const policy = policies.find((policy) => {
      return policy.id === policyId;
    });
    return (policy && policy.name) || 'policy not found error.';
  }

  static async findPolicies() {
    const memPolicies = await client.get('policies');
    if (memPolicies.value) {
      console.log('Found policies cache.');
      return JSON.parse(String(memPolicies.value));
    }
    console.log(`Not Found policies cache.`);

    // https://www.jamf.com/developers/apis/classic/reference/#/policies/findPolicies
    let url = 'https://heyinc.jamfcloud.com/JSSResource/policies';

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authData}`,
        accept: 'application/json',
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    const policies = json.policies;
    client.set('policies', JSON.stringify(policies), { expires: 60 * 60 * 24 });

    return policies;
  }
}
module.exports = JamfService;
