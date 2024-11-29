//Archivo de configuracion temporal
//Para multiples servicios de DNS
const { exec } = require('child_process');
const net = require('net');

(async () => {
  const getPort = await import('get-port').then(mod => mod.default);

  const startMetroBundler = (port) => {
    return new Promise((resolve, reject) => {
      exec(`npx react-native start --port ${port}`, (error, stdout, stderr) => {
        if (error) {
          reject(`Error starting Metro Bundler on port ${port}: ${error.message}`);
        } else if (stderr) {
          reject(`Metro Bundler stderr on port ${port}: ${stderr}`);
        } else {
          resolve(`Metro Bundler started on port ${port}`);
        }
      });
    });
  };

  const checkPortInUse = (port) => {
    return new Promise((resolve, reject) => {
      const server = net.createServer();

      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          resolve(true);
        } else {
          reject(err);
        }
      });

      server.once('listening', () => {
        server.close();
        resolve(false);
      });

      server.listen(port);
    });
  };

  const ports = [8081, 8082, 8083, 8084, 8085, 8086, 8087, 8088, 8089, 8090];

  for (let port of ports) {
    const inUse = await checkPortInUse(port);

    if (!inUse) {
      console.log(`Starting Metro Bundler on port ${port}...`);
      try {
        const result = await startMetroBundler(port);
        console.log(result);
        break; // Metro Bundler started successfully, break the loop
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log(`Port ${port} is already in use, trying next...`);
    }
  }
})();

