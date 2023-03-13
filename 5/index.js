const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');





const sheets = google.sheets({ version: 'v4' });

// Authentication
const auth = new google.auth.GoogleAuth({
    keyFile: 'mythic-flash-380501-196baebc095d.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// ID of the spreadsheet to update
const spreadsheetId = '1vGSaGpPi3iguLlAcjMIebOyvjOesj7X3pLtK9iWSkVM';

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


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { cell, value } = req.body;
    const myUpdates = {
        [cell]: value,
    };
    updateSheetCells('A', myUpdates);
    res.end();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
