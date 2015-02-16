(function() {

  // Some global variables (database, references to key UI elements)
  var db, input, ul;

  databaseOpen(function() {
    input = document.querySelector('input');
    ul = document.querySelector('ul');
    document.body.addEventListener('submit', onSubmit);
    document.body.addEventListener('click', onClick);
    databaseTodosGet(renderAllTodos);
  });

  function onClick(e) {

    // We'll assume any element with an ID attribute
    // is a todo item. Don't try this at home!
    if (e.target.hasAttribute('id')) {

      // Note because the id is stored in the DOM, it becomes
      // a string so need to make it an integer again
      databaseTodosDelete(parseInt(e.target.getAttribute('id'), 10), function() {
        databaseTodosGet(renderAllTodos);
      });
    }
  }

  function renderAllTodos(todos) {
    var html = '';
    console.log(todos.length);
    todos.reverse().forEach(function(todo) {
      html += todoToHtml(todo);
    });
    ul.innerHTML = html;
  }

  function todoToHtml(todo) {
    return '<li id="'+todo.timeStamp+'">'+todo.text+'</li>';
  }

  function onSubmit(e) {
    e.preventDefault();
    // Convert input to grams
    var grams = gramConverter(input.value);
    databaseTodosAdd(grams, function() {
    // After new todos have been added - rerender all the todos
    databaseTodosGet(renderAllTodos);
      input.value = '';
    });
  }

  function gramConverter(str) {
    var itemInput = str.toLowerCase().split(' '),
        itemFluidCheck = str.toLowerCase().split(' '),
        quantityInput = itemInput.shift(),
        unitInput = '';
        ingredientInput = '';

    if (itemFluidCheck[1] === 'fluid' || itemFluidCheck[1] === 'fl' || itemFluidCheck[1] === 'fl.') {
      unitInput = 'floz';
      ingredientInput = itemFluidCheck.slice(3).join(' ');
    } else if (str.split(' ')[1] === 'T') {
      unitInput = 'T';
      ingredientInput = itemFluidCheck.slice(2).join(' ');
    } else {
      unitInput = itemInput.shift();
      ingredientInput = itemInput.join(' ');
    }

    var unitToAbbreviations = [
      { 'unit': 't', 'abbreviation': 't' },
      { 'unit': 't.', 'abbreviation': 't' },
      { 'unit': 'tsp', 'abbreviation': 't' },
      { 'unit': 'tsp.', 'abbreviation': 't' },
      { 'unit': 'tsps', 'abbreviation': 't' },
      { 'unit': 'teas', 'abbreviation': 't' },
      { 'unit': 'teas.', 'abbreviation': 't' },
      { 'unit': 'teaspoon', 'abbreviation': 't' },
      { 'unit': 'teaspoons', 'abbreviation': 't' },
      { 'unit': 'T', 'abbreviation': 'T' },
      { 'unit': 'tbsp', 'abbreviation': 'T' },
      { 'unit': 'tbsp.', 'abbreviation': 'T' },
      { 'unit': 'tbsps', 'abbreviation': 'T' },
      { 'unit': 'tablespoon', 'abbreviation': 'T' },
      { 'unit': 'tablespoons', 'abbreviation': 'T' },
      { 'unit': 'floz', 'abbreviation': 'floz' },
      { 'unit': 'fl oz', 'abbreviation': 'floz' },
      { 'unit': 'fl. oz', 'abbreviation': 'floz' },
      { 'unit': 'fluid ounce', 'abbreviation': 'floz' },
      { 'unit': 'fluid ounces', 'abbreviation': 'floz' },
      { 'unit': 'c', 'abbreviation': 'c' },
      { 'unit': 'c.', 'abbreviation': 'c' },
      { 'unit': 'cup', 'abbreviation': 'c' },
      { 'unit': 'cups', 'abbreviation': 'c' },
      { 'unit': 'p', 'abbreviation': 'pt' },
      { 'unit': 'p.', 'abbreviation': 'pt' },
      { 'unit': 'pt', 'abbreviation': 'pt' },
      { 'unit': 'pt.', 'abbreviation': 'pt' },
      { 'unit': 'pint', 'abbreviation': 'pt' },
      { 'unit': 'pints', 'abbreviation': 'pt' },
      { 'unit': 'q', 'abbreviation': 'qt' },
      { 'unit': 'q.', 'abbreviation': 'qt' },
      { 'unit': 'qt', 'abbreviation': 'qt' },
      { 'unit': 'qt.', 'abbreviation': 'qt' },
      { 'unit': 'quart', 'abbreviation': 'qt' },
      { 'unit': 'quarts', 'abbreviation': 'qt' },
      { 'unit': 'gal', 'abbreviation': 'gal' },
      { 'unit': 'gal.', 'abbreviation': 'gal' },
      { 'unit': 'gallon', 'abbreviation': 'gal' },
      { 'unit': 'lb', 'abbreviation': 'lb' },
      { 'unit': 'lb.', 'abbreviation': 'lb' },
      { 'unit': 'lbs', 'abbreviation': 'lb' },
      { 'unit': 'pound', 'abbreviation': 'lb' },
      { 'unit': 'pounds', 'abbreviation': 'lb' },
      { 'unit': 'oz', 'abbreviation': 'oz' },
      { 'unit': 'oz.', 'abbreviation': 'oz' },
      { 'unit': 'ozs', 'abbreviation': 'oz' },
      { 'unit': 'ozes', 'abbreviation': 'oz' },
      { 'unit': 'ounce', 'abbreviation': 'oz' },
      { 'unit': 'ounces', 'abbreviation': 'oz' },
      { 'unit': 'ml', 'abbreviation': 'ml' },
      { 'unit': 'mls', 'abbreviation': 'ml' },
      { 'unit': 'milli', 'abbreviation': 'ml' },
      { 'unit': 'milliliter', 'abbreviation': 'ml' },
      { 'unit': 'milliliters', 'abbreviation': 'ml' },
      { 'unit': 'dl', 'abbreviation': 'dl' },
      { 'unit': 'deciliter', 'abbreviation': 'dl' },
      { 'unit': 'deciliters', 'abbreviation': 'dl' },
      { 'unit': 'l', 'abbreviation': 'l' },
      { 'unit': 'liter', 'abbreviation': 'l' },
      { 'unit': 'liters', 'abbreviation': 'l' },
      { 'unit': 'g', 'abbreviation': 'g' },
      { 'unit': 'gram', 'abbreviation': 'g' },
      { 'unit': 'grams', 'abbreviation': 'g' }
    ];
    var unitToMilliliters = [
      { 'unit': 'ml', 'conversion': 1 },
      { 'unit': 'dl', 'conversion': 100 },
      { 'unit': 'l', 'conversion': 1000 },
      { 'unit': 't', 'conversion': 5 },
      { 'unit': 'T', 'conversion': 14.8 },
      { 'unit': 'floz', 'conversion': 29.6 },
      { 'unit': 'c', 'conversion': 236.6 },
      { 'unit': 'pt', 'conversion': 473 },
      { 'unit': 'qt', 'conversion': 946.4 },
      { 'unit': 'gal', 'conversion': 3785.4 },
      { 'unit': 'lb', 'conversion': 453.6 },
      { 'unit': 'oz', 'conversion': 28.3 }
    ];
    var ingredients = [
      { 'ingredient': 'water', 'density': 1 },
      // FLOURS
      { 'ingredient': 'flour', 'density': 0.58 },
      { 'ingredient': 'all purpose flour', 'density': 0.58 },
      { 'ingredient': 'all-purpose flour', 'density': 0.58 },
      { 'ingredient': 'white flour', 'density': 0.58 },
      { 'ingredient': 'wheat flour', 'density': 0.51 },
      { 'ingredient': 'rye flour', 'density': 0.54 },
      // JAMS & JELLIES
      { 'ingredient': 'jam', 'density': 1.4 },
      { 'ingredient': 'jelly', 'density': 1.4 },
      { 'ingredient': 'preserves', 'density': 1.4 },
      // SUGARS
      { 'ingredient': 'honey', 'density': 1.4 },
      { 'ingredient': 'sugar', 'density': 0.85 },
      { 'ingredient': 'powdered sugar', 'density': 0.81 }
    ];
    var gramsInLb = 453.6;
    var gramsInOz = 28.3;

    var ingredientDensity = _.result(_.find(ingredients, { 'ingredient': ingredientInput  }), 'density');
    var unitAbrev = _.result(_.find(unitToAbbreviations, { 'unit': unitInput }), 'abbreviation');
    var unitInMill = _.result(_.find(unitToMilliliters, { 'unit': unitAbrev  }), 'conversion');

    // If already submited as grams, return original weight
    if (unitAbrev === 'g') {
      return str.toLowerCase();
    }

    // If lbs or oz, straight conversion by weight
    if (unitAbrev === 'lb' || unitAbrev === 'oz') {
      return Math.round(quantityInput * unitInMill) + ' grams ' + ingredientInput  + ' = ' + input.value;
    }

    // Convert from volume to weight by density
    var result = Math.round(quantityInput * unitInMill * ingredientDensity) + ' grams ' + ingredientInput  + ' = ' + input.value;

    // Check for errors
    var errorCheck = result.split(' ');
    if (errorCheck[0] === 'NaN') {
      return 'Incorrect Input. Please Try Again.';
    }
    return result;
  }

  function databaseOpen(callback) {
    // Open a database, specify the name and version
    var version = 1;
    var request = indexedDB.open('todos', version);

    // Run migrations if necessary
    request.onupgradeneeded = function(e) {
      db = e.target.result;
      e.target.transaction.onerror = databaseError;
      db.createObjectStore('todo', { keyPath: 'timeStamp' });
    };

    request.onsuccess = function(e) {
      db = e.target.result;
      callback();
    };
    request.onerror = databaseError;
  }

  function databaseError(e) {
    console.error('An IndexedDB Error has occurred', e);
  }

  function databaseTodosAdd(text, callback) {
    var transaction = db.transaction(['todo'], 'readwrite');
    var store = transaction.objectStore('todo');
    var request = store.put({
      text: text,
      timeStamp: Date.now()
    });

    transaction.oncomplete = function(e) {
      callback();
    };
    request.onerror = databaseError;
  }

  function databaseTodosGet(callback) {
    var transaction = db.transaction(['todo'], 'readonly');
    var store = transaction.objectStore('todo');

    // Get everything in the store
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);

    // This fires once per row in the store, so for simplicity
    // collect the data in an array (data) and send it pass it
    // in the callback in one go
    var data = [];
    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;

      // If there's data, add it to array
      if (result) {
        data.push(result.value); 
        result.continue();

      // Reach the end of the data
      } else {
        callback(data);
      }
    };
  }

  function databaseTodosDelete(id, callback) {
    var transaction = db.transaction(['todo'], 'readwrite');
    var store = transaction.objectStore('todo');
    var request = store.delete(id);
    transaction.oncomplete = function(e) {
      callback();
    };
    request.onerror = databaseError;
  }

}());
