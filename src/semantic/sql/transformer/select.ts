import { astifyColumn } from "../parser/common";

const coltypeorder :any = {dimension:1, measure:2} 

const tranformColumn = (columns : any[], config:any) => {
    //todo sorting based on hierarchy
    const sortedcols = [...columns].sort((a:any, b:any) => {
        return coltypeorder[a.type]   - coltypeorder[b.type]
    });
    const astcols = sortedcols.map(c => {
        const astcol = astifyColumn(c.config.sql, config.table);
        astcol['as'] = c.key;
        return { ast : astcol, key :c.key, type:c.type }; 
    })
    return astcols;    
}

export const transformSelect = (source :any , target:any, config:any) => {
    const targetCols = tranformColumn(source.parsed.select, config);
    target['select'] = targetCols;
    const astcols = targetCols.map((c:any) => {
        return c.ast;
    })
    target.ast.columns = astcols;
}