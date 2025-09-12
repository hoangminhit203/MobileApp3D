import { Asset } from 'expo-asset';

// Import model 3D files using Asset for Expo
export const models = {
    ABB: Asset.fromModule(require('../assets/model3d/ABB.glb')),
};
