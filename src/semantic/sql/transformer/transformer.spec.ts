import { parse, astify, sqlify } from "../parser";
import { transformSelect } from "./select";
import { transformWhere } from "./where";
import config from '../../config/rover.json';
import { transformOrderBy } from "./orderby";
import { transformGroupBy } from "./groupby";
import { transform } from ".";


//const query = "select projectname, percent_cts_to_lcf_totalgrossdollars, division, year from myhubdemandtransposed where division = 'apms-china' and year = 2022 order by percent_cts_to_lcf_totalgrossdollars asc limit 8";

const query = "select patients_screened_count, patients_failed_count, study_id, active_flag, enrollment_record_type from study_site_subject_enrollment where study_id = 'RIVAROXHFA3001' and active_flag = 'y' and enrollment_record_type = 'actual'";

describe('transformer', () => {
    test('select', async () => {
        const source = parse(query, config);
        const ast = astify(query);
        const target = { ast } as any;
        transformSelect(source, target, config);
        expect(target.select).toBeDefined();
    });

    test('where', async () => {
        const source = parse(query, config);
        const ast = astify(query);
        const target = { ast } as any;
        transformWhere(source, target, config);
        expect(target.where).toBeDefined();
        console.log("ast:", JSON.stringify(target.ast, null, 2));
    });

    test('orderby', async () => {
        const source = parse(query, config);
        const ast = astify(query);
        const target = { ast } as any;
        transformSelect(source, target, config);
        expect(target.select).toBeDefined();
        transformOrderBy(source, target, config);
        expect(target.orderby).toBeDefined();
    });

    test('groupby', async () => {
        const source = parse(query, config);
        const ast = astify(query);
        const target = { ast } as any;
        transformSelect(source, target, config);
        expect(target.select).toBeDefined();
        transformGroupBy(source, target, config);
        expect(target.groupby).toBeDefined();
        console.log("target.groupby :", JSON.stringify(target.groupby, null, 2));
    });

    test('transform', async () => {
        const queryupper  = query.toUpperCase();
        const source = parse(queryupper, config);
        const target = transform(queryupper, source, config);
        console.log("target :", JSON.stringify(target.ast, null, 2))
        const targetquery = sqlify(target.ast);
        expect(targetquery).toBeDefined();
        console.log("targetquery :",targetquery);
    });
});