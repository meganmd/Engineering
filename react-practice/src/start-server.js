const args = [ 'server.js' ];
const opts = { stdio: 'inherit', cwd: '..', shell: true };
require('child_process').spawn('node', args, opts);
