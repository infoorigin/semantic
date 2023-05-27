export type PluginConfig = {
    plugins: [{
        id: string,
        pluginFile: string,
    }]
}

export type PluginOptions = {
    appref?: any;
}


export abstract class Plugin {
    abstract name: string;
    abstract version: string;
    protected _options: PluginOptions;
    constructor(options: PluginOptions) {
        this._options = options;
    }
    abstract initialize(): Promise<void>;

}


export abstract class SubDomainPlugin extends Plugin {
    abstract nlqPreProcess<U>(input: U): Promise<U>;
    abstract nlqPostProcess<V>(input: V): Promise<V>;
}