import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',    
      },  
    },
    server: {
      allowedHosts: ['localhost','172.16.16.91','renewedge-solutions.com','dev.renewedge-solutions.com']
    }
  });
};