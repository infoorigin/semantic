import { convertSQL } from ".";
import { getDBConfig } from "./configcache";
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


const query = "select patients_screened_count, patients_failed_count, study_id, active_flag, enrollment_record_type from study_site_subject_enrollment where study_id = 'RIVAROXHFA3001' and active_flag = 'y' and enrollment_record_type = 'actual'";

describe('semantic', () => {
    test('sql', async () => {
        const sql = convertSQL(query, 'rover');
        expect(sql).toBeDefined();
        console.log("source sql :",sql);
    });
});

describe('configcache', () => {
    test('envfilepath', async () => {
        const configpath = process.env.CONFIG_PATH;  
        expect(configpath).toBeDefined();
    });

    test('dbconfig', async () => {
        const config = getDBConfig('rover');
        expect(config).toBeDefined();
        console.log("dbconfig :",config);
    });
});
