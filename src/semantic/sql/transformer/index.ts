import { astify } from "../parser";
import { transformFrom } from "./from";
import { transformGroupBy } from "./groupby";
import { transformLimit } from "./limit";
import { transformOrderBy } from "./orderby";
import { transformSelect } from "./select";
import { transformWhere } from "./where";


export const transform = (query:string, source:any, config:any) => {
    const ast = astify(query);
    const target = {ast} as any;
    transformSelect(source,target,config);
    transformWhere(source,target,config);
    transformGroupBy(source,target,config);
    transformLimit(source,target,config);
    transformOrderBy(source,target,config);
    transformFrom(source,target,config);
    return target;
}