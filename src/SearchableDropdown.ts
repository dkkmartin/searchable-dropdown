/**
 * Searchable Dropdown Component
 *
 * This component is a custom implementation of the W3C ARIA example for a combobox.
 * It includes the main ARIA roles and keyboard controls like Arrows, Enter, Escape.
 * Doesn't have every feature from the full W3C pattern, mostly just the basics from the example.
 *
 * Reference:
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
 */

import { html, css, LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

export class SearchableDropdown extends LitElement {
  @property({ type: Array }) public optionsList: string[] = [];

  @property({ type: String }) public selectedOption = '';

  @property({ type: Boolean }) public isOpen = false;

  @state() private filteredOptions: string[] = this.optionsList;

  @state() private activeOptionIndex = -1;

  // AI-generated code
  // The options list wasn't updating when the `optionsList` property was changed externally.
  // This happened because the external script modifying `optionsList` runs after the component's initial render,
  // so the update wasn't applied in time.

  // The solution is using Lit's own `updated` lifecycle callback
  updated(changedProperties: PropertyValues<this>) {
    // Check if the optionsList property has changed
    if (changedProperties.has('optionsList')) {
      // Reset filteredOptions to the new optionsList
      this.filteredOptions = this.optionsList;
    }
  }

  // Open the dropdown
  private _open() {
    this.isOpen = true;
  }

  // Close the dropdown
  private _close() {
    this.isOpen = false;
    this.activeOptionIndex = -1;
  }

  // Toggle the dropdown
  private _toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // Sets the selected option based on the provided value and closes the dropdown.
  private _selectOptionAndClose(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    // Reset active index when an option is selected directly
    this.activeOptionIndex = -1;
    // Emit the selected option event
    this._emitSelectedOption();
  }

  // Move up one option
  private _moveUp() {
    if (this.activeOptionIndex <= 0) {
      // At top, loop to bottom
      this.activeOptionIndex = this.filteredOptions.length - 1;
    } else {
      // Move up one
      this.activeOptionIndex -= 1;
    }
  }

  // Move down one option
  private _moveDown() {
    if (this.activeOptionIndex >= this.filteredOptions.length - 1) {
      // At bottom, loop to top
      this.activeOptionIndex = 0;
    } else {
      // Move down one
      this.activeOptionIndex += 1;
    }
  }

  // Selects the option currently highlighted via keyboard navigation (activeOptionIndex).
  private _selectHighlightedOption() {
    // Check if there is a valid highlighted option
    if (
      this.activeOptionIndex >= 0 &&
      this.activeOptionIndex < this.filteredOptions.length
    ) {
      this._selectOptionAndClose(this.filteredOptions[this.activeOptionIndex]);
    } else {
      // Close the dropdown when Enter is pressed with no active selection
      this._close();
    }
  }

  // Emits the selected option for event listeners to consume
  private _emitSelectedOption() {
    const myEvent = new CustomEvent('selected-option', {
      detail: { value: this.selectedOption },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  // Filter options based on input
  private _filterOptions(e: Event) {
    const filterText = (e.target as HTMLInputElement).value.toLowerCase();
    this._open();
    this.activeOptionIndex = -1;
    this.filteredOptions = this.optionsList.filter(option =>
      option.toLowerCase().includes(filterText),
    );
  }

  // Handle keydown events
  private handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Move selection down
        this._moveDown();
        break;

      case 'ArrowUp':
        e.preventDefault();
        // Move selection up
        this._moveUp();
        break;

      case 'Enter':
        e.preventDefault();
        // Select the currently highlighted option
        this._selectHighlightedOption();
        break;

      case 'Escape':
        // Close dropdown on escape key
        this._close();
        break;

      default:
        break;
    }
  }

  render() {
    return html`
      <label for="fruits-input">Select a fruit:</label>
      <div class="combobox combobox-list">
        <div class="group">
          <input
            id="fruits-input"
            class="cb_edit"
            type="text"
            role="combobox"
            aria-label="Fruits"
            aria-autocomplete="list"
            aria-expanded=${this.isOpen}
            aria-controls="fruits-listbox"
            aria-activedescendant=${this.activeOptionIndex >= 0
              ? `lb-fruit-${this.activeOptionIndex}`
              : ''}
            .value=${this.selectedOption}
            @click=${this._toggleOpen}
            @input=${this._filterOptions}
            @keydown=${this.handleKeyDown}
          />
          <button
            id="fruits-button"
            aria-label="Fruits"
            aria-expanded=${this.isOpen}
            aria-controls="fruits-listbox"
            @click=${this._toggleOpen}
          >
            <svg
              width="18"
              height="16"
              aria-hidden="true"
              focusable="false"
              style="forced-color-adjust: auto"
            >
              <polygon
                class="arrow"
                stroke-width="0"
                fill-opacity="0.75"
                fill="currentcolor"
                points="3,6 15,6 9,14"
              ></polygon>
            </svg>
          </button>
        </div>
        <ul
          id="fruits-listbox"
          role="listbox"
          aria-label="Fruits"
          class=${this.isOpen ? 'visible' : ''}
        >
          ${this.filteredOptions.map(
            (option, index) =>
              // Keyboard navigation is handled by the `handleKeyDown` method.
              // eslint-disable-next-line lit-a11y/click-events-have-key-events
              html`<li
                id="lb-fruit-${index}"
                role="option"
                class=${index === this.activeOptionIndex ? 'active' : ''}
                aria-selected=${this.selectedOption === option
                  ? 'true'
                  : 'false'}
                .value=${index}
                @click=${() => this._selectOptionAndClose(option)}
              >
                ${option}
              </li>`,
          )}
        </ul>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--searchable-dropdown-text-color, #000);
    }

    .combobox-list {
      position: relative;
    }

    .combobox .group {
      display: inline-flex;
      padding: 4px;
      cursor: pointer;
    }

    .combobox input,
    .combobox button {
      background-color: white;
      color: black;
      box-sizing: border-box;
      height: 30px;
      padding: 0;
      margin: 0;
      vertical-align: bottom;
      border: 1px solid gray;
      position: relative;
      cursor: pointer;
    }

    .combobox input {
      width: 150px;
      border-right: none;
      outline: none;
      font-size: 87.5%;
      padding: 1px 3px;
    }

    .combobox button {
      width: 19px;
      border-left: none;
      outline: none;
      color: rgb(0 90 156);
    }

    .combobox button[aria-expanded='true'] svg {
      transform: rotate(180deg) translate(0, -3px);
    }

    ul[role='listbox'] {
      margin: 0;
      padding: 0;
      position: absolute;
      left: 4px;
      top: 34px;
      list-style: none;
      background-color: white;
      display: none;
      box-sizing: border-box;
      border: 2px currentcolor solid;
      max-height: 250px;
      width: 168px;
      overflow: scroll;
      overflow-x: hidden;
      font-size: 87.5%;
      cursor: pointer;
    }

    ul[role='listbox'].visible {
      display: block;
    }

    ul[role='listbox'] li[role='option'] {
      margin: 0;
      display: block;
      padding-left: 3px;
      padding-top: 2px;
      padding-bottom: 2px;
      text-transform: capitalize;
    }

    ul[role='listbox'] li[role='option'].active {
      background-color: #def;
    }

    /* focus and hover styling */

    .combobox .group.focus,
    .combobox .group:hover {
      padding: 2px;
      border: 2px solid currentcolor;
      border-radius: 4px;
    }

    .combobox .group.focus polygon,
    .combobox .group:hover polygon {
      fill-opacity: 1;
    }

    .combobox .group.focus input,
    .combobox .group.focus button,
    .combobox .group input:hover,
    .combobox .group button:hover {
      background-color: #def;
    }

    [role='listbox'].focus [role='option'][aria-selected='true'],
    [role='listbox'] [role='option']:hover {
      background-color: #def;
      padding-top: 0;
      padding-bottom: 0;
      border-top: 2px solid currentcolor;
      border-bottom: 2px solid currentcolor;
    }
  `;
}
