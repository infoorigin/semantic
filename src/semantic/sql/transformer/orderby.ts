const orderbytemplate = {
    "expr": {
      "type": "number",
      "value": 1
    },
    "type": "DESC"
  };

  const orderbycolumns = [                                                                                             
    {                                                                                                            
      "key": "percent_CTS_to_LCF_TotalGrossDollars",                                                             
      "config": {                                                                                                
        "sql": "ROUND(coalesce(NULLIF((((sum(`latest cf - rounded total gross dollars`)/ sum(`current thinking snapshot - rounded total gross dollars`))-1)*100),0),0),2)",
        "type": "number"
      },
      "type": "measure",
      "ast": {
        "expr": {
          "type": "column_ref",
          "table": null,
          "column": "percent_cts_to_lcf_totalgrossdollars"
        },
        "type": "ASC"
      }
    }
  ]
  

  export const transformOrderBy = (source :any , target:any, config:any) => {
    const targetCols = target.select;
    const orderbycols = source.parsed.orderby ? source.parsed.orderby :[];
    const tranformColumns = orderbycols.map( (c:any) => {
        const index = targetCols.findIndex((t:any) => t.key === c.key) + 1;
        const orderby = {...orderbytemplate, expr: {...orderbytemplate.expr}};
        orderby.expr.value = index;
        return orderby;
    })
    target['orderby'] = tranformColumns;
    target.ast.orderby = tranformColumns;
  }