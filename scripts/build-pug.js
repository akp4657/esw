'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');
const pug = require('pug');
const fs = require('fs');

const wrestlers = JSON.parse(fs.readFileSync('./roster.json', 'utf8'));
const srcPath = upath.resolve(upath.dirname(__filename), '../src');

sh.find(srcPath).forEach(_processFile);

function _processFile(filePath) {
    if (
        filePath.match(/\.pug$/)
        && !filePath.match(/include/)
        && !filePath.match(/mixin/)
        && !filePath.match(/\/pug\/layouts\//)
    ) {
        if (filePath.endsWith('roster.pug')) {
            renderPug(filePath, { wrestlers });
        } else {
            renderPug(filePath);
        }
    }
}