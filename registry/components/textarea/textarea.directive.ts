import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  input,
  inject,
} from '@angular/core';

@Component({
  selector: 'textarea[aevkoTextarea]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './textarea.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
    '[attr.data-auto-resize]': 'autoResize() ? "true" : null',
    '(input)': 'resize()',
  },
})
export class AevkoTextarea implements AfterViewInit {
  private readonly element = inject<ElementRef<HTMLTextAreaElement>>(ElementRef);
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly autoResize = input(false, { transform: booleanAttribute });

  ngAfterViewInit(): void {
    this.resize();
  }

  protected resize(): void {
    if (!this.autoResize()) return;
    const textarea = this.element.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
