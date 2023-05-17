import {getDBConfig} from './configcache';
import { parse, sqlify } from './sql/parser';
import { transform } from './sql/transformer';


/**
 * Converts semantic SQL to source DB SQL
 * @param query 
 * @param dbid 
 * @returns source db sql
 */
export const convertSQL = (query:string, dbid:string) => {
    const config = getDBConfig(dbid);
    const queryupper  = query.toUpperCase();
    const source = parse(queryupper, config);
    const target = transform(queryupper, source, config);
    const targetquery = sqlify(target.ast);
    return targetquery;
}