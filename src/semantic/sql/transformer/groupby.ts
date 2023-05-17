

export const transformGroupBy = (source: any, target: any, config: any) => {
    const isMeasurePresent = target.select.find((c: any) => c.type === 'measure');
    if (isMeasurePresent) {
        const groupbycols = target.select
            .map((c: any, index: number) => {
                return {
                    ...c,
                    index : index+1
                }
            }).filter((c: any) => {
                return c.type === 'dimension'
            }).map((c: any) => {
                return {
                    type: 'number',
                    value: c.index
                }
            })

        target['groupby'] = groupbycols;
        target.ast.groupby = groupbycols;
    }
}