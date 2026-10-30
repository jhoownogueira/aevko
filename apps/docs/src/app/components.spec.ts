import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import axe from 'axe-core';
import { AevkoButton } from '../../../../registry/components/button';
import { AevkoButtonGroup } from '../../../../registry/components/button-group';
import { AevkoToggle } from '../../../../registry/components/toggle';
import { AevkoBadge } from '../../../../registry/components/badge';
import { AevkoAlert } from '../../../../registry/components/alert';
import { AevkoProgress } from '../../../../registry/components/progress';
import { AevkoSpinner } from '../../../../registry/components/spinner';
import { AevkoSkeleton } from '../../../../registry/components/skeleton';
import { AevkoAvatar } from '../../../../registry/components/avatar';
import { AevkoAttachment } from '../../../../registry/components/attachment';
import { AevkoMarker } from '../../../../registry/components/marker';
import { AevkoPagination } from '../../../../registry/components/pagination';
import { AevkoBreadcrumb, AevkoBreadcrumbItem } from '../../../../registry/components/breadcrumb';
import { AevkoBubble } from '../../../../registry/components/bubble';
import { AevkoMessage } from '../../../../registry/components/message';
import { AevkoTrace, AevkoTraceItem } from '../../../../registry/components/trace';
import { AevkoCheckbox } from '../../../../registry/components/checkbox';
import { AevkoSwitch } from '../../../../registry/components/switch';
import { AevkoRadioGroup, AevkoRadioGroupItem } from '../../../../registry/components/radio-group';
import {
  AevkoToggleGroup,
  AevkoToggleGroupItem,
} from '../../../../registry/components/toggle-group';
import {
  AevkoInputGroup,
  AevkoInputGroupAddon,
  AevkoInputGroupButton,
  AevkoInputGroupControl,
} from '../../../../registry/components/input-group';
import { AevkoInputOtp } from '../../../../registry/components/input-otp';
import { AevkoSlider } from '../../../../registry/components/slider';
import {
  AevkoMessageScroller,
  AevkoMessageScrollerItem,
} from '../../../../registry/components/message-scroller';
import {
  AevkoTabs,
  AevkoTabsContent,
  AevkoTabsList,
  AevkoTabsTrigger,
} from '../../../../registry/components/tabs';
import {
  AevkoCodeBlock,
  AevkoCodeBlockContent,
  AevkoCodeBlockHeader,
} from '../../../../registry/components/code-block';
import { AevkoChart } from '../../../../registry/components/chart';
import { AevkoDataTable } from '../../../../registry/components/data-table';
import { AevkoDialog } from '../../../../registry/components/dialog';
import { AevkoAlertDialog } from '../../../../registry/components/alert-dialog';
import { AevkoDrawer } from '../../../../registry/components/drawer';
import { AevkoSheet } from '../../../../registry/components/sheet';
import { AevkoPopover, AevkoPopoverTrigger } from '../../../../registry/components/popover';
import { AevkoHoverCard, AevkoHoverCardTrigger } from '../../../../registry/components/hover-card';
import { AevkoTooltip, AevkoTooltipTrigger } from '../../../../registry/components/tooltip';
import { AevkoToaster, AevkoToastStore } from '../../../../registry/components/toast';
import { AevkoCommand } from '../../../../registry/components/command';
import {
  AevkoDropdownMenu,
  AevkoDropdownMenuItem,
  AevkoDropdownMenuTrigger,
} from '../../../../registry/components/dropdown-menu';
import {
  AevkoContextMenu,
  AevkoContextMenuItem,
  AevkoContextMenuTrigger,
} from '../../../../registry/components/context-menu';
import { AevkoMenubar, AevkoMenubarItem } from '../../../../registry/components/menubar';
import { AevkoNavigationMenu } from '../../../../registry/components/navigation-menu';
import { AevkoCalendar } from '../../../../registry/components/calendar';
import { AevkoCombobox } from '../../../../registry/components/combobox';
import { AevkoDatePicker } from '../../../../registry/components/date-picker';
import { AevkoQuestionnaire } from '../../../../registry/components/questionnaire';
import { AevkoSelect } from '../../../../registry/components/select';
import { AevkoCard, AevkoCardContent, AevkoCardTitle } from '../../../../registry/components/card';
import {
  AevkoField,
  AevkoFieldDescription,
  AevkoFieldError,
  AevkoFieldLabel,
} from '../../../../registry/components/field';
import { AevkoInput } from '../../../../registry/components/input';
import { AevkoLabel } from '../../../../registry/components/label';
import { AevkoNativeSelect } from '../../../../registry/components/native-select';
import { AevkoSeparator } from '../../../../registry/components/separator';
import { AevkoTextarea } from '../../../../registry/components/textarea';
import {
  AevkoTable,
  AevkoTableBody,
  AevkoTableCaption,
  AevkoTableCell,
  AevkoTableContainer,
  AevkoTableHead,
  AevkoTableHeader,
  AevkoTableRow,
} from '../../../../registry/components/table';

@Component({
  standalone: true,
  imports: [AevkoButton],
  template: '<button aevkoButton [loading]="loading" (click)="clicks += 1">Save</button>',
})
class ButtonHost {
  loading = false;
  clicks = 0;
}

@Component({
  standalone: true,
  imports: [AevkoButton],
  template: `<button aevkoButton>
    <svg aevkoButtonIconStart data-testid="start-icon" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M0 0h10v10H0z" />
    </svg>
    Continue
    <span aevkoButtonIconEnd data-testid="end-icon">→</span>
  </button>`,
})
class IconProjectionHost {}

@Component({
  standalone: true,
  imports: [AevkoCard, AevkoCardTitle, AevkoCardContent, AevkoSeparator],
  template: `
    <aevko-card>
      <aevko-card-title>Workspace</aevko-card-title>
      <aevko-card-content>Editable source</aevko-card-content>
    </aevko-card>
    <aevko-separator [decorative]="false" />
  `,
})
class CompositionHost {}

@Component({
  standalone: true,
  imports: [
    AevkoField,
    AevkoFieldDescription,
    AevkoFieldError,
    AevkoFieldLabel,
    AevkoInput,
    AevkoLabel,
    AevkoNativeSelect,
    AevkoTextarea,
    ReactiveFormsModule,
  ],
  template: `
    <aevko-field [invalid]="invalid">
      <label aevkoFieldLabel for="name">Name</label>
      <input
        aevkoInput
        id="name"
        [formControl]="name"
        [invalid]="invalid"
        aria-describedby="name-help name-error"
      />
      <span aevkoFieldDescription id="name-help">Public display name.</span>
      <span aevkoFieldError id="name-error">Name is required.</span>
    </aevko-field>
    <label aevkoLabel for="role">Role</label>
    <select aevkoNativeSelect id="role">
      <option>Designer</option>
    </select>
    <label aevkoLabel for="notes">Notes</label>
    <textarea aevkoTextarea id="notes" autoResize>Local source</textarea>
  `,
})
class FormHost {
  invalid = true;
  name = new FormControl('Aevko');
}

@Component({
  standalone: true,
  imports: [
    AevkoTable,
    AevkoTableBody,
    AevkoTableCaption,
    AevkoTableCell,
    AevkoTableContainer,
    AevkoTableHead,
    AevkoTableHeader,
    AevkoTableRow,
  ],
  template: `<div aevkoTableContainer label="Projects">
    <table aevkoTable>
      <caption aevkoTableCaption>
        Current projects
      </caption>
      <thead aevkoTableHeader>
        <tr aevkoTableRow>
          <th aevkoTableHead scope="col">Name</th>
        </tr>
      </thead>
      <tbody aevkoTableBody>
        <tr aevkoTableRow>
          <td aevkoTableCell>Aevko</td>
        </tr>
      </tbody>
    </table>
  </div>`,
})
class TableHost {}

@Component({
  standalone: true,
  imports: [
    AevkoAlert,
    AevkoBadge,
    AevkoButton,
    AevkoButtonGroup,
    AevkoProgress,
    AevkoSkeleton,
    AevkoSpinner,
    AevkoToggle,
  ],
  template: `
    <aevko-button-group label="Text alignment">
      <button aevkoButton>Left</button><button aevkoButton>Right</button>
    </aevko-button-group>
    <button aevkoToggle aria-label="Bold" [(pressed)]="pressed">Bold</button>
    <aevko-badge variant="muted">Ready</aevko-badge>
    <aevko-alert live="assertive">
      <strong aevkoAlertTitle>Connection lost</strong>
      <span aevkoAlertDescription>Try again.</span>
    </aevko-alert>
    <aevko-progress label="Upload" [value]="120" />
    <aevko-spinner label="Saving" />
    <section aria-busy="true" aria-label="Loading card"><aevko-skeleton /></section>
  `,
})
class BasicComponentsHost {
  pressed = false;
}

@Component({
  standalone: true,
  imports: [AevkoAttachment, AevkoAvatar, AevkoMarker, AevkoPagination],
  template: `
    <aevko-avatar alt="Ada Lovelace" fallback="AL" />
    <aevko-attachment name="brief.pdf" metadata="PDF · 2 MB">
      <button aevkoAttachmentAction type="button">Download</button>
    </aevko-attachment>
    <aevko-marker>Active</aevko-marker>
    <aevko-pagination label="Results pages" [totalPages]="3" [(page)]="page" />
  `,
})
class ContentComponentsHost {
  page = 1;
}

@Component({
  standalone: true,
  imports: [
    AevkoBreadcrumb,
    AevkoBreadcrumbItem,
    AevkoBubble,
    AevkoMessage,
    AevkoTrace,
    AevkoTraceItem,
  ],
  template: `
    <aevko-breadcrumb label="Project path">
      <aevko-breadcrumb-item><a href="/projects">Projects</a></aevko-breadcrumb-item>
      <aevko-breadcrumb-item [current]="true">Aevko</aevko-breadcrumb-item>
    </aevko-breadcrumb>
    <aevko-message align="end">
      <strong aevkoMessageAuthor>Ada</strong>
      <time aevkoMessageMeta>10:42</time>
      <aevko-bubble align="end">Build passed</aevko-bubble>
    </aevko-message>
    <aevko-trace label="Deployment trace">
      <aevko-trace-item state="complete"
        ><strong aevkoTraceTitle>Build</strong>Complete</aevko-trace-item
      >
      <aevko-trace-item state="running"
        ><strong aevkoTraceTitle>Deploy</strong>Running</aevko-trace-item
      >
    </aevko-trace>
  `,
})
class CommunicationComponentsHost {}

@Component({
  standalone: true,
  imports: [
    AevkoCheckbox,
    AevkoSwitch,
    AevkoRadioGroup,
    AevkoRadioGroupItem,
    AevkoToggleGroup,
    AevkoToggleGroupItem,
    ReactiveFormsModule,
  ],
  template: `
    <label><input aevkoCheckbox type="checkbox" [formControl]="accepted" /> Accept terms</label>
    <label><input aevkoSwitch type="checkbox" [formControl]="notifications" /> Notifications</label>
    <fieldset aevkoRadioGroup>
      <legend>Density</legend>
      <label
        ><input
          aevkoRadioGroupItem
          type="radio"
          name="density"
          value="default"
          [formControl]="density"
        />
        Default</label
      >
      <label
        ><input
          aevkoRadioGroupItem
          type="radio"
          name="density"
          value="compact"
          [formControl]="density"
        />
        Compact</label
      >
    </fieldset>
    <aevko-toggle-group label="Alignment" type="single" [(value)]="alignment">
      <button aevkoToggleGroupItem value="left">Left</button>
      <button aevkoToggleGroupItem value="center">Center</button>
    </aevko-toggle-group>
  `,
})
class SelectionComponentsHost {
  accepted = new FormControl(false, { nonNullable: true });
  notifications = new FormControl(true, { nonNullable: true });
  density = new FormControl('default', { nonNullable: true });
  alignment: readonly string[] = [];
}

@Component({
  standalone: true,
  imports: [
    AevkoInputGroup,
    AevkoInputGroupAddon,
    AevkoInputGroupButton,
    AevkoInputGroupControl,
    AevkoInputOtp,
    AevkoSlider,
    AevkoMessageScroller,
    AevkoMessageScrollerItem,
    AevkoTabs,
    AevkoTabsList,
    AevkoTabsTrigger,
    AevkoTabsContent,
    AevkoCodeBlock,
    AevkoCodeBlockHeader,
    AevkoCodeBlockContent,
    ReactiveFormsModule,
  ],
  template: `
    <label for="search">Search</label>
    <aevko-input-group>
      <input aevkoInputGroupControl id="search" />
      <aevko-input-group-addon>Query</aevko-input-group-addon>
      <button aevkoInputGroupButton type="button">Clear</button>
    </aevko-input-group>
    <aevko-input-otp label="Verification code" [formControl]="code" />
    <label for="volume">Volume</label>
    <input aevkoSlider id="volume" type="range" min="0" max="100" [formControl]="volume" />
    <aevko-message-scroller label="Project conversation">
      <aevko-message-scroller-item messageId="one">First message</aevko-message-scroller-item>
      <aevko-message-scroller-item messageId="two" [scrollAnchor]="true"
        >Latest message</aevko-message-scroller-item
      >
    </aevko-message-scroller>
    <aevko-tabs label="Views" id="test-tabs">
      <aevko-tabs-list
        ><button aevkoTabsTrigger value="one">One</button
        ><button aevkoTabsTrigger value="two">Two</button></aevko-tabs-list
      >
      <aevko-tabs-content value="one">First panel</aevko-tabs-content>
      <aevko-tabs-content value="two">Second panel</aevko-tabs-content>
    </aevko-tabs>
    <aevko-code-block
      ><aevko-code-block-header>app.ts</aevko-code-block-header
      ><aevko-code-block-content code="const ready = true;" [lineNumbers]="true"
    /></aevko-code-block>
  `,
})
class AdvancedInputHost {
  code = new FormControl('', { nonNullable: true });
  volume = new FormControl(64, { nonNullable: true });
}

@Component({
  standalone: true,
  imports: [AevkoChart, AevkoDataTable],
  template: `
    <aevko-chart label="Revenue" description="Current quarter" [series]="series">
      <svg aevkoChartVisual><path d="M0 10L10 0" /></svg>
      <table aevkoChartData>
        <caption>
          Revenue values
        </caption>
        <tbody>
          <tr>
            <th scope="row">Q1</th>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </aevko-chart>
    <aevko-data-table
      caption="Invoices"
      [rows]="rows"
      [columns]="columns"
      [rowKey]="rowKey"
      [selectable]="true"
    />
  `,
})
class DataComponentsHost {
  series = [{ key: 'revenue', label: 'Revenue' }];
  rows = [
    { id: 'one', customer: 'Ada', amount: 100 },
    { id: 'two', customer: 'Grace', amount: 80 },
  ];
  columns = [
    {
      key: 'customer',
      header: 'Customer',
      value: (row: (typeof this.rows)[number]) => row.customer,
      sortable: true,
    },
    { key: 'amount', header: 'Amount', value: (row: (typeof this.rows)[number]) => row.amount },
  ];
  rowKey = (row: (typeof this.rows)[number]) => row.id;
}

@Component({
  standalone: true,
  imports: [
    AevkoDialog,
    AevkoAlertDialog,
    AevkoDrawer,
    AevkoSheet,
    AevkoPopover,
    AevkoPopoverTrigger,
    AevkoHoverCard,
    AevkoHoverCardTrigger,
    AevkoTooltip,
    AevkoTooltipTrigger,
    AevkoToaster,
  ],
  template: `
    <aevko-dialog title="Edit workspace" description="Change the workspace name.">
      <button aevkoDialogTrigger type="button">Edit</button>
      <button aevkoDialogClose type="button">Close</button>
    </aevko-dialog>
    <aevko-alert-dialog title="Delete workspace?" description="This cannot be undone.">
      <button aevkoAlertDialogTrigger type="button">Delete</button>
      <button aevkoAlertDialogClose type="button">Cancel</button>
    </aevko-alert-dialog>
    <aevko-drawer title="Filters"
      ><button aevkoDrawerTrigger type="button">Filters</button></aevko-drawer
    >
    <aevko-sheet title="Settings"
      ><button aevkoSheetTrigger type="button">Settings</button></aevko-sheet
    >
    <aevko-popover label="Options"
      ><button aevkoPopoverTrigger type="button">Options</button>
      <p>Content</p></aevko-popover
    >
    <aevko-hover-card [delay]="0"
      ><a aevkoHoverCardTrigger href="#ada">Ada</a>
      <p>Preview</p></aevko-hover-card
    >
    <aevko-tooltip [delay]="0"
      ><button aevkoTooltipTrigger type="button">Save</button
      ><span>Save workspace</span></aevko-tooltip
    >
    <aevko-toaster />
  `,
})
class OverlayComponentsHost {}

@Component({
  standalone: true,
  imports: [
    AevkoCommand,
    AevkoDropdownMenu,
    AevkoDropdownMenuTrigger,
    AevkoDropdownMenuItem,
    AevkoContextMenu,
    AevkoContextMenuTrigger,
    AevkoContextMenuItem,
    AevkoMenubar,
    AevkoMenubarItem,
    AevkoNavigationMenu,
  ],
  template: `
    <aevko-command label="Commands" [items]="items" />
    <aevko-dropdown-menu label="Actions"
      ><button aevkoDropdownMenuTrigger>Open</button
      ><button aevkoDropdownMenuItem>Profile</button></aevko-dropdown-menu
    >
    <aevko-context-menu label="Canvas"
      ><div aevkoContextMenuTrigger>Canvas</div>
      <button aevkoContextMenuItem>Duplicate</button></aevko-context-menu
    >
    <aevko-menubar label="Application"
      ><button aevkoMenubarItem>File</button><button aevkoMenubarItem>Edit</button></aevko-menubar
    >
    <aevko-navigation-menu label="Primary"><a href="#docs">Docs</a></aevko-navigation-menu>
  `,
})
class MenuComponentsHost {
  items = [{ id: 'new', label: 'New project' }];
}

@Component({
  standalone: true,
  imports: [AevkoCalendar, AevkoCombobox, AevkoDatePicker, AevkoQuestionnaire, AevkoSelect],
  template: `
    <aevko-calendar label="Choose date" month="2026-10" value="2026-10-30" />
    <aevko-combobox label="Framework" [items]="options" />
    <aevko-date-picker label="Deployment date" month="2026-10" />
    <aevko-select label="Theme" [items]="options" />
    <aevko-questionnaire label="Brief" [items]="questions" />
  `,
})
class FinalComponentsHost {
  options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ];
  questions = [{ name: 'scope', prompt: 'Choose scope', required: true, choices: this.options }];
}

describe('Phase 0 canonical components', () => {
  it('defaults to a safe button type and blocks loading activation', async () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.type).toBe('button');
    button.click();
    expect(fixture.componentInstance.clicks).toBe(1);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    button.click();
    expect(fixture.componentInstance.clicks).toBe(1);
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('projects library-independent start and end icons', () => {
    const fixture = TestBed.createComponent(IconProjectionHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.querySelector('[data-testid="start-icon"]')).toBeTruthy();
    expect(button.querySelector('[data-testid="end-icon"]')).toBeTruthy();
    expect(button.textContent).toContain('Continue');
  });

  it('projects card content and exposes a semantic separator', async () => {
    const fixture = TestBed.createComponent(CompositionHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Workspace');
    const separator = fixture.nativeElement.querySelector('aevko-separator');
    expect(separator.getAttribute('role')).toBe('separator');
    expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('preserves native form semantics and exposes validation state', async () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const label = fixture.nativeElement.querySelector('label[for="name"]') as HTMLLabelElement;
    expect(label.htmlFor).toBe(input.id);
    expect(input.value).toBe('Aevko');
    fixture.componentInstance.name.setValue('Studio');
    fixture.detectChanges();
    expect(input.value).toBe('Studio');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('select').value).toBe('Designer');
    expect(fixture.nativeElement.querySelector('[aevkoFieldError]').getAttribute('aria-live')).toBe(
      'polite',
    );
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('styles native table semantics without replacing them', async () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('table') as HTMLTableElement;
    const container = fixture.nativeElement.querySelector('[aevkoTableContainer]');
    expect(table.caption?.textContent).toContain('Current projects');
    expect(table.tHead?.rows[0]?.cells[0]?.getAttribute('scope')).toBe('col');
    expect(container.getAttribute('tabindex')).toBe('0');
    expect(container.getAttribute('aria-label')).toBe('Projects');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('exposes complete low-risk action and feedback semantics', async () => {
    const fixture = TestBed.createComponent(BasicComponentsHost);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('[aevkoToggle]') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.pressed).toBe(true);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelector('aevko-button-group').getAttribute('role')).toBe(
      'group',
    );
    expect(fixture.nativeElement.querySelector('aevko-alert').getAttribute('role')).toBe('alert');
    expect(
      fixture.nativeElement.querySelector('aevko-progress').getAttribute('aria-valuenow'),
    ).toBe('100');
    expect(fixture.nativeElement.querySelector('aevko-skeleton').getAttribute('aria-hidden')).toBe(
      'true',
    );
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('preserves content semantics and controlled pagination', async () => {
    const fixture = TestBed.createComponent(ContentComponentsHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('aevko-avatar [role="img"]').textContent).toContain(
      'AL',
    );
    const next = fixture.nativeElement.querySelector(
      'aevko-pagination button[aria-label="Next page"]',
    ) as HTMLButtonElement;
    next.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.page).toBe(2);
    expect(
      fixture.nativeElement.querySelector('aevko-pagination button[aria-current="page"]')
        .textContent,
    ).toContain('2');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('composes navigation and communication content without icon dependencies', async () => {
    const fixture = TestBed.createComponent(CommunicationComponentsHost);
    fixture.detectChanges();
    const breadcrumb = fixture.nativeElement.querySelector('aevko-breadcrumb');
    const current = fixture.nativeElement.querySelector(
      'aevko-breadcrumb-item[aria-current="page"]',
    );
    const trace = fixture.nativeElement.querySelector('aevko-trace');
    expect(breadcrumb.getAttribute('aria-label')).toBe('Project path');
    expect(current.textContent).toContain('Aevko');
    expect(trace.querySelectorAll('[role="listitem"]').length).toBe(2);
    expect(trace.querySelector('[data-state="running"]')?.textContent).toContain('Running');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('keeps native forms and grouped pressed state operational', async () => {
    const fixture = TestBed.createComponent(SelectionComponentsHost);
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('[aevkoCheckbox]') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    checkbox.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.accepted.value).toBe(true);
    expect((fixture.nativeElement.querySelector('[aevkoSwitch]') as HTMLInputElement).checked).toBe(
      true,
    );
    const compact = fixture.nativeElement.querySelector(
      'input[value="compact"]',
    ) as HTMLInputElement;
    compact.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.density.value).toBe('compact');
    const center = fixture.nativeElement.querySelector(
      'button[value="center"], button[data-value="center"]',
    ) as HTMLButtonElement;
    center.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.alignment).toEqual(['center']);
    expect(center.getAttribute('aria-pressed')).toBe('true');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('preserves advanced native input and transcript semantics', async () => {
    const fixture = TestBed.createComponent(AdvancedInputHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const otp = fixture.nativeElement.querySelector('aevko-input-otp input') as HTMLInputElement;
    otp.value = '12a-34';
    otp.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.code.value).toBe('12a34');
    expect(otp.autocomplete).toBe('one-time-code');
    const slider = fixture.nativeElement.querySelector('[aevkoSlider]') as HTMLInputElement;
    expect(slider.value).toBe('64');
    const scroller = fixture.nativeElement.querySelector('aevko-message-scroller');
    expect(scroller.querySelector('[role="region"]').getAttribute('aria-label')).toBe(
      'Project conversation',
    );
    expect(scroller.querySelector('[role="log"]').getAttribute('aria-relevant')).toBe('additions');
    const tabs = fixture.nativeElement.querySelector('aevko-tabs');
    expect(tabs.querySelector('[role="tab"]').getAttribute('aria-selected')).toBe('true');
    expect(tabs.querySelector('[role="tabpanel"]').textContent).toContain('First panel');
    expect(fixture.nativeElement.querySelector('aevko-code-block pre').getAttribute('dir')).toBe(
      'ltr',
    );
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('keeps chart data semantic and data-table state controlled', async () => {
    const fixture = TestBed.createComponent(DataComponentsHost);
    fixture.detectChanges();
    const chart = fixture.nativeElement.querySelector('aevko-chart');
    expect(chart.getAttribute('role')).toBe('figure');
    expect(chart.querySelector('table caption').textContent).toContain('Revenue values');
    const sort = fixture.nativeElement.querySelector(
      'aevko-data-table th button',
    ) as HTMLButtonElement;
    sort.click();
    fixture.detectChanges();
    expect(sort.parentElement?.getAttribute('aria-sort')).toBe('ascending');
    const selection = fixture.nativeElement.querySelector(
      'aevko-data-table input[type="checkbox"]',
    ) as HTMLInputElement;
    selection.click();
    fixture.detectChanges();
    expect(selection.checked).toBe(true);
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('renders dependency-free native overlay semantics', async () => {
    const fixture = TestBed.createComponent(OverlayComponentsHost);
    fixture.detectChanges();
    const dialogs = fixture.nativeElement.querySelectorAll('dialog');
    expect(dialogs.length).toBe(4);
    expect(dialogs[0].getAttribute('role')).toBe('dialog');
    expect(dialogs[1].getAttribute('role')).toBe('alertdialog');
    expect(dialogs[1].getAttribute('aria-label')).toBe('Delete workspace?');
    const popoverTrigger = fixture.nativeElement.querySelector(
      '[aevkoPopoverTrigger]',
    ) as HTMLButtonElement;
    popoverTrigger.click();
    fixture.detectChanges();
    expect(popoverTrigger.getAttribute('aria-expanded')).toBe('true');
    TestBed.inject(AevkoToastStore).show('Saved', { duration: 0 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('Saved');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('provides searchable commands and native menu relationships', async () => {
    const fixture = TestBed.createComponent(MenuComponentsHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[aevkoDropdownMenuTrigger]',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('[role="menu"]')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('[role="navigation"]').getAttribute('aria-label'),
    ).toBe('Primary');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('keeps final selection and date controls semantic', async () => {
    const fixture = TestBed.createComponent(FinalComponentsHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="grid"]').getAttribute('aria-label')).toBe(
      'Choose date',
    );
    expect(fixture.nativeElement.querySelector('input[role="combobox"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('fieldset legend').textContent).toContain(
      'Choose scope',
    );
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });
});
