
import * as path from 'path';
import { Plugin } from "./Plugin";
import { PluginConfig, PluginOptions } from '.';

export class PluginManager<T extends Plugin> {
    private _plugins: Map<string, T> = new Map();
    private _config: PluginConfig;

    constructor(config: PluginConfig) {
        this._config = config;
    }

    async load(id: string, plugin: T) {
        this._plugins.set(id, plugin);
        await plugin.initialize();
    }

    getPlugin(id: string) {
        return this._plugins.get(id);
    }

    async loadPlugins(options: PluginOptions) {
        const plugindir = process.env.PLUGIN_PATH ? process.env.PLUGIN_PATH : "";
        for (const pluginconfig of this._config.plugins) {
            // The current working is used to resolve the path to the plugins directory.
            const module = await import(path.join(plugindir, pluginconfig.pluginFile));
            const pluginClass = module.default;
            const p = new pluginClass(options) as T;
            await this.load(pluginconfig.id, p);
        }
    }


}