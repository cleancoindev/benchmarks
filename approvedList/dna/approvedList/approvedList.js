'use strict';

// -----------------------------------------------------------------
//  This stub Zome code file was auto-generated by hc-scaffold
// -----------------------------------------------------------------

/**
 * Called only when your source chain is generated
 * @return {boolean} success
 */
function genesis () {
  // any genesis code here
  return true;
}

// -----------------------------------------------------------------
//  validation functions for every DHT entry change
// -----------------------------------------------------------------

function validateNewEntry(entryName, entry, header, pkg, sources) {
    switch (entryName) {
    case "addressArray":
        // validation code here
        return true;
    case "array_links":
        return true;
    default:
        // invalid entry name!!
        return false;
    }
}

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {*} entry - the entry data to be set
 * @param {?} header - ?
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validateCommit (entryName, entry, header, pkg, sources) {
    return validateNewEntry(entryName, entry, header, pkg, sources);
}

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {*} entry - the entry data to be set
 * @param {?} header - ?
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validatePut (entryName, entry, header, pkg, sources) {
    return validateNewEntry(entryName, entry, header, pkg, sources);
}

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {*} entry - the entry data to be set
 * @param {?} header - ?
 * @param {*} replaces - the old entry data
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validateMod (entryName, entry, header, replaces, pkg, sources) {
  switch (entryName) {
    case "addressArray":
      // validation code here
      return false;
    default:
      // invalid entry name!!
      return false;
  }
}

/**
 * Called to validate any changes to the DHT
 * @param {string} entryName - the name of entry being modified
 * @param {string} hash - the hash of the entry to remove
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validateDel (entryName, hash, pkg, sources) {
  switch (entryName) {
    case "addressArray":
      // validation code here
      return false;
    default:
      // invalid entry name!!
      return false;
  }
}

/**
 * Called to validate any changes to the DHT
 * @param {?} pkg - ?
 * @param {?} sources - ?
 * @return {boolean} is valid?
 */
function validateLink (linkEntryType, baseHash, links, pkg, sources) {
    switch (linkEntryType) {
    case "array_links":
      // validation code here
      return true;
    default:
      // invalid entry name!!
      return false;
  }
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validatePutPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateModPkg (entryName) {
  return null;
}

/**
 * Called to get the data needed to validate
 * @param {string} entryName - the name of entry to validate
 * @return {*} the data required for validation
 */
function validateDelPkg (entryName) {
  return null;
}


// -----------------------------------------------------------------
//  public exposed functions
// -----------------------------------------------------------------

/**
 * Called to create an addressArray
 * @param {mapping} array - the approved address list along with the number of tokens approved
 * @return {string} the hash of the new entry
 */
function addressArrayCreate (mapping) {
    var hash = commit("addressArray",mapping);
    if (!isErr(hash)) {
        commit("array_links",{Links:[{Base:App.DNA.Hash,Link:hash,Tag:"array"}]});
    }
    return hash;
}


/**
 * Called to read an addressArray mapping
 * @param {hash} string - the particular stored addressArray
 * @return {array} the mapping
 */
function addressArrayRead (hash) {
    return get(hash);
}

/**
 * Called to get the hash of the first created array
 * @return {array} the hash
 */
function getArray() {
    var lks = getLinks(App.DNA.Hash,"array");
    if (isErr(lks) || lks.length == 0) {
        return "";
    }
    return lks[0].Hash;
}
