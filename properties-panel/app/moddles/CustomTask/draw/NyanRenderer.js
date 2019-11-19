import inherits from 'inherits';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import Cat from '../cat';

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

const TASK_BORDER_RADIUS = 10;

export default function NyanRender(eventBus) {
  BaseRenderer.call(this, eventBus, 1500);

  this.canRender = function(element) {
    return is(element, 'py:TestServiceTask');
  };


  this.drawShape = function(parentNode, shape) {

    const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS, '#52B415');
    svgAppend(parentNode, rect);
    return rect;
/*
    var url = Cat.dataURL;

    var catGfx = svgCreate('image', {
      x: 0,
      y: 0,
      width: shape.width,
      height: shape.height,
      href: url
    });

    svgAppend(parent, catGfx);

    return catGfx;*/
  };
}

inherits(NyanRender, BaseRenderer);

NyanRender.$inject = [ 'eventBus' ];


function drawRect(parentNode, width, height, borderRadius, strokeColor) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: strokeColor || '#000',
    strokeWidth: 2,
    fill: '#44ff4422'
  });

  return rect;
}