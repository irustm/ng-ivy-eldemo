import { Component, ɵrenderComponent } from '@angular/core';

@Component({
  selector: 'my-element',
  template: `{{title}} hello!`
})
export class AppComponent extends HTMLElement {
    get title() {  return AppComponent.title; }

    static title = 'Angular Ivy';

    constructor() {
      super();
    }

    connectedCallback() {
      // браузер вызывает этот метод при добавлении элемента в документ
      // (может вызываться много раз, если элемент многократно добавляется/удаляется)

      ɵrenderComponent(AppComponent, {host: this});
    }

    disconnectedCallback() {
      // браузер вызывает этот метод при удалении элемента из документа
      // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    static get observedAttributes() {
      /* массив имён атрибутов для отслеживания их изменений */
      return ['title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // вызывается при изменении одного из перечисленных выше атрибутов
      console.log('attributeChangedCallback', name, oldValue, newValue);
      AppComponent.title = newValue;
    }

    adoptedCallback() {
      // вызывается, когда элемент перемещается в новый документ
      // (происходит в document.adoptNode, используется очень редко)
    }

    detectChanges(): void {

    }
}

customElements.define('my-element', AppComponent);
