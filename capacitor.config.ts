import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Colegio',
  webDir: 'www',
  plugins: {
    'BarcodeScanner': {},  
  }
};

export default config;