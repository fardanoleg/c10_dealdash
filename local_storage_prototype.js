/**
 *  Created by Wade on 10/21/2016.
 *  Prototype of using localStorage for loading and saving the accepted deals and the declined deals.
 *
 *  For this prototype, I have only written and read back the 'Accepted Deal' information, which is
 *  an array of objects, where each object contains a date and a deal-id (randomly generated).
 */

/**
 *  Global data.
 */

/**
 * @type {string} - Keys for looking up our data from localStorage.
 */
var gAcceptedKey = 'DealDashAccepted';
var gDeclinedKey = 'DealDashDeclined';

/**
 * @type {Array} - Arrays of data that we load from localStrorage, modify, and write back.
 */
var gaAccepted = [];
var gaDeclined = [];

/**
 *  isLocalStorageSupported - returns true if browser supports localStorage functions.
 *  @returns {boolean} - true if supported.
 */
function isLocalStorageSupported() {
    return typeof(localStorage) !== 'undefined';
}

/**
 *  loadLocalStorageAccepted()
 *  @returns {object} - Array of objects in local storage.
 */
function loadLocalStorageAccepted() {
    console.log('loadLocalStorageAccepted');
    if (!isLocalStorageSupported()) {
        return [];
    }

    var retArray = JSON.parse(localStorage.getItem(gAcceptedKey));
    if (retArray === null) {
        console.log('loadLocalStorageAccepted: failed to load data');
        retArray = [];
    }
    return retArray;
}

/**
 *  saveLocalStorageAccepted()
 *  @param {object} - Array of objects to place in local storage.
 */
function saveLocalStorageAccepted(data) {
    console.log('saveLocalStorageAccepted: ' + data);
    if (!isLocalStorageSupported()) {
        return;
    }

    localStorage.setItem(gAcceptedKey, JSON.stringify(gaAccepted));
}

/**
 *  getAcceptedString
 *  @returns {string} gaAccepted converted to a printable string.
 */
function getAcceptedString() {
    console.log('getAcceptedString');
    var retString = '[';
    if (gaAccepted !== null) {
        for (var i = 0; i < gaAccepted.length; i++) {
            var obj = gaAccepted[i];
            if (i > 0) {
                retString += ', ';
            }
            retString += '{';
            for (var key in obj) {
                retString += key + ':' + obj[key] + ', ';
            }
            retString += '}'
        }
    }
    retString += ']';
    return retString;
}

/**
 *  Document ready function.
 */
$(document).ready(function() {
    console.log('Document ready');

    // Load in the HTML with whether localStorage is supported on this browser.
    $('#supported').text(isLocalStorageSupported() ? 'true' : 'false');

    // Load the current value of the Accepted array from localStorage.
    gaAccepted = loadLocalStorageAccepted();

    // Print the value into the HTML to look at.
    $('#accepted_deals_current').text(getAcceptedString());

    // Add a new value to the accepted data, using today's date and a random xxxxxx-xxxxxx-xxxx code.
    var temp1 = Math.floor(Math.random() * 900000) + 100000;
    var temp2 = Math.floor(Math.random() * 900000) + 100000;
    var temp3 = Math.floor(Math.random() * 9000) + 1000;
    var tempDealId = '' + temp1 + '-' + temp2 + '-' + temp3;

    gaAccepted.push(
        {   date: new Date(),
            dealId: tempDealId
        });

    // Save the new value of the Accepted array into localStorage.
    saveLocalStorageAccepted(gaAccepted);

    // Print the value into the HTML to look at.
    $('#accepted_deals_new').text(getAcceptedString());
});