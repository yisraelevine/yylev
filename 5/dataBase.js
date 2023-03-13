const { google } = require('googleapis');
const sheets = google.sheets({ version: 'v4' });

// Authentication
const auth = new google.auth.GoogleAuth({
    keyFile: 'mythic-flash-380501-196baebc095d.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// ID of the spreadsheet to update
const spreadsheetId = '1vGSaGpPi3iguLlAcjMIebOyvjOesj7X3pLtK9iWSkVM';

/**
 * Updates cells in a Google Sheets spreadsheet.
 * @param {string} sheetName - The name of the sheet to update.
 * @param {Object} updates - An object representing the updates to make, where each key is a cell in A1 notation and each value is the new value to set.
 */
async function updateSheetCells(sheetName, updates) {
    try {
        const data = Object.entries(updates).map(([cell, value]) => ({
            range: `${sheetName}!${cell}`,
            values: [[value]],
        }));

        const response = await sheets.spreadsheets.values.batchUpdate({
            auth,
            spreadsheetId,
            resource: { data, valueInputOption: 'USER_ENTERED' },
        });

        console.log(`Updated ${response.data.totalUpdatedCells} cells in ${sheetName}`);
    } catch (err) {
        console.error(err);
    }
}

// Example usage:
const myUpdates = {
    A2: '1',
    B2: '2',
    C2: '3',
    D2: '4',
};

updateSheetCells('A', myUpdates);
