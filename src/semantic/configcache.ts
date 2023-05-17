import * as fs from 'fs';

const readJSON = (jsonfile:string) => { 
    const configpath = process.env.CONFIG_PATH;  
    const jsonpath = `${configpath}/${jsonfile}.json`; 
    const jsonString = fs.readFileSync(jsonpath, 'utf-8');
    const jsonData = JSON.parse(jsonString);
    return jsonData;
}
const dbconfigs = new Map<string, any>();

export const getDBConfig = (dbid:string) => {
    
        if(!dbconfigs.has(dbid)){
            const configjson = readJSON(dbid);
            dbconfigs.set(dbid,configjson);
        }
        return dbconfigs.get(dbid);
}