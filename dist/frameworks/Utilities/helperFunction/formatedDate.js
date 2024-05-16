"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(dateString) {
    // Parse the input date string
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    // Construct the formatted date string
    var formattedDate = "".concat(day, "-").concat(month, "-").concat(year);
    return formattedDate;
}
exports.default = formatDate;
