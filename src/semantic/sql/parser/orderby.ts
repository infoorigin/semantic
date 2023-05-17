import { findColumnConfig } from './common';


export const parseOrderby = (ast: any, config: any, opt?: any) => {
    const orderbycols = ast?.orderby ? ast.orderby : [];

    const orderbyparsed = orderbycols
        .filter((c: any) => c?.expr?.type == "column_ref")
        .map((c: any) => {
            const key = c.expr.column;
            const columnConfig = findColumnConfig(key, config);
            return {
                ...columnConfig,
                ast: c
            }
        })
    return orderbyparsed;

}