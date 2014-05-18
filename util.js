;(function(window, document, undefined){

  //When querying the dom, most generally only care about the body
  var body = document.body,
      domChanged = false,
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
      hasMutationObserver = typeof MutationObserver === 'function',
      bodyFragment = hasMutationObserver ? body.cloneNode(true) : body;

  //Set the mutation observer if it's available
  if(hasMutationObserver){

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        domChanged = true;
      });
    });

    // configuration of the observer:
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(body, config);

  }

  //util api functions
  var _util = {

    //querySelector
    '$': function $(selector, parent){
      updateFragment();
      parent = parent || bodyFragment;
      return parent.querySelector(selector);
    },

    //querySelectorAll
    '$$': function $$(selector, parent){
      updateFragment();
      parent = parent || bodyFragment;
      return parent.querySelectorAll(selector);
    },

    //append to parent
    'append': function append(HTML, parent){
      var nodes = typeof HTML === 'string' ? parseHTML(HTML) : HTML,
          frag = parent || document.createDocumentFragment();

      frag.appendChild(nodes);
    }

  };

  //private - update document fragment if a mutation event has fired since last updated.
  function updateFragment(){
    bodyFragment = domChanged ? document.body.cloneNode(true) : bodyFragment;
    return bodyFragment;
  }

  this.util = _util;

})(window, document);
