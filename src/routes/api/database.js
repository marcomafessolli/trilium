"use strict";

const sql = require('../../services/sql');
const log = require('../../services/log');
const backupService = require('../../services/backup');
const anonymizationService = require('../../services/anonymization');
const consistencyChecksService = require('../../services/consistency_checks');

async function anonymize() {
    return await anonymizationService.createAnonymizedCopy();
}

async function backupDatabase() {
    return {
        backupFile: await backupService.backupNow("now")
    };
}

function vacuumDatabase() {
    sql.execute("VACUUM");

    log.info("Database has been vacuumed.");
}

function findAndFixConsistencyIssues() {
    consistencyChecksService.runOnDemandChecks(true);
}

module.exports = {
    backupDatabase,
    vacuumDatabase,
    findAndFixConsistencyIssues,
    anonymize
};
