import { astifyColumn } from "../parser/common";

const tranformColumn = (columns : any[], config:any) => {
    const wherecols = columns.map(c => {
        const astcol = astifyColumn(c.config.sql, config.table);
        return {
            ast : astcol.expr,
            path : c.path
        }
    })
    return wherecols;    
}

const updateTargetAST = (wherecols :any[], targetast:any) => {
    wherecols.forEach(c => {
        let childast = targetast;
        for (let index = 0; index < c.path.length-1; index++) {
            childast = childast[c.path[index]];
        }
        childast[c.path[c.path.length-1]] = c.ast;
    });

}


export const transformWhere = (source:any, target:any, config:any) => {
    const wherecols = tranformColumn(source.parsed.where, config);
    const whereast = target.ast.where;
    target['where'] = wherecols;
    updateTargetAST(wherecols, whereast);
}