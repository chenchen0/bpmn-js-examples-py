var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

var is = require('bpmn-js/lib/util/ModelUtil').is;

module.exports = function(group, element) {
  // only return an entry, if the currently selected element is a start event
  if (is(element, 'bpmn:Task')) {
    group.entries.push(entryFactory.textField({
      id : 'prop1',
      description : 'Service prop test',
      label : 'Prop1',
      modelProperty : 'prop1'
    }));
  }
};