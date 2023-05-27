import { readConfigJSON } from '../config/commons';
import { SubDomainPlugin } from './Plugin';
import { PluginManager } from './PluginManager';

const PLUGIN_CONFIG = "plugins.json";

export type PluginConfig = {
    plugins:[{
        id:string,
        pluginFile:string,
    }]
}

export type PluginOptions = {
    appref?:any;
}

const pluginConfigs = readConfigJSON(PLUGIN_CONFIG);
const subdomainConfig = pluginConfigs.subDomainPlugins as PluginConfig;

const subdomainPluginManager = new PluginManager<SubDomainPlugin>(subdomainConfig);

export const loadPlugins= async (options:PluginOptions) => {
    await subdomainPluginManager.loadPlugins(options);
}

export {subdomainPluginManager}
