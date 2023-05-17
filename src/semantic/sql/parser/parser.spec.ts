import { astify, sqlify } from ".";

const query = "select projectname, percent_cts_to_lcf_totalgrossdollars, division, year from myhubdemandtransposed where division = 'apms-china' and year = 2022 order by percent_cts_to_lcf_totalgrossdollars asc limit 8";
import {parseSelect} from './select';
import {parseWhere} from './where';
import config from '../../config/rover.json';
import { astifyColumn } from "./common";
import { parseOrderby } from "./orderby";

const target = " SELECT "
+" idp `idp`, upper(`my_hub_demand transposed`.`divi sion`) as `division`, "
//+" substring(`time period date`, 7,4) `year`"
+" ROUND(sum(coalesce(NULLIF(`current thinking snapshot - rounded gross demand group currency`,0),0)),2) as `m1` "
+" FROM myhub_data.transposed  "  
+" WHERE idp = 5837 "
+" AND (substring(`time period date`, 7,4) = '2022') GROUP BY 1, 2, 3 ORDER BY 3,4 DESC LIMIT 5000 ";

describe('parser commons', () => {
    test('astifyColumn', async () => {
      const ast  = astifyColumn("ROUND(sum(coalesce(NULLIF(`current thinking snapshot - rounded gross demand group currency`,0),0)),2)", "my_hub_demand_transposed") as any;
    });
});

describe('parser1', () => {
    test('target', async () => {
      const ast  = astify(target) as any;
      console.log("ast",JSON.stringify(ast,null,2))
    });
});

describe('parser2', () => {
    test('sqltree', async () => {
      const ast  = astify(query) as any;
      expect(ast.columns).toBeDefined()
    });

    test('select', async () => {
        const ast  = astify(query) as any;
        const columns = parseSelect(ast,config);
        expect(columns).toBeDefined();
      });

    test('where', async () => {
        const ast  = astify(query) as any;
        const columns = parseWhere(ast,config);
        expect(columns).toBeDefined()
      });

    test('orderby', async () => {
        const ast  = astify(query) as any;
        const orderbycolumns = parseOrderby(ast,config);
        expect(orderbycolumns).toBeDefined();
        console.log("orderbycolumns :",JSON.stringify(orderbycolumns, null, 2))
      });
  });