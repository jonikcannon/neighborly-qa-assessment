module.exports = { getAuthToken };

function getAuthToken(context, ee, next) {
  const https = require('https');
  
  const postData = JSON.stringify({
    email: context.vars.adminEmail,
    password: context.vars.adminPassword
  });

  const options = {
    hostname: 'zowdchiqxaedaniokvqe.supabase.co',
    port: 443,
    path: '/auth/v1/token?grant_type=password',
    method: 'POST',
    headers: {
      'apikey': context.vars.apiKey,
      'content-type': 'application/json',
      'x-client-info': 'supabase-js-web/2.0.0',
      'x-supabase-api-version': '2024-01-01',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        if (response.access_token) {
          context.vars.authToken = response.access_token;
        } else {
          console.error('No access_token in response:', data);
        }
      } catch (e) {
        console.error('Failed to parse auth response:', data);
      }
      return next();
    });
  });

  req.on('error', (e) => {
    console.error(`Auth error: ${e.message}`);
    return next();
  });

  req.write(postData);
  req.end();
}
