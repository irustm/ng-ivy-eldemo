(function (){

let currentElement;
let currentCtx;
const Component = "Component";

const i0 = {
  ɵɵdefineComponent: (dfs) => {
    return dfs;
  },
  ɵɵtext: (i, text) => {
    currentElement.innerText = text;
  },

  ɵɵtextInterpolate1: (leftPrefix, main, rightPrefix) => {
    currentElement.innerText = "" + leftPrefix + main + rightPrefix;
  },

  ɵsetClassMetadata: (type, defs, c1, c2) => {},
};

const renderComponent = (componentType, host) => {
    const ctx = componentType.ɵfac();
    currentCtx = ctx;
    currentElement = host;
    componentType.ɵcmp.template(1, ctx);
};

class HelloComponent {
}
HelloComponent.ɵfac = function HelloComponent_Factory(t) { return new (t || HelloComponent)(); };
HelloComponent.ɵcmp = i0.ɵɵdefineComponent({ type: HelloComponent, selectors: [["app-hello"]], decls: 1, vars: 0, template: function HelloComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtext(0, "Hello world!");
    } }, encapsulation: 2 });
/*@__PURE__*/ (function() { i0.ɵsetClassMetadata(HelloComponent, [{
        type: Component,
        args: [{
                selector: "app-hello",
                template: `Hello world!`,
            }],
    }], null, null); })();

// bootstrap
document.addEventListener('DOMContentLoaded', function(){
  renderComponent(HelloComponent, document.querySelector("app-hello"));
});

}());
