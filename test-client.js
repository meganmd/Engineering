const args = [ 'test' ];
const opts = { stdio: 'inherit', cwd: 'react-practice', shell: true };
require('child_process').spawn('npm', args, opts);
