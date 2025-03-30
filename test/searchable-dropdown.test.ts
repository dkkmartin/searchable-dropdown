import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { SearchableDropdown } from '../src/SearchableDropdown.js';
import '../src/searchable-dropdown.js';

describe('SearchableDropdown', () => {
  it('should render', async () => {
    const el = await fixture<SearchableDropdown>(
      html`<searchable-dropdown></searchable-dropdown>`,
    );
    expect(el).to.exist;
  });

  it('should render with isOpen set to false as default', async () => {
    const el = await fixture<SearchableDropdown>(
      html`<searchable-dropdown></searchable-dropdown>`,
    );
    expect(el.isOpen).to.equal(false);
  });

  it('should render with isOpen set to true when the isOpen attribute is set', async () => {
    const el = await fixture<SearchableDropdown>(
      html`<searchable-dropdown isOpen></searchable-dropdown>`,
    );
    expect(el.isOpen).to.equal(true);
  });

  it('should render with a list of options', async () => {
    const el = await fixture<SearchableDropdown>(
      html`<searchable-dropdown></searchable-dropdown>`,
    );
    const list = ['apple', 'banana', 'cherry'];
    el.optionsList = list;
    await el.updateComplete;
    expect(el.optionsList).to.deep.equal(list);
  });

  it('should pass a11y aXe accessibility checks', async () => {
    const el = await fixture<SearchableDropdown>(
      html`<searchable-dropdown></searchable-dropdown>`,
    );
    await expect(el).to.be.accessible();
  });
});
