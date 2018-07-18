/* tslint:disable */
import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'example-a',
  templateUrl: './templates/example-a.html'
})
export class ExampleAComponent {
}

@Component({
  selector: 'example-b',
  templateUrl: './templates/example-b.html'
})
export class ExampleBComponent {
  BAG = "DRAGULA_EVENTS";
  public constructor(private dragulaService:DragulaService) {
    dragulaService.drag(this.BAG).subscribe(({ name, el }) => {
      this.removeClass(el, 'ex-moved');
    });
    dragulaService.drop(this.BAG).subscribe(({ name, el }) => {
      this.addClass(el, 'ex-moved');
    });
    dragulaService.over(this.BAG).subscribe(({ name, el }) => {
      this.addClass(el, 'ex-over');
    });
    dragulaService.out(this.BAG).subscribe(({ name, el }) => {
      this.removeClass(el, 'ex-over');
    });
  }

  private hasClass(el:any, name:string):any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el:any, name:string):void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el:any, name:string):void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

}

@Component({
  selector: 'another-example',
  templateUrl: './templates/another-example.html'
})
export class AnotherExampleComponent {
  public constructor(private dragulaService:DragulaService) {
    dragulaService.setOptions('REMOVABLE', {
      removeOnSpill: true
    });
  }
}

@Component({
  selector: 'such-example',
  templateUrl: './templates/such-example.html'
})
export class SuchExampleComponent {
  public constructor(private dragulaService:DragulaService) {
    dragulaService.setOptions('REVERT', {
      revertOnSpill: true
    });
  }
}

@Component({
  selector: 'very-example',
  templateUrl: './templates/very-example.html'
})
export class VeryExampleComponent {
  public constructor(private dragulaService:DragulaService) {
    dragulaService.setOptions('COPYABLE', {
      copy: true
    });
  }
}

@Component({
  selector: 'much-example',
  templateUrl: './templates/much-example.html'
})
export class MuchExampleComponent {
  public constructor(private dragulaService:DragulaService) {
    dragulaService.setOptions('HANDLES', {
      moves: function (el:any, container:any, handle:any):any {
        console.log(el, container);
        return handle.className === 'handle';
      }
    });
  }
}

@Component({
  selector: 'wow-example',
  templateUrl: './templates/wow-example.html'
})
export class WowExampleComponent {
  public clicked:any = {
    'one': false,
    'two': false,
    'three': false,
    'four': false,
    'five': false,
    'six': false,
    'seven': false
  };

  public onclick(key:any):void {
    this.clicked[key] = true;
    setTimeout(() => {
      this.clicked[key] = false;
    }, 2000);
  }
}

@Component({
  selector: 'repeat-example',
  templateUrl: './templates/repeat-example.html'
})
export class RepeatExampleComponent {
  MANY_ITEMS = 'MANY_ITEMS';
  public many = ['The', 'possibilities', 'are', 'endless!'];
  public many2 = ['Explore', 'them'];

  public constructor(private dragulaService:DragulaService) {
    dragulaService.dropModel(this.MANY_ITEMS).subscribe(({ el, target, source, item, sourceModel, targetModel }) => {
      console.log('dropModel:');
      console.log(el);
      console.log(source);
      console.log(target);
      console.log(sourceModel);
      console.log(targetModel);
      console.log(item);
    });
    dragulaService.removeModel(this.MANY_ITEMS).subscribe(({ el, source, item, sourceModel }) => {
      console.log('removeModel:');
      console.log(el);
      console.log(source);
      console.log(sourceModel);
      console.log(item);
    });
  }

}

const nestedExampleCode = `
<div class="wrapper" dragula="COLUMNS" [(dragulaModel)]="groups">
    <div class="container" *ngFor="let group of groups">
      <span class="group-handle">{{group.name}}</span>
      <div class="container" dragula="ITEMS" [(dragulaModel)]="group.items">
        <div *ngFor="let item of group.items" [innerHtml]="item.name"></div>
      </div>
    </div>
</div>

export class NestedRepeatExampleComponent {

  constructor(private dragulaService: DragulaService) {
    this.dragulaService.setOptions("COLUMNS", {
      direction: 'horizontal',
      moves: (el, source, handle) => handle.className === "group-handle"
    });
  }

  public groups:Array<any> = [
    {
      name: 'Group A',
      items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]
    },
    {
      name: 'Group B',
      items: [{name: 'Item 1'}, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}]
    }
  ];
}
`;

@Component({
  selector: 'nested-repeat-example',
  templateUrl: './templates/nested-repeat-example.html'
})
export class NestedRepeatExampleComponent {
  example = nestedExampleCode;

  constructor(private dragulaService: DragulaService) {
    this.dragulaService.setOptions("COLUMNS", {
      direction: 'horizontal',
      moves: (el, source, handle) => handle.className === "group-handle"
    });
  }

  public groups:Array<any> = [
    {
      name: 'Group A',
      items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]
    },
    {
      name: 'Group B',
      items: [{name: 'Item 1'}, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}]
    }
  ];
}

export const EXAMPLES:any[] = [
  ExampleAComponent,
  ExampleBComponent,
  AnotherExampleComponent,
  SuchExampleComponent,
  VeryExampleComponent,
  MuchExampleComponent,
  WowExampleComponent,
  RepeatExampleComponent,
  NestedRepeatExampleComponent
];
