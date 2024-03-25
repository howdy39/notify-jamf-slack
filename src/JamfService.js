const fetch = require('node-fetch');
const memjs = require('memjs');
const client = memjs.Client.create();

const JAMF_URL = process.env.JAMF_URL || 'https://sample.jamfcloud.com';

class JamfService {
  static async getToken() {
    // https://developer.jamf.com/jamf-pro/docs/client-credentials
    const url = `${JAMF_URL}/api/oauth/token`;

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.JAMF_CLIENT_ID);
    params.append('client_secret', process.env.JAMF_CLIENT_SECRET);

    const response = await fetch(url, { method: 'POST', body: params });
    const json = await response.json();

    return json.access_token;
  }

  static async getPolicyName(policyId) {
    const policies = await JamfService.findPolicies();
    const policy = policies.find((policy) => {
      return policy.id === policyId;
    });
    return (policy && policy.name) || 'policy not found error.';
  }

  static async findPolicies() {
    const token = await JamfService.getToken();

    const memPolicies = await client.get('policies');
    if (memPolicies.value) {
      console.log('Found policies cache.');
      return JSON.parse(String(memPolicies.value));
    }
    console.log(`Not Found policies cache.`);

    // https://www.jamf.com/developers/apis/classic/reference/#/policies/findPolicies
    let url = `${JAMF_URL}/JSSResource/policies`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
