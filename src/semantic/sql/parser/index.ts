import { Parser } from 'node-sql-parser';
import {parseSelect} from './select';
import {parseWhere} from './where';
import { parseFrom } from './from';
import { parseLimit } from './limit';
import { parseOrderby } from './orderby';

const parser = new Parser();

const astify = (sql:string , opt?:any)  => {
    const ast = parser.astify(sql, opt);
    return ast;
}

const sqlify = (ast:any, opt?:any) => {
    const sql = parser.sqlify(ast, opt);
    return sql;
}

const parse = (sql:string , config:any, opt?:any) => {
    const ast = astify(sql, opt);
    const columns = parseSelect(ast,config);
    const where = parseWhere(ast,config);
    const from = parseFrom(ast, config);
    const limit = parseLimit(ast, config);
    const orderby = parseOrderby(ast, config);
    return {
        ast, sql, parsed : {select:columns, where, from, limit, orderby}
    }

}

export {astify, sqlify, parse}