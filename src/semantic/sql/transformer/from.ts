


export const transformFrom = (source: any, target: any, config: any) => {
    const fromast = [{
        db: config.db ? config.db : null,
        table: config.table,
        "as": null
    }]
    target.from = fromast;
    target.ast.from = fromast;
}