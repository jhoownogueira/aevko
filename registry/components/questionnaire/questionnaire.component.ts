import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
export interface AevkoQuestionnaireChoice {
  value: string;
  label: string;
  description?: string;
  shortcut?: string;
}
export interface AevkoQuestionnaireItem {
  name: string;
  prompt: string;
  description?: string;
  choices?: readonly AevkoQuestionnaireChoice[];
  multiple?: boolean;
  freeform?: boolean;
  required?: boolean;
  skippable?: boolean;
  disabled?: boolean;
}
export type AevkoQuestionnaireAnswers = Readonly<Record<string, string | readonly string[]>>;
@Component({
  selector: 'aevko-questionnaire',
  standalone: true,
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoQuestionnaire {
  readonly label = input('Questionnaire');
  readonly items = input.required<readonly AevkoQuestionnaireItem[]>();
  readonly active = model(0);
  readonly answers = model<AevkoQuestionnaireAnswers>({});
  readonly submitted = output<AevkoQuestionnaireAnswers>();
  protected readonly error = signal('');
  protected readonly enabled = computed(() => this.items().filter((item) => !item.disabled));
  protected readonly current = computed(
    () => this.enabled()[Math.min(this.active(), Math.max(0, this.enabled().length - 1))],
  );
  protected readonly last = computed(() => this.active() >= this.enabled().length - 1);
  protected selected(value: string): boolean {
    const answer = this.answers()[this.current()?.name ?? ''];
    return Array.isArray(answer) ? answer.includes(value) : answer === value;
  }
  protected answerText(name: string): string {
    const answer = this.answers()[name];
    return typeof answer === 'string' ? answer : '';
  }
  protected choose(value: string): void {
    const item = this.current();
    if (!item) return;
    const existing = this.answers()[item.name];
    const answer = item.multiple
      ? this.toggle(Array.isArray(existing) ? existing : [], value)
      : value;
    this.answers.set({ ...this.answers(), [item.name]: answer });
    this.error.set('');
  }
  protected freeform(value: string): void {
    const item = this.current();
    if (item) {
      this.answers.set({ ...this.answers(), [item.name]: value });
      this.error.set('');
    }
  }
  protected previous(): void {
    this.error.set('');
    this.active.update((value) => Math.max(0, value - 1));
  }
  protected next(): void {
    const item = this.current();
    if (!item || !this.valid(item)) {
      this.error.set('Choose an answer to continue.');
      return;
    }
    this.error.set('');
    if (this.last()) this.submitted.emit(this.answers());
    else this.active.update((value) => value + 1);
  }
  protected skip(): void {
    if (this.current()?.skippable) {
      this.error.set('');
      if (this.last()) this.submitted.emit(this.answers());
      else this.active.update((value) => value + 1);
    }
  }
  private valid(item: AevkoQuestionnaireItem): boolean {
    if (!item.required) return true;
    const answer = this.answers()[item.name];
    return typeof answer === 'string' ? answer.trim().length > 0 : (answer?.length ?? 0) > 0;
  }
  private toggle(values: readonly string[], value: string): readonly string[] {
    return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
  }
}
