const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

import { PluginConfig, PluginOptions, loadPlugins } from ".";
import { readConfigJSON } from "../config/commons";
import { NLQPostProcessParam, SubDomainPlugin } from "./Plugin";
import { PluginManager } from "./PluginManager";
import {subdomainPluginManager} from "./";


describe('plugin', () => {
    test('readconfig', async () => {
        const pluginConfigs = readConfigJSON("plugins.json");
        expect(pluginConfigs).toBeDefined();
     });
    test('loadplugin', async () => {
        const pluginConfigs = readConfigJSON("plugins.json");
        const subdomainConfig = pluginConfigs.subDomainPlugins as PluginConfig;
        const manager = new PluginManager<SubDomainPlugin>(subdomainConfig);
        const options: PluginOptions ={appref:undefined};
        manager.loadPlugins(options);
    });

    test('loadplugins', async () => {
        const options: PluginOptions ={appref:"apprefs"};
        await loadPlugins(options);
    });

    test('postnlqprocess', async () => {
        const options: PluginOptions ={appref:"apprefs"};
        await loadPlugins(options);

        const plugin = subdomainPluginManager.getPlugin("2");
        const input:NLQPostProcessParam = {sql:"select * from table"};
        const output = await plugin?.nlqPostProcess(input);
        expect(output).toBeDefined();
        console.log("postnlqprocess done"); 
    });
});