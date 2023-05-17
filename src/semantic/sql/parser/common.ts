import { astify } from ".";

export const findColumnConfig = (colkey:string, config:any) => {
    const measureKeys = Object.keys(config.measures);
    let key = measureKeys.find(k => k.toLowerCase() === colkey.toLowerCase());
    if(key){
        return {
            key,
            config : config.measures[key],
            type : "measure"
        }
    } 
    const dimensionsKeys = Object.keys(config.dimensions);
    key = dimensionsKeys.find(k => k.toLowerCase() === colkey.toLowerCase());
    if(key){
        return {
            key,
            config : config.dimensions[key],
            type : "dimension"
        }
    } 
    // throw exception as config columns is not found

}

export const astifyColumn = (sql:string, table:string) => {
    const sqltemplate = ` SELECT ${sql} FROM ${table}` ;
    const ast = astify(sqltemplate) as any;
    return ast.columns[0];
}