# Angularjs Architecture

AngularJS lets you extend HTML vocabulary for your application. Define your DOM structure and its behaviour.

AngularJS is a toolset for building the framework most suited to your application development (CRUD application).

Angularjs rely on Dependency Injection.

### Module

```
/**
 * angular module is a scope where the angularjs powered.
 */

 // define angular modules and inject
 angular.module('phoneList', []);
 angular.module('phonecatApp', [phoneList]);
```

### Component/Directive

```
// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    template:
        '<ul>' +
          '<li ng-repeat="phone in $ctrl.phones">' +
            '<span>{{phone.name}}</span>' +
            '<p>{{phone.snippet}}</p>' +
          '</li>' +
        '</ul>',
    controller: function PhoneListController() {
      this.phones = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.'
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.'
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.'
        }
      ];
    }
  });
```

### Component architecture (Link/Slot/Scope penetration)

### Data Flow (ngResource)
