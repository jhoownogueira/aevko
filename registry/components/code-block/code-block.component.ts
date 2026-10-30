import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'aevko-code-block',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './code-block.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-variant]': 'variant()', '[attr.data-size]': 'size()' },
})
export class AevkoCodeBlock {
  readonly variant = input<'default' | 'destructive'>('default');
  readonly size = input<'default' | 'sm'>('default');
}

@Component({
  selector: 'aevko-code-block-header',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './code-block-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCodeBlockHeader {}

@Component({
  selector: 'aevko-code-block-content',
  standalone: true,
  templateUrl: './code-block-content.component.html',
  styleUrl: './code-block-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-wrap]': 'wrap()' },
})
export class AevkoCodeBlockContent {
  readonly code = input('');
  readonly language = input('text');
  readonly lineNumbers = input(false);
  readonly startLine = input(1);
  readonly wrap = input(false);
  protected readonly lines = computed(() => this.code().split('\n'));
}

@Component({
  selector: 'aevko-code-block-line',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './code-block-line.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-variant]': 'variant()' },
})
export class AevkoCodeBlockLine {
  readonly variant = input<'default' | 'added' | 'removed' | 'highlighted'>('default');
}

@Component({
  selector: 'button[aevkoCodeBlockCopy]',
  standalone: true,
  template: '{{ copied() ? "Copied" : "Copy" }}',
  styleUrl: './code-block-copy.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    '[attr.aria-label]': 'copied() ? "Code copied" : "Copy code"',
    '(click)': 'copy()',
  },
})
export class AevkoCodeBlockCopy {
  readonly value = input.required<string>();
  readonly copiedChange = output<void>();
  protected readonly copied = signal(false);
  private readonly document = inject(DOCUMENT);

  protected async copy(): Promise<void> {
    const clipboard = this.document.defaultView?.navigator.clipboard;
    if (!clipboard) return;
    await clipboard.writeText(this.value());
    this.copied.set(true);
    this.copiedChange.emit();
    this.document.defaultView?.setTimeout(() => this.copied.set(false), 1500);
  }
}

@Component({
  selector: 'aevko-code-block-footer',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './code-block-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCodeBlockFooter {}
