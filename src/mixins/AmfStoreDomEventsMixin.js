/* eslint-disable class-methods-use-this */
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { EventsTargetMixin } from  '@advanced-rest-client/events-target-mixin';
import { EventTypes } from '../events/EventTypes.js';

/** @typedef {import('../events/StoreEvents').ApiStoreLoadGraphEvent} ApiStoreLoadGraphEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointListOperationsEvent} ApiStoreEndpointListOperationsEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointAddEvent} ApiStoreEndpointAddEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointDeleteEvent} ApiStoreEndpointDeleteEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointReadEvent} ApiStoreEndpointReadEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointUpdateEvent} ApiStoreEndpointUpdateEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreContextEvent} ApiStoreContextEvent */

export const initHandler = Symbol('initHandler');
export const loadGraphHandler = Symbol('loadGraphHandler');
export const endpointListHandler = Symbol('endpointListHandler');
export const endpointListWithOperationsHandler = Symbol('endpointListWithOperationsHandler');
export const endpointListOperationsHandler = Symbol('listOperationsHandler');
export const endpointAddHandler = Symbol('endpointAddHandler');
export const endpointDeleteHandler = Symbol('endpointDeleteHandler');
export const endpointGetHandler = Symbol('endpointGetHandler');
export const endpointUpdateHandler = Symbol('endpointUpdateHandler');

const mxFunction = base => {
  class AmfStoreDomEventsMixin extends EventsTargetMixin(base) {
    /**
     * @param {...any} args Base class arguments
     */
    constructor(...args) {
      super(...args);
      this[initHandler] = this[initHandler].bind(this);
      this[loadGraphHandler] = this[loadGraphHandler].bind(this);
      this[endpointListHandler] = this[endpointListHandler].bind(this);
      this[endpointListWithOperationsHandler] = this[endpointListWithOperationsHandler].bind(this);
      this[endpointListOperationsHandler] = this[endpointListOperationsHandler].bind(this);
      this[endpointAddHandler] = this[endpointAddHandler].bind(this);
      this[endpointDeleteHandler] = this[endpointDeleteHandler].bind(this);
      this[endpointGetHandler] = this[endpointGetHandler].bind(this);
      this[endpointUpdateHandler] = this[endpointUpdateHandler].bind(this);
    }

    /**
     * @param {EventTarget} node
     */
    _attachListeners(node) {
      super._attachListeners(node);
      // Store related events
      node.addEventListener(EventTypes.Store.init, this[initHandler]);
      node.addEventListener(EventTypes.Store.loadGraph, this[loadGraphHandler]);
      // Endpoint related events
      node.addEventListener(EventTypes.Endpoint.list, this[endpointListHandler]);
      node.addEventListener(EventTypes.Endpoint.listWithOperations, this[endpointListWithOperationsHandler]);
      node.addEventListener(EventTypes.Endpoint.listOperations, this[endpointListOperationsHandler]);
      node.addEventListener(EventTypes.Endpoint.add, this[endpointAddHandler]);
      node.addEventListener(EventTypes.Endpoint.delete, this[endpointDeleteHandler]);
      node.addEventListener(EventTypes.Endpoint.get, this[endpointGetHandler]);
      node.addEventListener(EventTypes.Endpoint.update, this[endpointUpdateHandler]);
    }

    /**
     * @override
     * @param {EventTarget} node
     */
    _detachListeners(node) {
      super._detachListeners(node);
      node.removeEventListener(EventTypes.Store.init, this[initHandler]);
      node.removeEventListener(EventTypes.Store.loadGraph, this[loadGraphHandler]);
      // Endpoint related events
      node.removeEventListener(EventTypes.Endpoint.list, this[endpointListHandler]);
      node.removeEventListener(EventTypes.Endpoint.listWithOperations, this[endpointListWithOperationsHandler]);
      node.removeEventListener(EventTypes.Endpoint.listOperations, this[endpointListOperationsHandler]);
      node.removeEventListener(EventTypes.Endpoint.add, this[endpointAddHandler]);
      node.removeEventListener(EventTypes.Endpoint.delete, this[endpointDeleteHandler]);
      node.removeEventListener(EventTypes.Endpoint.get, this[endpointGetHandler]);
      node.removeEventListener(EventTypes.Endpoint.update, this[endpointUpdateHandler]);
    }

    /**
     * @param {CustomEvent} e 
     */
    [initHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.init();
    }

    /**
     * @param {ApiStoreLoadGraphEvent} e 
     */
    [loadGraphHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { model } = e.detail;
      e.detail.result = this.loadGraph(model);
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [endpointListHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listEndpoints();
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [endpointListWithOperationsHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listWithOperations();
    }

    /**
     * @param {ApiStoreEndpointListOperationsEvent} e 
     */
    [endpointListOperationsHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { pathOrId } = e;
      e.detail.result = this.listOperations(pathOrId);
    }

    /**
     * @param {ApiStoreEndpointAddEvent} e 
     */
    [endpointAddHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init } = e;
      e.detail.result = this.addEndpoint(init);
    }

    /**
     * @param {ApiStoreEndpointDeleteEvent} e 
     */
    [endpointDeleteHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e;
      e.detail.result = this.deleteEndpoint(id);
    }

    /**
     * @param {ApiStoreEndpointReadEvent} e 
     */
    [endpointGetHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { pathOrId } = e;
      e.detail.result = this.getEndpoint(pathOrId);
    }

    /**
     * @param {ApiStoreEndpointUpdateEvent} e 
     */
    [endpointUpdateHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e;
      e.detail.result = this.updateEndpointProperty(id, property, value);
    }
  }
  return AmfStoreDomEventsMixin;
}

/**
 * This mixin adds events listeners for DOM events related to the AMF store.
 * It does not provide implementations for the functions called by each handler.
 * This to be mixed in with an instance of the `AmfStoreService`.
 * 
 * The implementation by default listens on the `window` object.
 * Set `eventsTarget` property to listen to the events on a specific node.
 * 
 * @mixin
 */
 export const AmfStoreDomEventsMixin = dedupeMixin(mxFunction);
