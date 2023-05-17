import { parse, sqlify } from './parser';
import { transform } from './transformer';


const semanticToSourceSQL = (query:string, config:any) => {
    const queryupper  = query.toUpperCase();
        const source = parse(queryupper, config);
        const target = transform(queryupper, source, config);
        const targetquery = sqlify(target.ast);
}