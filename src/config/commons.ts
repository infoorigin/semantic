import * as fs from 'fs';
import path from 'path';

export const readConfigJSON = (jsonfile:string) => { 
    const configpath = process.env.CONFIG_PATH?process.env.CONFIG_PATH:"";  
    const jsonpath = path.join(configpath,jsonfile); 
    if(!fs.existsSync(jsonpath)){
        throw Error("config file does not exist :"+jsonpath);
    }
    const jsonString = fs.readFileSync(jsonpath, 'utf-8');
    const jsonData = JSON.parse(jsonString);
    return jsonData;
}