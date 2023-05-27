import { SubDomainPlugin } from "./iasdk";

export default class MilestonePlugin extends SubDomainPlugin{
    async nlqPreProcess<NLQPreProcessParam>(input: NLQPreProcessParam) {
        console.log("nlqPreProcess :",this._options);
      return input;
    }
  
    async nlqPostProcess<NLQPostProcessParam>(input: NLQPostProcessParam){
        console.log("nlqPostProcess :",this._options);
        return input;
    }
    name: string ="MilestonePlugin";
    version: string = "1.1";
    
    async initialize(){
        console.log("plugin initialize..");
    }
    
  }