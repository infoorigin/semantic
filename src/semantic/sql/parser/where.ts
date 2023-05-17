import {findColumnConfig} from './common';

const conditions = ["=","!=", "<", ">"]
const andor = ["AND", "OR"]
const whereParse = (whereast:any, path:string[],config:any) => {
    let columns: any[] = [];
    const isBinary = whereast?.type == 'binary_expr' ;
    if(isBinary){
        columns = columns.concat(handleBinaryParse(whereast,path,config));
        return columns;
    }
   return columns;
}

const handleBinaryParse = (whereast:any,path:string[],config:any) => {
    const isAndOr = andor.includes(whereast?.operator);
    if(isAndOr){
        const letfcols = whereParse(whereast?.left,[...path,"left"],config ) as any[];
        const rightcols = whereParse(whereast?.right, [...path,"right"], config) as any[];
        return letfcols.concat(rightcols);
    }
    const isCondition  = conditions.includes(whereast?.operator);
    if(isCondition){
        const columns = handleConditionParse(whereast, path, config ) as any[];
        return columns;
    }
    return [] as any;
}

const handleConditionParse = (whereast:any,path:string[],config:any) => {
    const columns: any[] = [];
    if(whereast?.left?.type == "column_ref"){
        columns.push(createWhereColumn(whereast.left, [...path,"left"], config));
    };
    if(whereast?.right?.type == "column_ref"){
        columns.push(createWhereColumn(whereast.right, [...path,"right"], config))
    };
    return columns;
}

const createWhereColumn = (ast:any,path:string[],config:any) => {
    const key = ast.column;
    const columnConfig = findColumnConfig(key,config);
    return {
        path ,
        ...columnConfig,
        ast 
    }
}

export const parseWhere =  (ast:any, config:any, opt?:any) => {
    const path : string[] = []
    const whereast = ast?.where;
    const wherecolumns = whereParse(whereast, path, config);
    return wherecolumns;
}
