const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
let mark;

async function loadSavedCredentialsIfExist() {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
}
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

async function GetMarks(auth, grade, lastname, firstname) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1GfRGWH9PzMkfqhCmgNSN2ejj7ih-W97caYd9QPSgM9c',
        range: grade + ' класс',
    });
    const rows = res.data.values;
    rows.forEach((row) => {
        if (row[0] === lastname + ' ' + firstname) {
            mark = parseFloat(row[10].replace(',', '.'));
        }
    });
}
export default async function handler(req, res) {
    const token = await prisma.user_token.findMany({
        where: {
            token: req.body.token,
        },
    });
    const user = await prisma.user.findMany({
        where: {
            id: token[0].userId,
        },
    });
    const userData = await prisma.user_data.findMany({
        where: {
            userId: user[0].id,
        },
    });

    const grade = userData[0].grade;
    const lastname = user[0].lastname;
    const firstname = user[0].firstname;
    await authorize().then(async (client) => {
        await GetMarks(client, grade, lastname, firstname);
    });
    const marks = await prisma.user_marks_cache.findMany({
        where: { userId: user[0].id },
        orderBy: [{ date: 'desc' }],
    });
    if (marks.length > 0) {
        if (Date.now().valueOf() - marks[0].date.valueOf() <= 21600000) {
            res.status(200).json({ matprak: marks[0].matprak });
            return;
        }
    }

    await prisma.user_marks_cache.create({
        data: {
            userId: user[0].id,
            matprak: mark,
        },
    });

    res.status(200).json({ matprak: mark });
}
