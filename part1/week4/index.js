/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
	if (arguments.length === 1) {
		return collection;
	}
	var filterOperations = [];
	var selectOperations = [];
	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i][0] === 'filter') {
			filterOperations.push(arguments[i][1]);
		}
		if (arguments[i][0] === 'select') {
			selectOperations.push(arguments[i][1]);
		}
	}
	var filter = calculateFilterOptions(filterOperations);
	var clearSelect = removeBreakValues(selectOperations, collection);
	var select = selectClear(clearSelect);
	var filteredCollection = filterCollection(collection, filter);
	var resultCollection = selectFromFilteredCollection(filteredCollection, select);
	return resultCollection;
}

/**
 * @params {String[]}
 */
function select() {
	var fields = [];
	for (var i = 0; i < arguments.length; i++) {
		if (!fields.includes(arguments[i])) {
			fields.push(arguments[i]);
		}
	}
	return ['select', fields];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
	var fields = [];
	for (var i = 0; i < values.length; i++) {
		if (!fields.includes(values[i])) {
			fields.push(values[i]);
		}
	}
	return ['filter', [property, fields]];
}

function calculateFilterOptions(filterOperations) {
	var resultToReturn = {};
	var filter = filterOperations.slice();
	for (var i = 0; i < filter.length; i++) {
		var prop = filter[i][0];
		var fields = filter[i][1];
		if (prop && fields && !resultToReturn.hasOwnProperty(prop)) {
			resultToReturn[prop] = fields;
			continue;
		}
		var tempFieldsArray = resultToReturn[prop].slice();
		resultToReturn[prop] = [];
		for (var j = 0; j < fields.length; j++) {
			if (tempFieldsArray.includes(fields[j])) {
				resultToReturn[prop].push(fields[j]);
			}
		}
		
	}
	return resultToReturn;
}

function removeBreakValues(selectOperations, collection) {
	var resultToReturn;
	if (selectOperations && selectOperations.length > 0) {
		for (var i = 0; i < selectOperations.length; i++) {
			var tempArray = [];
			for (var j = 0; j < selectOperations[i].length; j++) {
				if (isFieldInObject(selectOperations[i][j], collection)) {
					tempArray.push(selectOperations[i][j]);
				}
			}
			if (tempArray.length > 0) {
				if (!resultToReturn) {
					resultToReturn = [];
				}
				resultToReturn.push(tempArray);
			}
		}
	}
	return resultToReturn;
}

function selectClear(clearSelect) {
	var resultToReturn;
	if (clearSelect && clearSelect.length > 0) {
		for (var i = 0; i < clearSelect.length; i++) {
			if (!resultToReturn) {
				resultToReturn = clearSelect[i];
				continue;
			}
			var tempFieldsArray = resultToReturn.slice();
			resultToReturn = [];
			for (var j = 0; j < clearSelect[i].length; j++) {
				if (tempFieldsArray.includes(clearSelect[i][j])) {
					resultToReturn.push(clearSelect[i][j]);
				}
			}
		}
	}
	return resultToReturn;
}

function filterCollection(collection, filter) {
	if (!filter) {
		return collection;
	}
	var resultCollection = [];
	for (var i = 0; i < collection.length; i++) {
		var isToAdd = true;
		for (var j = 0; j < Object.keys(filter).length; j++) {
			var prop = Object.keys(filter)[j];
			if (!filter[prop].includes(collection[i][prop])) {
				isToAdd = false;
			}
		}
		if (isToAdd) {
			resultCollection.push(collection[i]);
		}
	}
	return resultCollection;
}

function selectFromFilteredCollection(collection, fields) {
	if (!fields) {
		return collection;
	}
	var resultCollection = [];
	for (var i = 0; i < collection.length; i++) {
		var tempElement = {};
		for (var j = 0; j < fields.length; j++) {
			if (collection[i].hasOwnProperty(fields[j])) {
				tempElement[fields[j]] = collection[i][fields[j]];
			}
		}
		if (Object.keys(tempElement).length !== 0) {
			resultCollection.push(tempElement);
		}
	}
	return resultCollection;
}

function isFieldInObject(field, collection) {
	for (var i = 0; i < collection.length; i++) {
		if (collection[i].hasOwnProperty(field)) {
			return true;
		}
	}
	return false;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
