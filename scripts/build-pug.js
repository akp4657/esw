'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');
const pug = require('pug');
const fs = require('fs');

const wrestlers = JSON.parse(fs.readFileSync('./roster.json', 'utf8'));
const srcPath = upath.resolve(upath.dirname(__filename), '../src');
const baseUrl = process.env.SITE_BASE_URL || 'https://eswwrestling.com';

sh.find(srcPath).forEach(_processFile);

function _processFile(filePath) {
    if (
        filePath.match(/\.pug$/)
        && !filePath.match(/include/)
        && !filePath.match(/mixin/)
        && !filePath.match(/\/pug\/layouts\//)
    ) {
        const locals = { baseUrl };
        if (filePath.endsWith('roster.pug')) {
            locals.wrestlers = wrestlers;
        }
        renderPug(filePath, locals);
    }
}