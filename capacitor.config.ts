import type { CapacitorConfig } from '@capacitor/cli';
import type { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PetCut',
  webDir: 'www',
  plugins: {
    Keyboard: {
      resize: 'body' as KeyboardResize
    }
  }
};

export default config;