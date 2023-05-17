
import {findColumnConfig} from './common';

export const parseSelect = (ast:any, config:any, opt?:any) => {
    const astcolumns = ast.columns;
    const columns = astcolumns.map((c:any) => {
        const key = c?.expr?.type === 'column_ref' ? c.expr.column :"";
        const columnConfig = findColumnConfig(key,config);
        //const colkey = 
        return {
            ...columnConfig,
            ast:c
        } 
    })
    return columns;
}

