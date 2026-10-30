import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const cli = path.join(workspace, 'packages/cli/dist/index.js');
const registry = path.join(workspace, 'public-registry');
const allComponents = [
  'accordion',
  'aspect-ratio',
  'button',
  'button-group',
  'toggle',
  'badge',
  'alert',
  'progress',
  'spinner',
  'skeleton',
  'avatar',
  'attachment',
  'marker',
  'pagination',
  'breadcrumb',
  'bubble',
  'message',
  'trace',
  'checkbox',
  'switch',
  'radio-group',
  'toggle-group',
  'input-group',
  'input-otp',
  'slider',
  'message-scroller',
  'tabs',
  'code-block',
  'chart',
  'data-table',
  'dialog',
  'alert-dialog',
  'drawer',
  'sheet',
  'popover',
  'hover-card',
  'tooltip',
  'toast',
  'command',
  'dropdown-menu',
  'context-menu',
  'menubar',
  'navigation-menu',
  'calendar',
  'combobox',
  'date-picker',
  'questionnaire',
  'select',
  'card',
  'carousel',
  'collapsible',
  'direction',
  'empty',
  'field',
  'input',
  'item',
  'label',
  'native-select',
  'resizable',
  'scroll-area',
  'separator',
  'sidebar',
  'table',
  'textarea',
];
const requestedComponents = process.env['AEVKO_COMPONENTS']
  ?.split(',')
  .map((component) => component.trim())
  .filter(Boolean);
const components = requestedComponents?.length ? requestedComponents : allComponents;
for (const component of components) {
  if (!allComponents.includes(component)) throw new Error(`Unknown smoke component: ${component}`);
}
const pnpm = 'pnpm';
const npm = 'npm';

function execute(command, args, cwd) {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
}

function appSource(component) {
  const sources = {
    accordion: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoAccordion } from './ui/accordion';",
      metadata: 'imports: [AevkoAccordion],',
      template: '<aevko-accordion [items]="items" />',
      classBody: "items = [{ id: 'one', label: 'One', content: 'Content' }];",
    },
    'aspect-ratio': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoAspectRatio } from './ui/aspect-ratio';",
      metadata: 'imports: [AevkoAspectRatio],',
      template: '<aevko-aspect-ratio ratio="16/9"><div>Media</div></aevko-aspect-ratio>',
    },
    button: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoButton } from './ui/button';",
      metadata: 'imports: [AevkoButton],',
      template: '<button aevkoButton variant="accent">Save changes</button>',
    },
    'button-group': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoButton } from './ui/button';\nimport { AevkoButtonGroup } from './ui/button-group';",
      metadata: 'imports: [AevkoButton, AevkoButtonGroup],',
      template:
        '<aevko-button-group label="Alignment"><button aevkoButton>Left</button><button aevkoButton>Right</button></aevko-button-group>',
    },
    toggle: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoToggle } from './ui/toggle';",
      metadata: 'imports: [AevkoToggle],',
      template: '<button aevkoToggle aria-label="Bold" [(pressed)]="pressed">Bold</button>',
      classBody: 'pressed = false;',
    },
    badge: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoBadge } from './ui/badge';",
      metadata: 'imports: [AevkoBadge],',
      template: '<aevko-badge variant="muted">Ready</aevko-badge>',
    },
    alert: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoAlert } from './ui/alert';",
      metadata: 'imports: [AevkoAlert],',
      template:
        '<aevko-alert><strong aevkoAlertTitle>Saved</strong><span aevkoAlertDescription>Complete</span></aevko-alert>',
    },
    progress: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoProgress } from './ui/progress';",
      metadata: 'imports: [AevkoProgress],',
      template: '<aevko-progress label="Upload" [value]="64" />',
    },
    spinner: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSpinner } from './ui/spinner';",
      metadata: 'imports: [AevkoSpinner],',
      template: '<aevko-spinner label="Saving" />',
    },
    skeleton: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSkeleton } from './ui/skeleton';",
      metadata: 'imports: [AevkoSkeleton],',
      template: '<section aria-busy="true" aria-label="Loading card"><aevko-skeleton /></section>',
    },
    avatar: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoAvatar } from './ui/avatar';",
      metadata: 'imports: [AevkoAvatar],',
      template: '<aevko-avatar alt="Ada Lovelace" fallback="AL" />',
    },
    attachment: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoAttachment } from './ui/attachment';",
      metadata: 'imports: [AevkoAttachment],',
      template:
        '<aevko-attachment name="brief.pdf" metadata="PDF"><button aevkoAttachmentAction type="button">Download</button></aevko-attachment>',
    },
    marker: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoMarker } from './ui/marker';",
      metadata: 'imports: [AevkoMarker],',
      template: '<aevko-marker>Active</aevko-marker>',
    },
    pagination: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoPagination } from './ui/pagination';",
      metadata: 'imports: [AevkoPagination],',
      template: '<aevko-pagination label="Results" [totalPages]="3" [(page)]="page" />',
      classBody: 'page = 1;',
    },
    breadcrumb: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoBreadcrumb, AevkoBreadcrumbItem } from './ui/breadcrumb';",
      metadata: 'imports: [AevkoBreadcrumb, AevkoBreadcrumbItem],',
      template:
        '<aevko-breadcrumb label="Project path"><aevko-breadcrumb-item><a href="/projects">Projects</a></aevko-breadcrumb-item><aevko-breadcrumb-item [current]="true">Aevko</aevko-breadcrumb-item></aevko-breadcrumb>',
    },
    bubble: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoBubble } from './ui/bubble';",
      metadata: 'imports: [AevkoBubble],',
      template: '<aevko-bubble align="end">Build passed</aevko-bubble>',
    },
    message: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoMessage } from './ui/message';",
      metadata: 'imports: [AevkoMessage],',
      template:
        '<aevko-message><strong aevkoMessageAuthor>Ada</strong><p>Build passed</p></aevko-message>',
    },
    trace: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoTrace, AevkoTraceItem } from './ui/trace';",
      metadata: 'imports: [AevkoTrace, AevkoTraceItem],',
      template:
        '<aevko-trace label="Deployment"><aevko-trace-item state="running"><strong aevkoTraceTitle>Deploy</strong>Running</aevko-trace-item></aevko-trace>',
    },
    checkbox: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCheckbox } from './ui/checkbox';",
      metadata: 'imports: [AevkoCheckbox],',
      template: '<label><input aevkoCheckbox type="checkbox" /> Accept terms</label>',
    },
    switch: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSwitch } from './ui/switch';",
      metadata: 'imports: [AevkoSwitch],',
      template: '<label><input aevkoSwitch type="checkbox" /> Notifications</label>',
    },
    'radio-group': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoRadioGroup, AevkoRadioGroupItem } from './ui/radio-group';",
      metadata: 'imports: [AevkoRadioGroup, AevkoRadioGroupItem],',
      template:
        '<fieldset aevkoRadioGroup><legend>Density</legend><label><input aevkoRadioGroupItem type="radio" name="density" value="default" /> Default</label></fieldset>',
    },
    'toggle-group': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoToggleGroup, AevkoToggleGroupItem } from './ui/toggle-group';",
      metadata: 'imports: [AevkoToggleGroup, AevkoToggleGroupItem],',
      template:
        '<aevko-toggle-group label="Alignment"><button aevkoToggleGroupItem value="left">Left</button><button aevkoToggleGroupItem value="right">Right</button></aevko-toggle-group>',
    },
    'input-group': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoInputGroup, AevkoInputGroupAddon, AevkoInputGroupControl } from './ui/input-group';",
      metadata: 'imports: [AevkoInputGroup, AevkoInputGroupAddon, AevkoInputGroupControl],',
      template:
        '<label for="site">Website</label><aevko-input-group><input aevkoInputGroupControl id="site" /><aevko-input-group-addon>https://</aevko-input-group-addon></aevko-input-group>',
    },
    'input-otp': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoInputOtp } from './ui/input-otp';",
      metadata: 'imports: [AevkoInputOtp],',
      template: '<aevko-input-otp label="Verification code" />',
    },
    slider: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSlider } from './ui/slider';",
      metadata: 'imports: [AevkoSlider],',
      template:
        '<label for="volume">Volume</label><input aevkoSlider id="volume" type="range" min="0" max="100" />',
    },
    'message-scroller': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoMessageScroller, AevkoMessageScrollerItem } from './ui/message-scroller';",
      metadata: 'imports: [AevkoMessageScroller, AevkoMessageScrollerItem],',
      template:
        '<aevko-message-scroller label="Messages"><aevko-message-scroller-item messageId="one">Hello</aevko-message-scroller-item></aevko-message-scroller>',
    },
    tabs: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoTabs, AevkoTabsContent, AevkoTabsList, AevkoTabsTrigger } from './ui/tabs';",
      metadata: 'imports: [AevkoTabs, AevkoTabsContent, AevkoTabsList, AevkoTabsTrigger],',
      template:
        '<aevko-tabs label="Views"><aevko-tabs-list><button aevkoTabsTrigger value="one">One</button></aevko-tabs-list><aevko-tabs-content value="one">Panel</aevko-tabs-content></aevko-tabs>',
    },
    'code-block': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCodeBlock, AevkoCodeBlockContent } from './ui/code-block';",
      metadata: 'imports: [AevkoCodeBlock, AevkoCodeBlockContent],',
      template:
        '<aevko-code-block><aevko-code-block-content code="const ready = true;" /></aevko-code-block>',
    },
    chart: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoChart } from './ui/chart';",
      metadata: 'imports: [AevkoChart],',
      template:
        '<aevko-chart label="Revenue"><svg aevkoChartVisual><path d="M0 10L10 0" /></svg><table aevkoChartData><caption>Revenue values</caption><tbody><tr><td>10</td></tr></tbody></table></aevko-chart>',
    },
    'data-table': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoDataTable } from './ui/data-table';",
      metadata: 'imports: [AevkoDataTable],',
      template:
        '<aevko-data-table caption="Rows" [rows]="rows" [columns]="columns" [rowKey]="rowKey" />',
      classBody:
        "rows = [{ id: 'one', name: 'Ada' }];\ncolumns = [{ key: 'name', header: 'Name', value: (row: { id: string; name: string }) => row.name }];\nrowKey = (row: { id: string }) => row.id;",
    },
    card: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCard, AevkoCardContent, AevkoCardTitle } from './ui/card';",
      metadata: 'imports: [AevkoCard, AevkoCardContent, AevkoCardTitle],',
      template:
        '<aevko-card><aevko-card-title>Workspace</aevko-card-title><aevko-card-content>Local source</aevko-card-content></aevko-card>',
    },
    carousel: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCarousel, AevkoCarouselSlide } from './ui/carousel';",
      metadata: 'imports: [AevkoCarousel, AevkoCarouselSlide],',
      template:
        '<aevko-carousel label="Projects"><aevko-carousel-slide label="Slide 1 of 1">One</aevko-carousel-slide></aevko-carousel>',
    },
    collapsible: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCollapsible } from './ui/collapsible';",
      metadata: 'imports: [AevkoCollapsible],',
      template: '<aevko-collapsible label="Details">Content</aevko-collapsible>',
    },
    dialog: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoDialog } from './ui/dialog';",
      metadata: 'imports: [AevkoDialog],',
      template:
        '<aevko-dialog title="Edit workspace"><button aevkoDialogTrigger>Open</button><button aevkoDialogClose>Close</button></aevko-dialog>',
    },
    'alert-dialog': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoAlertDialog } from './ui/alert-dialog';",
      metadata: 'imports: [AevkoAlertDialog],',
      template:
        '<aevko-alert-dialog title="Delete workspace?"><button aevkoAlertDialogTrigger>Open</button><button aevkoAlertDialogClose>Cancel</button></aevko-alert-dialog>',
    },
    drawer: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoDrawer } from './ui/drawer';",
      metadata: 'imports: [AevkoDrawer],',
      template:
        '<aevko-drawer title="Filters"><button aevkoDrawerTrigger>Open</button><button aevkoDrawerClose>Apply</button></aevko-drawer>',
    },
    sheet: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSheet } from './ui/sheet';",
      metadata: 'imports: [AevkoSheet],',
      template:
        '<aevko-sheet title="Settings"><button aevkoSheetTrigger>Open</button><button aevkoSheetClose>Save</button></aevko-sheet>',
    },
    popover: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoPopover, AevkoPopoverTrigger } from './ui/popover';",
      metadata: 'imports: [AevkoPopover, AevkoPopoverTrigger],',
      template:
        '<aevko-popover label="Options"><button aevkoPopoverTrigger>Open</button><p>Options</p></aevko-popover>',
    },
    'hover-card': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoHoverCard, AevkoHoverCardTrigger } from './ui/hover-card';",
      metadata: 'imports: [AevkoHoverCard, AevkoHoverCardTrigger],',
      template:
        '<aevko-hover-card><a aevkoHoverCardTrigger href="#profile">Profile</a><p>Preview</p></aevko-hover-card>',
    },
    tooltip: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoTooltip, AevkoTooltipTrigger } from './ui/tooltip';",
      metadata: 'imports: [AevkoTooltip, AevkoTooltipTrigger],',
      template:
        '<aevko-tooltip><button aevkoTooltipTrigger>Save</button><span>Save workspace</span></aevko-tooltip>',
    },
    toast: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoToaster } from './ui/toast';",
      metadata: 'imports: [AevkoToaster],',
      template: '<aevko-toaster />',
    },
    command: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCommand } from './ui/command';",
      metadata: 'imports: [AevkoCommand],',
      template: '<aevko-command label="Commands" [items]="items" />',
      classBody: "items = [{ id: 'new', label: 'New project' }];",
    },
    'dropdown-menu': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoDropdownMenu, AevkoDropdownMenuItem, AevkoDropdownMenuTrigger } from './ui/dropdown-menu';",
      metadata: 'imports: [AevkoDropdownMenu, AevkoDropdownMenuItem, AevkoDropdownMenuTrigger],',
      template:
        '<aevko-dropdown-menu label="Actions"><button aevkoDropdownMenuTrigger>Open</button><button aevkoDropdownMenuItem>Profile</button></aevko-dropdown-menu>',
    },
    'context-menu': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoContextMenu, AevkoContextMenuItem, AevkoContextMenuTrigger } from './ui/context-menu';",
      metadata: 'imports: [AevkoContextMenu, AevkoContextMenuItem, AevkoContextMenuTrigger],',
      template:
        '<aevko-context-menu label="Canvas"><div aevkoContextMenuTrigger>Canvas</div><button aevkoContextMenuItem>Duplicate</button></aevko-context-menu>',
    },
    menubar: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoMenubar, AevkoMenubarItem } from './ui/menubar';",
      metadata: 'imports: [AevkoMenubar, AevkoMenubarItem],',
      template:
        '<aevko-menubar label="Application"><button aevkoMenubarItem>File</button></aevko-menubar>',
    },
    'navigation-menu': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoNavigationMenu } from './ui/navigation-menu';",
      metadata: 'imports: [AevkoNavigationMenu],',
      template:
        '<aevko-navigation-menu label="Primary"><a href="#docs">Docs</a></aevko-navigation-menu>',
    },
    calendar: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCalendar } from './ui/calendar';",
      metadata: 'imports: [AevkoCalendar],',
      template: '<aevko-calendar label="Choose date" month="2026-10" />',
    },
    combobox: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoCombobox } from './ui/combobox';",
      metadata: 'imports: [AevkoCombobox],',
      template: '<aevko-combobox label="Framework" [items]="items" />',
      classBody: "items = [{ value: 'angular', label: 'Angular' }];",
    },
    'date-picker': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoDatePicker } from './ui/date-picker';",
      metadata: 'imports: [AevkoDatePicker],',
      template: '<aevko-date-picker label="Deployment date" month="2026-10" />',
    },
    questionnaire: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoQuestionnaire } from './ui/questionnaire';",
      metadata: 'imports: [AevkoQuestionnaire],',
      template: '<aevko-questionnaire label="Brief" [items]="items" />',
      classBody:
        "items = [{ name: 'scope', prompt: 'Choose scope', choices: [{ value: 'one', label: 'One' }] }];",
    },
    select: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSelect } from './ui/select';",
      metadata: 'imports: [AevkoSelect],',
      template: '<aevko-select label="Theme" [items]="items" />',
      classBody: "items = [{ value: 'dark', label: 'Dark' }];",
    },
    direction: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoDirection } from './ui/direction';",
      metadata: 'imports: [AevkoDirection],',
      template: '<main aevkoDirection="rtl">Content</main>',
    },
    empty: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoEmpty } from './ui/empty';",
      metadata: 'imports: [AevkoEmpty],',
      template: '<aevko-empty><h2 aevkoEmptyTitle>Empty</h2></aevko-empty>',
    },
    field: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoField, AevkoFieldDescription, AevkoFieldLabel } from './ui/field';",
      metadata: 'imports: [AevkoField, AevkoFieldDescription, AevkoFieldLabel],',
      template:
        '<aevko-field><label aevkoFieldLabel for="email">Email</label><input id="email" aria-describedby="help"><span aevkoFieldDescription id="help">Work email</span></aevko-field>',
    },
    input: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoInput } from './ui/input';",
      metadata: 'imports: [AevkoInput],',
      template: '<label for="name">Name</label><input aevkoInput id="name">',
    },
    item: {
      imports: "import { Component } from '@angular/core';\nimport { AevkoItem } from './ui/item';",
      metadata: 'imports: [AevkoItem],',
      template: '<aevko-item><strong aevkoItemTitle>Item</strong></aevko-item>',
    },
    label: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoLabel } from './ui/label';",
      metadata: 'imports: [AevkoLabel],',
      template: '<label aevkoLabel for="name">Name</label><input id="name">',
    },
    'native-select': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoNativeSelect } from './ui/native-select';",
      metadata: 'imports: [AevkoNativeSelect],',
      template:
        '<label for="role">Role</label><select aevkoNativeSelect id="role"><option>Designer</option></select>',
    },
    resizable: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoResizable } from './ui/resizable';",
      metadata: 'imports: [AevkoResizable],',
      template:
        '<aevko-resizable><div aevkoResizableFirst>One</div><div aevkoResizableSecond>Two</div></aevko-resizable>',
    },
    'scroll-area': {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoScrollArea } from './ui/scroll-area';",
      metadata: 'imports: [AevkoScrollArea],',
      template: '<aevko-scroll-area>Scrollable content</aevko-scroll-area>',
    },
    separator: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSeparator } from './ui/separator';",
      metadata: 'imports: [AevkoSeparator],',
      template: '<aevko-separator [decorative]="false" />',
    },
    sidebar: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoSidebar } from './ui/sidebar';",
      metadata: 'imports: [AevkoSidebar],',
      template: '<aevko-sidebar label="Workspace"><a href="#home">Home</a></aevko-sidebar>',
    },
    table: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoTable, AevkoTableBody, AevkoTableCaption, AevkoTableCell, AevkoTableContainer, AevkoTableHead, AevkoTableHeader, AevkoTableRow } from './ui/table';",
      metadata:
        'imports: [AevkoTable, AevkoTableBody, AevkoTableCaption, AevkoTableCell, AevkoTableContainer, AevkoTableHead, AevkoTableHeader, AevkoTableRow],',
      template:
        '<div aevkoTableContainer label="Projects"><table aevkoTable><caption aevkoTableCaption>Projects</caption><thead aevkoTableHeader><tr aevkoTableRow><th aevkoTableHead scope="col">Name</th></tr></thead><tbody aevkoTableBody><tr aevkoTableRow><td aevkoTableCell>Aevko</td></tr></tbody></table></div>',
    },
    textarea: {
      imports:
        "import { Component } from '@angular/core';\nimport { AevkoTextarea } from './ui/textarea';",
      metadata: 'imports: [AevkoTextarea],',
      template:
        '<label for="notes">Notes</label><textarea aevkoTextarea id="notes" autoResize></textarea>',
    },
  };
  return sources[component];
}

for (const component of components) {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), `aevko-${component}-`));
  const app = path.join(temporaryRoot, 'consumer');
  try {
    execute(
      pnpm,
      [
        'dlx',
        '@angular/cli@22.2.5',
        'new',
        'consumer',
        '--directory',
        'consumer',
        '--skip-git',
        '--skip-install',
        '--style',
        'css',
        '--standalone',
        '--strict',
        '--package-manager',
        'npm',
        '--defaults',
      ],
      temporaryRoot,
    );
    execute('node', [cli, 'init', '--cwd', app, '--yes', '--registry', registry], workspace);
    execute('node', [cli, 'add', component, '--cwd', app, '--yes'], workspace);
    const source = appSource(component);
    await writeFile(
      path.join(app, 'src/app/app.ts'),
      `${source.imports}\n\n@Component({\n  selector: 'app-root',\n  ${source.metadata}\n  template: \`${source.template}\`,\n})\nexport class App { ${source.classBody ?? ''} }\n`,
      'utf8',
    );
    execute(npm, ['install'], app);
    execute(npm, ['run', 'build'], app);
    const packageJson = JSON.parse(await readFile(path.join(app, 'package.json'), 'utf8'));
    if (packageJson.dependencies?.['@aevko/ui'] || packageJson.dependencies?.['@aevko/source']) {
      throw new Error(`${component} introduced an Aevko runtime dependency.`);
    }
    if (
      packageJson.dependencies?.['@lucide/angular'] ||
      packageJson.devDependencies?.['@lucide/angular']
    ) {
      throw new Error(`${component} introduced an optional Lucide dependency.`);
    }
    console.log(`CONSUMER_SMOKE_OK ${component}`);
  } finally {
    const relative = path.relative(tmpdir(), temporaryRoot);
    if (!relative.startsWith('..') && !path.isAbsolute(relative)) {
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  }
}
