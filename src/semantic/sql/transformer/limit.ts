



export const transformLimit = (source:any, target:any, config:any) => {
    const limitast = source.parsed.limit;
    target.ast.limit = limitast;
}