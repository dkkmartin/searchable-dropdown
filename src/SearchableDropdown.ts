import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

export class SearchableDropdown extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--searchable-dropdown-text-color, #000);
    }

    .container {
      position: relative;
      display: flex;
      width: fit-content;
      flex-direction: column;
      border: 1px solid #000;
      border-radius: 5px;
      padding: 5px;
    }

    select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    option {
      text-transform: capitalize;
    }

    .dropdown-container {
      z-index: 99;
    }

    button {
      transform: rotate(180deg);
      cursor: pointer;
    }
  `;

  @state()
  private _options = [
    'banana',
    'apple',
    'orange',
    'pear',
    'pineapple',
    'strawberry',
    'watermelon',
  ];

  @property({ type: String }) selectedOption = '';

  handleSelectChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.selectedOption = input.value;
  }

  toggleDropdown() {
    this.shadowRoot?.querySelector('select')?.showPicker();
  }

  filterDropdownOptions(value: string) {}

  render() {
    return html`
      <label for="fruits">Select a fruit</label>
      <div class="container">
        <div class="dropdown-container">
          <input
            @click=${this.toggleDropdown}
            type="search"
            .value=${this.selectedOption}
            @input=${(e: Event) =>
              this.filterDropdownOptions((e.target as HTMLInputElement).value)}
          />
          <button aria-label="Open dropdown" @click=${this.toggleDropdown}>
            ^
          </button>
        </div>
        <select name="fruits" id="fruits" @change=${this.handleSelectChange}>
          ${this._options.map(
            option => html`<option value=${option}>${option}</option>`,
          )}
        </select>
      </div>
    `;
  }
}
