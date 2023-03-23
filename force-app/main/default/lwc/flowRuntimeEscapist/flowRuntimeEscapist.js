import { LightningElement } from 'lwc';

import FORM_FACTOR from '@salesforce/client/formFactor';

import WEB_ASSETS from '@salesforce/resourceUrl/WebAssets';
import { loadStyle } from 'lightning/platformResourceLoader';

/**
 * Add this component to any lightning__FlowScreen LWC used in Console Applications.
 * Do not add this component to any lightning__FlowScreen LWC used in Standard Applications
 */
export default class FlowRuntimeEscapist extends LightningElement {

  get isDesktop() {
    return FORM_FACTOR === 'Large';
  }

  connectedCallback() {
    if (this.isDesktop) {
      this.loadDesktopCssOverrides();
    }
  }

  loadDesktopCssOverrides() {
    // On Desktop, in a Console App, Flow Screens load with weird styles.
    // 1. Everything loads inside an unnecessary scrollable container
    // 2. Everything is wrapped in an slds-card (dumb white background)
    // These styles target these specific undersirables and remove them.
    const unsetScrollable =
      WEB_ASSETS + '/app/css/unset-scrollable-flow-container.css';
    const unsetFlowSldsCard = WEB_ASSETS + '/app/css/unset-flow-slds-card.css';
    return Promise.all([
      loadStyle(this, unsetScrollable),
      loadStyle(this, unsetFlowSldsCard)
    ])
      .then(() => {
        console.info('desktop css loaded');
      })
      .catch((error) => {
        console.error('error loading css static resource', error.message);
      });
  }
}