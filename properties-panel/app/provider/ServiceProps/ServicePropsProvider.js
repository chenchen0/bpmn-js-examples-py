'use strict';

var CamundaPropertiesProvider = require('bpmn-js-properties-panel/lib/provider/camunda/CamundaPropertiesProvider');

var inherits = require('inherits');
var PropertiesActivator = require('../PropertiesActivator');

// Require your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "spell" property.
var serviceProps = require('./parts/ServiceProps');

// Create the custom magic tab
function createSerivcePropTabGroups(element, elementRegistry) {

  // Create a group called "Black Magic".
  var servicePropsGroup = {
    id: 'py-service-props',
    label: 'Service Props',
    entries: []
  };

  // Add the spell props to the black magic group.
  serviceProps(servicePropsGroup, element);

  return [
    servicePropsGroup
  ];
}

function ServicePropsProvider(
    eventBus, canvas, bpmnFactory, elementRegistry, elementTemplates, translate) {

  PropertiesActivator.call(this, eventBus);

  var camundaProvider = new CamundaPropertiesProvider(eventBus, canvas, bpmnFactory, elementRegistry, elementTemplates, translate);

  this.getTabs = function(element) {

    /*var generalTab = {
      id: 'general',
      label: translate('General'),
      groups: createGeneralTabGroups(
        element, canvas, bpmnFactory, elementRegistry, translate)
    };*/

    var serviceTab = {
      id: 'py-service',
      label: 'Service',
      groups: createSerivcePropTabGroups(element, elementRegistry)
    };

    var camundaTabs = camundaProvider.getTabs(element);
    camundaTabs.splice(1, 0, serviceTab);
    return camundaTabs;
  };
}

//ServicePropsProvider.prototype = new CamundaPropertiesProvider();

ServicePropsProvider.$inject = [
  'eventBus',
  'canvas',
  'bpmnFactory',
  'elementRegistry',
  'elementTemplates',
  'translate'
];

inherits(ServicePropsProvider, PropertiesActivator);

module.exports = ServicePropsProvider;
