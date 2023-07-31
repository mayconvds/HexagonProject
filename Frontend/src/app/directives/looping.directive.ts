import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appLooping]'
})
export class LoopingDirective {

  @Input() set appLooping(loop: number) {
    for (let i = 0; i < loop; i++) {
      this.containerRef.createEmbeddedView(this.templateRef, { pos: i + 1 });
    }}

  constructor(private templateRef: TemplateRef<any>,
              private containerRef: ViewContainerRef) { }

}
