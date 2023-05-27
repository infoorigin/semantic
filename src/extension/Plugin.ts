import { PluginOptions } from ".";

export abstract class Plugin {
  abstract name: string;
  abstract version: string;
  protected _options: PluginOptions;
  constructor(options: PluginOptions) {
    this._options = options;
  }
  abstract initialize(): Promise<void>;

}

export type NLQPreProcessParam = {
  nlq:string
}

export type NLQPostProcessParam = {
  sql:string
}

export abstract class SubDomainPlugin extends Plugin {
  abstract nlqPreProcess<U>(input: U): Promise<U>;
  abstract nlqPostProcess<V>(input: V): Promise<V>;
}



