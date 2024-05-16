"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeCarat(name) {
    // Replace "^" with a space
    var cleanName = name.replace(/\^/g, ' ');
    return cleanName;
}
exports.default = removeCarat;
