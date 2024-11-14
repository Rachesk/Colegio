import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Colegio',
  webDir: 'www',
  plugins: {
    'QRCodeScanner': {}
  }
};

export default config;

