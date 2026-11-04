export const catalog = {};
const add = (slug, title, description, template, classBody = '', extraImports = []) =>
  (catalog[slug] ??= []).push({ title, description, template, classBody, extraImports });
const action = (text, expression) =>
  `<button aevkoButton variant="outline" (click)="${expression}">${text}</button>`;
const state = '<p class="feedback" role="status">{{ status }}</p>';
const button = ["import { AevkoButton } from './ui/button';"];
add(
  'button',
  'Variants',
  'Choose the emphasis that matches the action. Every enabled button reports its activation.',
  `<div class="row">${['primary', 'secondary', 'outline', 'ghost', 'link', 'danger'].map((v) => `<button aevkoButton variant="${v}" (click)="status = '${v} selected'">${v[0].toUpperCase() + v.slice(1)}</button>`).join('')}</div>${state}`,
  "status = 'Choose an action.';",
);
add(
  'button',
  'Sizes and icon actions',
  'Compare compact, standard, and large controls. Icon-only actions retain accessible names.',
  `<div class="row"><button aevkoButton size="sm" (click)="count=count+1">Small</button><button aevkoButton (click)="count=count+1">Default</button><button aevkoButton size="lg" (click)="count=count+1">Large</button><button aevkoButton size="icon" aria-label="Add project" (click)="count=count+1">+</button></div><p role="status">{{ count }} actions performed</p>`,
  'count = 0;',
);
add(
  'button',
  'Loading and disabled',
  'Loading prevents duplicate activation. The separate control lets you inspect both states without an artificial network request.',
  `<div class="row"><button aevkoButton [loading]="loading" (click)="loading=true">{{ loading ? 'Saving' : 'Save changes' }}</button><button aevkoButton disabled>Unavailable</button>${action('Reset', 'loading=false')}</div>`,
  'loading = false;',
);
add(
  'badge',
  'Status variants',
  'Use compact labels for status, with text conveying meaning independently of color.',
  `<div class="row">${['default', 'secondary', 'outline'].map((v, i) => `<aevko-badge${v === 'default' ? '' : ` variant="${v}"`}>${['Published', 'In review', 'Draft'][i]}</aevko-badge>`).join('')}</div>`,
);
add(
  'badge',
  'Linked badge',
  'Use native anchors for a label that navigates to more information.',
  '<a aevkoBadge variant="link" href="#api-reference">Read the API reference →</a>',
);
add(
  'alert',
  'With description',
  'Pair a concise title with an actionable explanation.',
  '<aevko-alert><span aevkoAlertIcon>✓</span><strong aevkoAlertTitle>Workspace is ready</strong><span aevkoAlertDescription>Your collaborators can now access the shared project files.</span></aevko-alert>',
);
add(
  'alert',
  'Error and recovery',
  'Keep the error visible until the user retries. The message updates after activation.',
  `<aevko-alert [variant]="retried ? 'default' : 'danger'" live="assertive"><strong aevkoAlertTitle>{{ retried ? 'Connection restored' : 'Unable to sync' }}</strong><span aevkoAlertDescription>{{ retried ? 'Your local changes are now up to date.' : 'Your changes are saved locally. Retry when you are ready.' }}</span>${action('Retry sync', 'retried=true')}</aevko-alert>`,
  'retried = false;',
  button,
);
add(
  'button-group',
  'Selected action',
  'Group related controls and expose their selected state.',
  '<aevko-button-group label="Text alignment">@for (option of options; track option) { <button aevkoButton [variant]="alignment === option ? \'primary\' : \'outline\'" [attr.aria-pressed]="alignment === option" (click)="alignment=option">{{option}}</button> }</aevko-button-group><p [style.text-align]="alignment">The preview follows the selected alignment.</p>',
  "options = ['left', 'center', 'right']; alignment = 'left';",
);
add(
  'button-group',
  'Vertical actions',
  'Use vertical orientation for a compact stack of related actions.',
  `<aevko-button-group orientation="vertical" label="Project actions"><button aevkoButton variant="outline" (click)="status='Project duplicated'">Duplicate</button><button aevkoButton variant="outline" (click)="status='Project archived'">Archive</button></aevko-button-group>${state}`,
  "status = 'Choose an action.';",
);
add(
  'toggle',
  'Outline and controlled state',
  'Use a pressed toggle for formatting, with a live preview of its state.',
  '<button aevkoToggle variant="outline" aria-label="Bold text" [(pressed)]="pressed">Bold</button><p [style.font-weight]="pressed ? 700 : 400">Make this sentence bold.</p>',
  'pressed = false;',
);
add(
  'toggle',
  'Disabled state',
  'An unavailable toggle retains its label and cannot change state.',
  '<div class="row"><button aevkoToggle disabled aria-label="Unavailable italic formatting">Italic</button><button aevkoToggle [pressed]="true" aria-label="Underline formatting">Underline</button></div>',
);
add(
  'toggle-group',
  'Multiple selection',
  'Allow several formatting options to remain pressed.',
  '<aevko-toggle-group label="Formatting" type="multiple" [(value)]="format"><button aevkoToggleGroupItem value="bold">Bold</button><button aevkoToggleGroupItem value="italic">Italic</button><button aevkoToggleGroupItem value="underline">Underline</button></aevko-toggle-group><p role="status">Selected: {{ format.join(\', \') || \'none\' }}</p>',
  'format: readonly string[] = [];',
);
add(
  'toggle-group',
  'Single selection',
  'Keep one density option selected at a time.',
  '<aevko-toggle-group label="Density" type="single"><button aevkoToggleGroupItem value="compact">Compact</button><button aevkoToggleGroupItem value="comfortable">Comfortable</button><button aevkoToggleGroupItem value="roomy">Roomy</button></aevko-toggle-group>',
);
add(
  'aspect-ratio',
  'Landscape media',
  'Reserve space before media loads, preserving a stable layout.',
  '<aevko-aspect-ratio ratio="16/9"><div class="media">Landscape · 16:9</div></aevko-aspect-ratio>',
);
add(
  'aspect-ratio',
  'Square and portrait',
  'Compare ratios for profile artwork and editorial content.',
  '<div class="columns"><aevko-aspect-ratio ratio="1/1"><div class="media">Square · 1:1</div></aevko-aspect-ratio><aevko-aspect-ratio ratio="3/4"><div class="media">Portrait · 3:4</div></aevko-aspect-ratio></div>',
);
add(
  'avatar',
  'Sizes and fallback',
  'Initials remain available when no image is supplied.',
  '<div class="row"><aevko-avatar alt="Ada Lovelace" fallback="AL" size="2rem"/><aevko-avatar alt="Noah Williams" fallback="NW" size="3rem"/><aevko-avatar alt="Olivia Martin" fallback="OM" size="4rem"/></div>',
);
add(
  'avatar',
  'Team composition',
  'Compose avatars with names and roles instead of relying on initials alone.',
  '<div class="row"><aevko-avatar alt="Ada Lovelace" fallback="AL"/><div><strong>Ada Lovelace</strong><p class="muted">Workspace administrator</p></div></div>',
);
add(
  'attachment',
  'File actions',
  'A native download link provides an actual downloadable sample file.',
  '<aevko-attachment name="project-brief.txt" metadata="Text document · sample"><a aevkoAttachmentAction download="project-brief.txt" href="data:text/plain,Project%20brief%0AReview%20the%20new%20workspace%20interface.">Download</a></aevko-attachment>',
);
add(
  'attachment',
  'Removable attachment',
  'Compose an attachment list with a working remove action.',
  `@if (attached) { <aevko-attachment name="research-notes.txt" metadata="Text document"><button type="button" aevkoAttachmentAction (click)="attached=false">Remove</button></aevko-attachment> } @else { <p role="status">Attachment removed.</p>${action('Attach again', 'attached=true')} }`,
  'attached = true;',
  button,
);
add(
  'breadcrumb',
  'Project hierarchy',
  'Keep the current destination non-interactive and label the navigation.',
  '<aevko-breadcrumb label="Project hierarchy"><aevko-breadcrumb-item><a href="/components">Components</a></aevko-breadcrumb-item><aevko-breadcrumb-item><a href="/components/card">Layout</a></aevko-breadcrumb-item><aevko-breadcrumb-item [current]="true">Project settings</aevko-breadcrumb-item></aevko-breadcrumb>',
);
add(
  'breadcrumb',
  'Short path',
  'A compact path is useful on narrower pages.',
  '<aevko-breadcrumb label="Current location"><aevko-breadcrumb-item><a href="/">Home</a></aevko-breadcrumb-item><aevko-breadcrumb-item [current]="true">Workspace</aevko-breadcrumb-item></aevko-breadcrumb>',
);
add(
  'bubble',
  'Alignment and variants',
  'Use alignment to distinguish participants and text to communicate the message.',
  '<aevko-bubble variant="muted">Is the new workspace ready?</aevko-bubble><aevko-bubble align="end">Yes, the files are ready for review.</aevko-bubble><aevko-bubble variant="outline">I will add my feedback this afternoon.</aevko-bubble>',
);
add(
  'bubble',
  'Interactive reactions',
  'Projected native buttons can maintain reaction state.',
  '<aevko-bubble variant="muted">The latest design is ready.<button type="button" aevkoBubbleReactions [attr.aria-pressed]="liked" (click)="liked=!liked">{{liked ? \'Liked · 3\' : \'Like · 2\'}}</button></aevko-bubble>',
  'liked = false;',
);
add(
  'checkbox',
  'Description and controlled state',
  'Keep supporting copy associated with its control.',
  '<label class="row"><input aevkoCheckbox type="checkbox" aria-describedby="updates-help" [checked]="checked" (change)="checked=$any($event.target).checked"/> Product updates</label><p id="updates-help" class="muted">Receive a monthly summary. Unsubscribe at any time.</p><p role="status">Updates {{checked ? \'enabled\' : \'disabled\'}}.</p>',
  'checked = false;',
);
add(
  'checkbox',
  'Disabled and indeterminate',
  'Compare unavailable controls with a partially selected parent.',
  '<div class="stack"><label class="row"><input aevkoCheckbox type="checkbox" disabled checked/> Required policy</label><label class="row"><input aevkoCheckbox type="checkbox" [indeterminate]="true"/> Some projects selected</label></div>',
);
add(
  'switch',
  'Notification preferences',
  'A native checkbox switch exposes checked and disabled states.',
  '<label class="row between">Email notifications<input aevkoSwitch type="checkbox" [checked]="enabled" (change)="enabled=$any($event.target).checked"/></label><p role="status">Email notifications are {{enabled ? \'on\' : \'off\'}}.</p>',
  'enabled = true;',
);
add(
  'switch',
  'Unavailable setting',
  'Explain why a setting is unavailable instead of hiding it.',
  '<label class="row between">Organization audit log<input aevkoSwitch type="checkbox" disabled checked/></label><p class="muted">Managed by your workspace administrator.</p>',
);
add(
  'radio-group',
  'Plan selection',
  'Native radios share a name and expose their selected option.',
  '<fieldset aevkoRadioGroup><legend>Workspace plan</legend>@for (option of plans; track option) { <label class="row"><input aevkoRadioGroupItem type="radio" name="plan" [value]="option" [checked]="plan===option" (change)="plan=option"/>{{option}}</label> }</fieldset><p role="status">Selected plan: {{plan}}</p>',
  "plans=['Starter','Team','Enterprise']; plan='Team';",
);
add(
  'radio-group',
  'Disabled option',
  'Keep unavailable choices understandable to keyboard and screen reader users.',
  '<fieldset aevkoRadioGroup><legend>Delivery frequency</legend><label class="row"><input aevkoRadioGroupItem type="radio" name="delivery" checked/> Weekly summary</label><label class="row"><input aevkoRadioGroupItem type="radio" name="delivery" disabled/> Instant alerts — not available</label></fieldset>',
);
add(
  'input',
  'Input types',
  'Use native email and password behavior with explicit labels.',
  '<label for="email">Work email</label><input aevkoInput id="email" type="email" placeholder="ada@example.com" autocomplete="email"/><label for="password">Password</label><input aevkoInput id="password" type="password" placeholder="Enter your password" autocomplete="new-password"/>',
);
add(
  'input',
  'Disabled and invalid',
  'Show validation feedback without relying only on the border color.',
  '<label for="locked">Workspace ID</label><input aevkoInput id="locked" value="workspace-024" disabled/><label for="invalid-email">Email address</label><input aevkoInput id="invalid-email" type="email" value="not-an-email" aria-invalid="true" aria-describedby="email-error"/><p id="email-error" class="muted">Enter a valid email address.</p>',
);
add(
  'textarea',
  'Auto-resizing notes',
  'The textarea expands as you add lines. Its label remains visible.',
  '<label for="notes">Project notes</label><textarea aevkoTextarea id="notes" autoResize placeholder="Describe the goals for this project..."></textarea>',
);
add(
  'textarea',
  'Character feedback',
  'A native maxlength constraint works alongside a visible count.',
  '<label for="summary">Short description</label><textarea aevkoTextarea id="summary" maxlength="160" [value]="text" (input)="text=$any($event.target).value" aria-describedby="summary-count"></textarea><p id="summary-count" class="muted">{{text.length}} / 160 characters</p>',
  "text='A shared space for our product team.';",
);
add(
  'label',
  'Associated control',
  'Clicking the label focuses its input.',
  '<label aevkoLabel for="project-name">Project name</label><input id="project-name" class="native-input" placeholder="Website redesign"/>',
);
add(
  'label',
  'Required field',
  'Use a visible requirement alongside the native required attribute.',
  '<label aevkoLabel for="required-email">Work email <span class="muted">(required)</span></label><input id="required-email" class="native-input" type="email" required aria-describedby="required-help"/><p id="required-help" class="muted">We use this address for account notifications.</p>',
);
add(
  'native-select',
  'Grouped options',
  'Native option groups preserve familiar platform keyboard behavior.',
  '<label for="region">Deployment region</label><select aevkoNativeSelect id="region"><optgroup label="Americas"><option>São Paulo</option><option>Virginia</option></optgroup><optgroup label="Europe"><option>Frankfurt</option><option>London</option></optgroup></select>',
);
add(
  'native-select',
  'Placeholder and disabled',
  'A disabled placeholder prompts an explicit choice.',
  '<label for="language">Language</label><select aevkoNativeSelect id="language"><option value="" disabled selected>Select a language</option><option>English</option><option>Portuguese</option></select><label for="currency">Currency</label><select aevkoNativeSelect id="currency" disabled><option>USD — managed by your team</option></select>',
);
add(
  'slider',
  'Live value',
  'Update an output as the native range control changes.',
  '<label for="volume">Volume</label><input aevkoSlider id="volume" type="range" min="0" max="100" [value]="volume" (input)="volume=+$any($event.target).value"/><output for="volume">{{volume}}%</output>',
  'volume = 40;',
);
add(
  'slider',
  'Steps and disabled',
  'Use native bounds and increments for discrete values.',
  '<label for="seats">Team seats</label><input aevkoSlider id="seats" type="range" min="5" max="50" step="5" value="15"/><label for="locked-volume">Managed volume</label><input aevkoSlider id="locked-volume" type="range" disabled value="70"/>',
);
add(
  'progress',
  'Controlled progress',
  'Advance a simulated upload and observe the semantic progress value.',
  `<aevko-progress label="Project upload" [value]="progress"/><p role="status">{{progress}}% complete</p><div class="row">${action('Advance', 'progress=progress>=100 ? 0 : progress+20')}${action('Reset', 'progress=0')}</div>`,
  'progress=20;',
  button,
);
add(
  'progress',
  'Different completion states',
  'Use the label and accompanying text to distinguish tasks.',
  '<p class="muted">Design review · 25%</p><aevko-progress label="Design review" [value]="25"/><p class="muted">Implementation · 75%</p><aevko-progress label="Implementation" [value]="75"/><p class="muted">Research · complete</p><aevko-progress label="Research" [value]="100"/>',
);
add(
  'spinner',
  'Sizes',
  'Keep a descriptive accessible label for each loading indicator.',
  '<div class="row"><aevko-spinner label="Loading profile" size="1rem"/><aevko-spinner label="Loading projects" size="1.5rem"/><aevko-spinner label="Loading workspace" size="2rem"/></div>',
);
add(
  'spinner',
  'Inline status',
  'Combine an indicator with a useful status message.',
  '<div class="row"><aevko-spinner label="Synchronizing files" size="1rem"/><span>Synchronizing your project files...</span></div>',
);
add(
  'skeleton',
  'Profile placeholder',
  'Reserve the shape of the final content while it loads.',
  '<div class="row" role="status" aria-label="Loading profile"><aevko-skeleton style="width:3rem;height:3rem"/><div class="stack grow"><aevko-skeleton style="height:1rem;width:70%"/><aevko-skeleton style="height:0.75rem;width:45%"/></div></div>',
);
add(
  'skeleton',
  'Card placeholder',
  'Keep media and copy areas stable during loading.',
  '<div class="panel stack" role="status" aria-label="Loading project card"><aevko-skeleton style="height:9rem;width:100%"/><aevko-skeleton style="height:1rem;width:65%"/><aevko-skeleton style="height:0.75rem;width:90%"/></div>',
);
add(
  'kbd',
  'Key combinations',
  'Group the individual keys of a shortcut.',
  '<div class="row"><span aevkoKbdGroup aria-label="Control Shift P"><kbd aevkoKbd>Ctrl</kbd><kbd aevkoKbd>Shift</kbd><kbd aevkoKbd>P</kbd></span><span>Open command palette</span></div>',
);
add(
  'kbd',
  'Inline instruction',
  'Use keyboard hints inside normal instructional text.',
  '<p>Press <kbd aevkoKbd size="sm">Esc</kbd> to dismiss a dialog, or <kbd aevkoKbd size="sm">Tab</kbd> to move to the next control.</p>',
);
add(
  'marker',
  'Status labels',
  'Pair every indicator with a readable status.',
  '<div class="row"><aevko-marker>Available</aevko-marker><aevko-marker variant="muted">Queued</aevko-marker><aevko-marker variant="danger">Blocked</aevko-marker></div>',
);
add(
  'marker',
  'Changing status',
  'A marker can reflect live application state.',
  `<aevko-marker [variant]="paused ? 'muted' : 'default'">{{paused ? 'Paused' : 'Running'}}</aevko-marker>${action('Toggle process', 'paused=!paused')}`,
  'paused=false;',
  button,
);
for (const slug of ['select', 'combobox']) {
  const tag = `aevko-${slug}`;
  add(
    slug,
    'Controlled selection',
    'Choose a framework and observe the form value update.',
    `<${tag} id="framework" label="Framework" [items]="items" [formControl]="value"/><p role="status">Selected: {{value.value || 'none'}}</p>`,
    "items=[{value:'angular',label:'Angular'},{value:'vue',label:'Vue'},{value:'svelte',label:'Svelte'},{value:'react',label:'React'}]; value = new FormControl('', {nonNullable:true});",
  );
  add(
    slug,
    'Disabled options',
    'Unavailable choices remain visible but cannot be selected.',
    `<${tag} id="region" label="Region" [items]="items" [formControl]="value"/><p class="muted">London is temporarily unavailable.</p>`,
    "items=[{value:'sao-paulo',label:'São Paulo'},{value:'frankfurt',label:'Frankfurt'},{value:'london',label:'London',disabled:true}]; value = new FormControl('sao-paulo', {nonNullable:true});",
  );
  add(
    slug,
    'Disabled control',
    'A disabled form control cannot open or change selection.',
    `<${tag} id="disabled-region" label="Managed region" [items]="items" [formControl]="value"/>`,
    "items=[{value:'sao-paulo',label:'São Paulo'}]; value = new FormControl({value:'sao-paulo', disabled:true}, {nonNullable:true});",
  );
}
add(
  'calendar',
  'Controlled date',
  'Choose a date with pointer or keyboard and observe the ISO value.',
  '<aevko-calendar label="Schedule a review" month="2026-11" [(value)]="selected"/><p role="status">Selected date: {{selected || \'none\'}}</p>',
  "selected='2026-11-12';",
);
add(
  'calendar',
  'Date bounds',
  'Restrict the available dates to a project planning window.',
  '<aevko-calendar label="Planning window" month="2026-11" min="2026-11-10" max="2026-11-24"/><p class="muted">Available from November 10 through November 24.</p>',
);
add(
  'date-picker',
  'Form control',
  'A date picker combines a trigger, floating surface, and calendar in one form control.',
  '<aevko-date-picker label="Review date" month="2026-11" [formControl]="date"/><p role="status">Review date: {{date.value || \'not selected\'}}</p>',
  "date = new FormControl('', {nonNullable:true});",
);
add(
  'date-picker',
  'Restricted dates',
  'Limit selection to a valid booking period.',
  '<aevko-date-picker label="Booking date" month="2026-11" min="2026-11-10" max="2026-11-24" placeholder="Choose an available date"/><p class="muted">Bookings are available November 10–24.</p>',
);
add(
  'input-otp',
  'Four-digit code',
  'Adjust the length for a shorter verification flow.',
  '<aevko-input-otp label="Four-digit verification code" [maxLength]="4" [(value)]="code"/><p role="status">{{code.length}} of 4 characters entered</p>',
  "code='';",
);
add(
  'input-otp',
  'Invalid and disabled',
  'Keep the error explanation outside the individual code slots.',
  '<aevko-input-otp label="Invalid verification code" [invalid]="true" value="123456"/><p class="muted">This code has expired. Request a new code.</p><aevko-input-otp label="Unavailable verification code" disabled value="654321"/>',
);
add(
  'input-group',
  'Prefix and suffix',
  'Keep a URL prefix separate from the editable field.',
  '<label for="website">Website</label><aevko-input-group><aevko-input-group-addon>https://</aevko-input-group-addon><input aevkoInputGroupControl id="website" placeholder="your-team.example"/></aevko-input-group>',
);
add(
  'input-group',
  'Action button',
  'The action uses the current input value and confirms the result.',
  '<label for="search">Search projects</label><aevko-input-group><input aevkoInputGroupControl id="search" [value]="query" (input)="query=$any($event.target).value"/><button aevkoInputGroupButton (click)="result=query ? \'Searching for: \' + query : \'Enter a project name first.\'">Search</button></aevko-input-group><p role="status">{{result}}</p>',
  "query='';result='Enter a project name.';",
);
add(
  'field',
  'Vertical field',
  'Group a label, control, and description with explicit associations.',
  '<aevko-field><label aevkoFieldLabel for="field-email">Email address</label><aevko-field-content><input class="native-input" id="field-email" type="email" aria-describedby="field-help" placeholder="ada@example.com"/><span aevkoFieldDescription id="field-help">Use the address associated with your workspace.</span></aevko-field-content></aevko-field>',
);
add(
  'field',
  'Responsive settings',
  'The responsive orientation adapts a settings row to the available space.',
  '<aevko-field-group><aevko-field orientation="responsive"><label aevkoFieldLabel for="display-name">Display name</label><aevko-field-content><input class="native-input" id="display-name" value="Ada Lovelace"/><span aevkoFieldDescription>Shown to collaborators.</span></aevko-field-content></aevko-field><aevko-field orientation="responsive"><label aevkoFieldLabel for="time-zone">Time zone</label><aevko-field-content><select class="native-input" id="time-zone"><option>America/Sao_Paulo</option><option>Europe/London</option></select></aevko-field-content></aevko-field></aevko-field-group>',
);
add(
  'card',
  'Project summary',
  'Compose the card header, content, and footer around a meaningful action.',
  `<aevko-card><aevko-card-header><aevko-card-title>Website redesign</aevko-card-title><aevko-card-description>A shared workspace for the product team.</aevko-card-description></aevko-card-header><aevko-card-content><p>12 tasks remaining · 4 collaborators</p></aevko-card-content><aevko-card-footer>${action('Open project', "status='Project opened in this preview.'")}</aevko-card-footer></aevko-card>${state}`,
  "status='';",
  button,
);
add(
  'card',
  'Settings form',
  'Use native labels and controls inside the same card composition.',
  `<aevko-card><aevko-card-header><aevko-card-title>Create a project</aevko-card-title><aevko-card-description>Give your team a space to collaborate.</aevko-card-description></aevko-card-header><aevko-card-content><label for="project">Project name</label><input class="native-input" id="project" [value]="name" (input)="name=$any($event.target).value"/></aevko-card-content><aevko-card-footer>${action('Create project', "status=name ? 'Created ' + name : 'Enter a project name.'")}</aevko-card-footer></aevko-card>${state}`,
  "name='';status='';",
  button,
);
add(
  'empty',
  'First project',
  'Use a clear action to transition from an empty state to content.',
  `@if (!created) { <aevko-empty><strong aevkoEmptyTitle>No projects yet</strong><p aevkoEmptyDescription>Create a workspace project to organize your files and tasks.</p>${action('Create project', 'created=true')}</aevko-empty> } @else { <div class="panel"><strong>Untitled project</strong><p role="status">Your first project is ready.</p>${action('Reset example', 'created=false')}</div> }`,
  'created=false;',
  button,
);
add(
  'empty',
  'No search results',
  'Explain what happened and offer a useful recovery action.',
  `<aevko-empty><strong aevkoEmptyTitle>{{query ? 'No matching projects' : 'All projects'}}</strong><p aevkoEmptyDescription>{{query ? 'Try another term or clear the current search.' : 'Your filters have been cleared.'}}</p>${action('Clear search', "query=''")}</aevko-empty>`,
  "query='Archived research';",
  button,
);
add(
  'item',
  'Description and action',
  'Combine the primary label, supporting text, and an action.',
  `<aevko-item><strong aevkoItemTitle>Team workspace</strong><span aevkoItemDescription>4 members · Updated today</span><button type="button" aevkoItemAction (click)="status='Workspace opened.'">Open</button></aevko-item>${state}`,
  "status='';",
);
add(
  'item',
  'Item list',
  'Separate related destinations with consistent row structure.',
  '<div class="stack"><aevko-item><strong aevkoItemTitle>Project files</strong><span aevkoItemDescription>Design documents and shared assets</span></aevko-item><aevko-item><strong aevkoItemTitle>Team activity</strong><span aevkoItemDescription>Recent updates from your collaborators</span></aevko-item></div>',
);
add(
  'collapsible',
  'Project details',
  'Reveal supporting information without leaving the page.',
  '<aevko-collapsible label="Project details"><div class="stack"><p>Owner: Ada Lovelace</p><p>Created: November 3, 2026</p><p>Visibility: Team workspace</p></div></aevko-collapsible>',
);
add(
  'collapsible',
  'Controlled expansion',
  'An external action can control the same disclosure state.',
  `${action('Toggle details', 'expanded=!expanded')}<aevko-collapsible label="Connected repositories" [(open)]="expanded"><div class="stack"><code>workspace/web</code><code>workspace/docs</code><code>workspace/api</code></div></aevko-collapsible>`,
  'expanded=false;',
  button,
);
for (const slug of ['dialog', 'alert-dialog', 'drawer', 'sheet']) {
  const camel = slug === 'alert-dialog' ? 'AlertDialog' : slug[0].toUpperCase() + slug.slice(1);
  const tag = `aevko-${slug}`;
  add(
    slug,
    slug === 'alert-dialog' ? 'Confirm an action' : 'Edit project details',
    slug === 'alert-dialog'
      ? 'Require an explicit confirmation before changing application state.'
      : 'Use a labeled form inside the surface, with explicit save and cancel actions.',
    `<${tag} title="${slug === 'alert-dialog' ? 'Archive project?' : 'Edit project'}" description="${slug === 'alert-dialog' ? 'The project can be restored later.' : 'Update the name displayed in your workspace.'}"><button aevkoButton aevko${camel}Trigger variant="outline">${slug === 'alert-dialog' ? 'Archive project' : 'Edit project'}</button><div class="stack">${slug === 'alert-dialog' ? '<p>Collaborators will no longer see this project in their active list.</p>' : '<label for="edit-name">Project name</label><input class="native-input" id="edit-name" [value]="name" (input)="name=$any($event.target).value"/>'}<div class="row"><button aevkoButton aevko${camel}Close variant="outline">Cancel</button><button aevkoButton aevko${camel}Close (click)="status='${slug === 'alert-dialog' ? 'Project archived.' : 'Project saved: '}'+${slug === 'alert-dialog' ? "''" : 'name'}">${slug === 'alert-dialog' ? 'Confirm archive' : 'Save changes'}</button></div></div></${tag}>${state}`,
    "name='Website redesign';status='';",
    button,
  );
  add(
    slug,
    slug === 'sheet' || slug === 'drawer' ? 'Alternate side' : 'Controlled surface',
    slug === 'sheet' || slug === 'drawer'
      ? 'Choose a side that suits the surrounding layout.'
      : 'Open and close the surface through application state.',
    `${action('Open details', 'open=true')}<${tag} title="Project activity" [(open)]="open"${slug === 'sheet' ? ' side="left"' : slug === 'drawer' ? ' side="right"' : ''}><div class="stack"><p>Today: updated the project brief.</p><p>Yesterday: added two collaborators.</p>${action('Close details', 'open=false')}</div></${tag}>`,
    'open=false;',
    button,
  );
}
add(
  'popover',
  'Form in a popover',
  'Keep related controls close to their trigger and close explicitly after saving.',
  `<aevko-popover label="Display preferences" align="start" [(open)]="open"><button aevkoButton aevkoPopoverTrigger variant="outline">Display preferences</button><div class="stack"><strong>Layout settings</strong><label for="width">Maximum width</label><input class="native-input" id="width" type="number" value="960"/><button aevkoButton (click)="open=false; status='Preferences saved.'">Save preferences</button></div></aevko-popover>${state}`,
  "open=false;status='';",
  button,
);
add(
  'popover',
  'Placement and alignment',
  'Compare top and bottom placements. Surfaces remain constrained to the viewport.',
  `<div class="row"><aevko-popover label="Top aligned details" side="top" align="start"><button aevkoButton aevkoPopoverTrigger variant="outline">Above</button><p>Project details appear above this trigger.</p></aevko-popover><aevko-popover label="End aligned details" align="end"><button aevkoButton aevkoPopoverTrigger variant="outline">Aligned to end</button><p>This surface aligns with the end of its trigger.</p></aevko-popover></div>`,
  '',
  button,
);
add(
  'hover-card',
  'Profile preview',
  'Use hover or keyboard focus to reveal supplementary information.',
  '<aevko-hover-card><a aevkoHoverCardTrigger href="#api-reference">Ada Lovelace</a><div class="stack"><strong>Ada Lovelace</strong><p>Product engineer working on accessible interfaces.</p><p class="muted">Member since November 2026</p></div></aevko-hover-card>',
);
add(
  'hover-card',
  'Placement and delay',
  'Tune the opening delay for less urgent supporting content.',
  '<aevko-hover-card side="top" align="start" [delay]="400"><a aevkoHoverCardTrigger href="#api-reference">Workspace overview</a><p>Four collaborators, twelve active projects, and one shared design system.</p></aevko-hover-card>',
);
add(
  'tooltip',
  'Placement',
  'Hover or focus the trigger to inspect each placement.',
  `<div class="row">${['top', 'right', 'bottom', 'left'].map((side) => `<aevko-tooltip side="${side}" [delay]="150"><button aevkoButton aevkoTooltipTrigger variant="outline">${side}</button><span>Tooltip on the ${side}</span></aevko-tooltip>`).join('')}</div>`,
  '',
  button,
);
add(
  'tooltip',
  'Keyboard shortcut hint',
  'Keep the visible action label and add a supplemental hint.',
  `<aevko-tooltip><button aevkoButton aevkoTooltipTrigger variant="outline" (click)="status='Project saved.'">Save project</button><span>Save changes · Ctrl S</span></aevko-tooltip>${state}`,
  "status='';",
  button,
);
for (const slug of ['dropdown-menu', 'context-menu']) {
  const camel = slug === 'dropdown-menu' ? 'DropdownMenu' : 'ContextMenu';
  const trigger =
    slug === 'dropdown-menu'
      ? `<button aevkoButton aevko${camel}Trigger variant="outline">Project actions</button>`
      : `<div aevko${camel}Trigger class="context-target">Right-click here, or focus and press Shift F10.</div>`;
  add(
    slug,
    'Actions and disabled item',
    'Use the keyboard to move through enabled items and activate an action.',
    `<aevko-${slug} label="Project actions">${trigger}<button aevko${camel}Item (click)="status='Project opened.'">Open project</button><button aevko${camel}Item (click)="status='Project duplicated.'">Duplicate</button><button aevko${camel}Item disabled>Transfer ownership</button></aevko-${slug}>${state}`,
    "status='Choose an action.';",
    slug === 'dropdown-menu' ? button : [],
  );
  add(
    slug,
    'Destructive action',
    'State the action explicitly and report its result.',
    `<aevko-${slug} label="Archive actions">${trigger}<button aevko${camel}Item (click)="status='Project archived.'">Archive project</button><button aevko${camel}Item (click)="status='Project restored.'">Restore project</button></aevko-${slug}>${state}`,
    "status='The project is active.';",
    slug === 'dropdown-menu' ? button : [],
  );
}
add(
  'command',
  'Grouped commands',
  'Search across descriptions and activate commands with the keyboard.',
  '<aevko-command label="Workspace commands" [items]="items" (activated)="status=$event.label + \' activated\'"/>' +
    state,
  "items=[{id:'new',label:'New project',description:'Create a shared workspace',group:'Projects',shortcut:'Ctrl N'},{id:'search',label:'Search projects',description:'Find your recent work',group:'Projects'},{id:'profile',label:'Profile settings',group:'Account'},{id:'billing',label:'Billing',group:'Account',disabled:true}];status='Type a command to begin.';",
);
add(
  'command',
  'Empty results',
  'A query with no matches presents an explicit empty state.',
  '<aevko-command label="Search commands" [items]="items" query="missing project"/>',
  "items=[{id:'settings',label:'Open settings'},{id:'profile',label:'View profile'}];",
);
add(
  'menubar',
  'Keyboard navigation',
  'Arrow keys move between enabled actions. Activation updates the preview.',
  '<aevko-menubar label="Editor actions"><button aevkoMenubarItem (click)="status=\'File action selected\'">File</button><button aevkoMenubarItem (click)="status=\'Edit action selected\'">Edit</button><button aevkoMenubarItem disabled>Share</button><button aevkoMenubarItem (click)="status=\'Help action selected\'">Help</button></aevko-menubar>' +
    state,
  "status='Use Left and Right arrows to navigate.';",
);
add(
  'menubar',
  'Compact application actions',
  'Use clear action labels when this primitive does not contain submenus.',
  '<aevko-menubar label="Document actions"><button aevkoMenubarItem (click)="status=\'Document saved\'">Save</button><button aevkoMenubarItem (click)="status=\'Preview opened\'">Preview</button></aevko-menubar>' +
    state,
  "status='Ready';",
);
add(
  'navigation-menu',
  'Simple navigation',
  'Use real links and aria-current for the current destination.',
  '<aevko-navigation-menu label="Documentation sections"><a href="/getting-started">Getting started</a><a href="/components" aria-current="page">Components</a><a href="/theming">Theming</a></aevko-navigation-menu>',
);
add(
  'navigation-menu',
  'Secondary links',
  'A separately labeled group distinguishes secondary navigation.',
  '<aevko-navigation-menu label="Project resources"><a href="/cli">CLI reference</a><a href="/icons">Icons</a><a href="/contributing">Contributing</a></aevko-navigation-menu>',
);
add(
  'pagination',
  'Controlled page',
  'The selected page drives visible content in the same example.',
  '<div class="panel"><strong>Project results</strong><p>Showing page {{page}} of 8</p></div><aevko-pagination label="Project result pages" [totalPages]="8" [(page)]="page"/>',
  'page=1;',
);
add(
  'pagination',
  'Compact result set',
  'Small result sets keep the same native button behavior.',
  '<aevko-pagination label="Search result pages" [totalPages]="3" [(page)]="page"/><p role="status">Page {{page}} selected</p>',
  'page=2;',
);
add(
  'separator',
  'Horizontal sections',
  'Separate related groups without adding unnecessary announcements.',
  '<div><strong>Workspace</strong><p class="muted">Manage your project settings.</p></div><aevko-separator/><div class="row"><a href="/components">Components</a><a href="/getting-started">Documentation</a></div>',
);
add(
  'separator',
  'Vertical divider',
  'Use orientation for compact horizontal arrangements.',
  '<div class="row" style="height:2rem"><span>Documentation</span><aevko-separator orientation="vertical"/><span>Components</span><aevko-separator orientation="vertical"/><span>Examples</span></div>',
);
add(
  'tabs',
  'Vertical navigation',
  'Use a vertical tab list for settings sections.',
  '<aevko-tabs label="Workspace settings" orientation="vertical" value="profile"><aevko-tabs-list><button aevkoTabsTrigger value="profile">Profile</button><button aevkoTabsTrigger value="security">Security</button></aevko-tabs-list><aevko-tabs-content value="profile"><div class="panel"><strong>Profile settings</strong><p>Update your public name and contact details.</p></div></aevko-tabs-content><aevko-tabs-content value="security"><div class="panel"><strong>Account security</strong><p>Manage your password and active sessions.</p></div></aevko-tabs-content></aevko-tabs>',
);
add(
  'tabs',
  'Manual activation',
  'Arrow keys move focus; Enter or Space activates a tab when manual activation is selected.',
  '<aevko-tabs label="Project content" activation="manual" value="overview"><aevko-tabs-list><button aevkoTabsTrigger value="overview">Overview</button><button aevkoTabsTrigger value="activity">Activity</button><button aevkoTabsTrigger value="billing" disabled>Billing</button></aevko-tabs-list><aevko-tabs-content value="overview"><p>The current project has twelve open tasks.</p></aevko-tabs-content><aevko-tabs-content value="activity"><p>Ada updated the project brief today.</p></aevko-tabs-content><aevko-tabs-content value="billing">Billing is unavailable.</aevko-tabs-content></aevko-tabs>',
);
add(
  'carousel',
  'Looping slides',
  'Move with the controls or arrow keys. Looping returns to the first slide after the last.',
  '<aevko-carousel label="Project highlights" [loop]="true"><aevko-carousel-slide label="Research"><div class="media">01 · Research</div></aevko-carousel-slide><aevko-carousel-slide label="Design"><div class="media">02 · Design</div></aevko-carousel-slide><aevko-carousel-slide label="Build"><div class="media">03 · Build</div></aevko-carousel-slide></aevko-carousel>',
);
add(
  'carousel',
  'Vertical orientation',
  'Vertical keyboard navigation uses the Up and Down arrows.',
  '<aevko-carousel label="Onboarding steps" orientation="vertical"><aevko-carousel-slide label="Create workspace"><div class="media">Create your workspace</div></aevko-carousel-slide><aevko-carousel-slide label="Invite team"><div class="media">Invite your collaborators</div></aevko-carousel-slide></aevko-carousel>',
);
add(
  'resizable',
  'Controlled split',
  'Drag the handle or focus it and use the arrow keys to resize.',
  '<aevko-resizable [(size)]="size" [min]="25" [max]="75"><div aevkoResizableFirst class="panel">File browser</div><div aevkoResizableSecond class="panel">Document preview</div></aevko-resizable><p role="status">First panel: {{size}}%</p>',
  'size=40;',
);
add(
  'resizable',
  'Vertical panels',
  'Use the same accessible separator for vertically stacked panels.',
  '<aevko-resizable orientation="vertical" style="height:18rem"><div aevkoResizableFirst class="panel">Editor</div><div aevkoResizableSecond class="panel">Terminal output</div></aevko-resizable>',
);
add(
  'scroll-area',
  'Vertical list',
  'The scroll region remains keyboard focusable and uses native scrolling.',
  '<aevko-scroll-area style="height:14rem" aria-label="Project activity" scrollbar="thin"><div class="stack">@for (item of items; track item) { <div class="list-row">{{item}}</div> }</div></aevko-scroll-area>',
  "items=Array.from({length:12},(_,index)=>'Project update '+(index+1));",
);
add(
  'scroll-area',
  'Horizontal content',
  'A constrained viewport can also scroll wide content.',
  '<aevko-scroll-area style="max-width:100%" aria-label="Project timeline"><div class="row" style="width:60rem"><div class="panel grow">Discovery</div><div class="panel grow">Design</div><div class="panel grow">Implementation</div><div class="panel grow">Release</div></div></aevko-scroll-area>',
);
add(
  'direction',
  'Right-to-left layout',
  'Use logical alignment while preserving the meaning of the content.',
  '<div aevkoDirection="rtl" class="panel"><strong lang="ar">إعدادات الحساب</strong><p lang="ar">إدارة معلومات الحساب وتفضيلات مساحة العمل.</p><div class="row"><span>←</span><span lang="ar">العودة</span></div></div>',
);
add(
  'direction',
  'Nested direction',
  'A local direction boundary can differ from its surrounding application.',
  '<div aevkoDirection="ltr" class="panel stack"><strong>Account settings</strong><div aevkoDirection="rtl" class="panel"><p lang="ar">معاينة المحتوى باللغة العربية</p></div><p class="muted">The surrounding interface remains left to right.</p></div>',
);
add(
  'sidebar',
  'Controlled rail',
  'The external control and built-in control share the same collapsed state.',
  `${action('Toggle navigation', 'collapsed=!collapsed')}<aevko-sidebar label="Project workspace" [(collapsed)]="collapsed"><strong aevkoSidebarHeader>Workspace</strong><a href="/components" aria-label="Components">◫ <span [hidden]="collapsed">Components</span></a><a href="/getting-started" aria-label="Documentation">≡ <span [hidden]="collapsed">Documentation</span></a><small aevkoSidebarFooter>Personal workspace</small></aevko-sidebar>`,
  'collapsed=false;',
  button,
);
add(
  'sidebar',
  'Header and footer',
  'Compose project navigation with a named workspace and account footer.',
  '<aevko-sidebar label="Design workspace"><strong aevkoSidebarHeader>Design team</strong><a href="/components" aria-current="page">Components</a><a href="/blocks">Application blocks</a><a href="/theming">Theme settings</a><div aevkoSidebarFooter><strong>Ada Lovelace</strong><p class="muted">Workspace administrator</p></div></aevko-sidebar>',
);
const tableStart =
  '<div aevkoTableContainer label="Invoice table"><table aevkoTable><caption aevkoTableCaption>Recent invoices</caption><thead aevkoTableHeader><tr aevkoTableRow><th aevkoTableHead scope="col">Invoice</th><th aevkoTableHead scope="col">Status</th><th aevkoTableHead scope="col">Amount</th></tr></thead><tbody aevkoTableBody>';
add(
  'table',
  'Invoice rows',
  'Use native table headers and a caption to communicate the data structure.',
  tableStart +
    '<tr aevkoTableRow><td aevkoTableCell>INV-001</td><td aevkoTableCell>Paid</td><td aevkoTableCell>$240.00</td></tr><tr aevkoTableRow><td aevkoTableCell>INV-002</td><td aevkoTableCell>Pending</td><td aevkoTableCell>$120.00</td></tr></tbody></table></div>',
);
add(
  'table',
  'Empty table',
  'An empty state belongs inside a cell spanning the table columns.',
  tableStart.replace('Invoice table', 'Filtered invoices') +
    '<tr aevkoTableRow><td aevkoTableCell colspan="3">No invoices match the current filter.</td></tr></tbody></table></div>',
);
const rows =
  "rows=[{id:'p1',name:'Website redesign',owner:'Ada'},{id:'p2',name:'Mobile application',owner:'Noah'},{id:'p3',name:'Design system',owner:'Olivia'},{id:'p4',name:'Developer docs',owner:'Ada'}]; columns=[{key:'name',header:'Project',value:(row:{name:string})=>row.name,sortable:true},{key:'owner',header:'Owner',value:(row:{owner:string})=>row.owner,sortable:true}];rowKey=(row:{id:string})=>row.id;";
add(
  'data-table',
  'Sorting and pagination',
  'Sort by column and move through a small page size.',
  '<aevko-data-table caption="Workspace projects" [rows]="rows" [columns]="columns" [rowKey]="rowKey" [pageSize]="2"/>',
  rows,
);
add(
  'data-table',
  'Filtering and selection',
  'The table manages selection by stable row keys.',
  '<aevko-data-table caption="Selectable projects" [rows]="rows" [columns]="columns" [rowKey]="rowKey" [selectable]="true" [(selectedKeys)]="selected"/><p role="status">{{selected.length}} projects selected</p>',
  rows + ' selected: readonly string[]=[];',
);
const chartData =
  '<table aevkoChartData><caption>Quarterly signups</caption><tbody><tr><th scope="row">Q1</th><td>120</td></tr><tr><th scope="row">Q2</th><td>180</td></tr><tr><th scope="row">Q3</th><td>150</td></tr><tr><th scope="row">Q4</th><td>240</td></tr></tbody></table>';
const chartImport = ["import { AevkoChartCanvas } from './ui/chart';"];
const visitorData =
  "data={labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Desktop',values:[186,240,204,298,262,340,318],fill:true},{label:'Mobile',values:[98,144,112,180,164,220,194],fill:true}]};";
add(
  'chart',
  'Area · Interactive visitors',
  'Switch periods and use the legend to compare desktop and mobile traffic. Exact values remain available below the chart.',
  `<div class="row between"><div><strong>Website visitors</strong><p class="muted">Traffic across your connected sites</p></div><label>Period <select class="native-input" aria-label="Visitor period" [value]="period" (change)="changePeriod($any($event.target).value)"><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></label></div><aevko-chart-canvas label="Website visitors" [data]="data"/><p class="muted">Desktop and mobile sessions · {{period === '7' ? 'This week' : 'Last four weeks'}}</p>`,
  visitorData +
    "period='7'; changePeriod(value:string){this.period=value;this.data=value==='7'?{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Desktop',values:[186,240,204,298,262,340,318],fill:true},{label:'Mobile',values:[98,144,112,180,164,220,194],fill:true}]}:{labels:['Week 1','Week 2','Week 3','Week 4'],datasets:[{label:'Desktop',values:[1240,1480,1360,1848],fill:true},{label:'Mobile',values:[820,960,910,1112],fill:true}]};}",
  chartImport,
);
add(
  'chart',
  'Area · Stacked',
  'Stack related series to compare their contribution to a shared total.',
  '<aevko-chart-canvas label="Combined visitor traffic" [data]="data" [stacked]="true"/><p class="muted">Daily sessions · Desktop and mobile combined</p>',
  visitorData,
  chartImport,
);
add(
  'chart',
  'Area · Stepped',
  'Use steps for values that stay constant between updates.',
  '<aevko-chart-canvas label="Active subscriptions" [data]="data" [stepped]="true"/><p class="muted">Subscriptions at the end of each month</p>',
  "data={labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'Subscriptions',values:[180,180,240,240,320,380],fill:true}]};",
  chartImport,
);
add(
  'chart',
  'Bar · Grouped',
  'Compare two series side by side with shared axes and an interactive legend.',
  '<aevko-chart-canvas label="Monthly signups" type="bar" [data]="data"/><p class="muted">January–June · New accounts by plan</p>',
  "data={labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'Team',values:[186,305,237,273,209,314]},{label:'Enterprise',values:[80,120,90,130,100,145]}]};",
  chartImport,
);
add(
  'chart',
  'Bar · Horizontal',
  'Keep long category names readable with horizontal bars.',
  '<aevko-chart-canvas label="Revenue by channel" type="bar" [horizontal]="true" valueFormat="currency" [data]="data" [showLegend]="false"/>',
  "data={labels:['Direct','Search','Partners','Email','Social'],datasets:[{label:'Revenue',values:[18400,15200,12600,8400,6200]}]};",
  chartImport,
);
add(
  'chart',
  'Bar · Stacked',
  'Show how each plan contributes to recurring revenue.',
  '<aevko-chart-canvas label="Monthly recurring revenue" type="bar" [stacked]="true" valueFormat="currency" [data]="data"/>',
  "data={labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'Starter',values:[2800,3200,3400,3900,4200,4600]},{label:'Team',values:[6200,6800,7200,8100,8600,9200]},{label:'Enterprise',values:[9800,10400,11800,12400,13800,15200]}]};",
  chartImport,
);
add(
  'chart',
  'Line · Revenue comparison',
  'Compare this period with a dashed previous-period series.',
  '<aevko-chart-canvas label="Revenue comparison" valueFormat="currency" [data]="data"/><p class="muted">Current period and previous period · USD</p>',
  "data={labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'Current period',values:[12400,18200,15400,22100,19800,26400]},{label:'Previous period',values:[9800,12600,14200,16800,15600,18200],dashed:true}]};",
  chartImport,
);
add(
  'chart',
  'Line · Linear trend',
  'Connect observed values without smoothing between samples.',
  '<aevko-chart-canvas label="Activation rate" [smooth]="false" valueFormat="percent" [data]="data"/>',
  "data={labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'Activation',values:[42,51,48,62,58,71]}]};",
  chartImport,
);
add(
  'chart',
  'Pie · Traffic sources',
  'Compare category proportions. Activate a legend item to hide or restore a segment.',
  '<aevko-chart-canvas label="Traffic sources" type="pie" [data]="data"/>',
  "data={labels:['Search','Direct','Referral','Social','Email'],datasets:[{label:'Visitors',values:[1240,920,640,480,320]}]};",
  chartImport,
);
add(
  'chart',
  'Doughnut · Device share',
  'A compact distribution chart with keyboard-operable segment controls.',
  '<aevko-chart-canvas label="Sessions by device" type="doughnut" [data]="data"/><p class="muted">3,420 sessions across three device categories</p>',
  "data={labels:['Desktop','Mobile','Tablet'],datasets:[{label:'Sessions',values:[1860,1240,320]}]};",
  chartImport,
);
add(
  'chart',
  'Radar · Team performance',
  'Compare several dimensions on the same scale. The data table provides exact values.',
  '<aevko-chart-canvas label="Team performance" type="radar" [data]="data"/>',
  "data={labels:['Delivery','Quality','Reliability','Support','Documentation'],datasets:[{label:'This quarter',values:[86,92,88,76,84],fill:true},{label:'Last quarter',values:[72,78,82,68,70],dashed:true}]};",
  chartImport,
);
add(
  'chart',
  'Radial · Product adoption',
  'Use a polar area chart to compare adoption across product areas.',
  '<aevko-chart-canvas label="Product adoption" type="polarArea" [data]="data" valueFormat="percent"/>',
  "data={labels:['Projects','Reports','Automations','Integrations'],datasets:[{label:'Adoption',values:[86,68,54,72]}]};",
  chartImport,
);
add(
  'code-block',
  'Line numbers',
  'Render editable local code with a language label and line numbers.',
  '<aevko-code-block><aevko-code-block-content [code]="code" language="typescript" [lineNumbers]="true"/></aevko-code-block>',
  "code = 'interface Project {\\n  id: string;\\n  name: string;\\n}';",
);
add(
  'code-block',
  'Compact snippet',
  'Disable line numbers for a short configuration example.',
  '<aevko-code-block><aevko-code-block-content [code]="code" language="json" [lineNumbers]="false"/></aevko-code-block>',
  'code = \'{\\n  "theme": "neutral",\\n  "direction": "ltr"\\n}\';',
);
add(
  'message',
  'Author and metadata',
  'Group the author, timestamp, and message body.',
  '<aevko-message><strong aevkoMessageAuthor>Ada Lovelace</strong><time aevkoMessageMeta datetime="2026-11-03T10:30:00Z">10:30</time><p>The revised project brief is ready for your feedback.</p></aevko-message>',
);
add(
  'message',
  'Reply action',
  'A projected action can open a local reply composer.',
  '<aevko-message><strong aevkoMessageAuthor>Noah Williams</strong><p>Could you review the navigation changes?</p><button aevkoMessageAction type="button" (click)="replying=!replying">{{replying ? \'Cancel reply\' : \'Reply\'}}</button></aevko-message>@if (replying) { <label for="reply">Reply to Noah</label><textarea id="reply" class="native-input" placeholder="Write your reply..."></textarea> }',
  'replying=false;',
);
add(
  'message-scroller',
  'Scrollable conversation',
  'Constrain the region while keeping each message addressable.',
  '<aevko-message-scroller label="Project conversation" style="height:18rem">@for (message of messages; track message.id) { <aevko-message-scroller-item [messageId]="message.id"><div class="panel"><strong>{{message.author}}</strong><p>{{message.text}}</p></div></aevko-message-scroller-item> }</aevko-message-scroller>',
  "messages=Array.from({length:6},(_,index)=>({id:'message-'+index,author:index%2 ? 'Noah' : 'Ada',text:'Project update '+(index+1)+': the team is reviewing the latest changes.'}));",
);
add(
  'message-scroller',
  'Append a message',
  'New messages use stable identifiers rather than replacing the entire conversation.',
  `<aevko-message-scroller label="Live project conversation" style="height:14rem">@for (message of messages; track message.id) { <aevko-message-scroller-item [messageId]="message.id"><p class="list-row">{{message.text}}</p></aevko-message-scroller-item> }</aevko-message-scroller>${action('Add update', "messages=[...messages,{id:'message-'+messages.length,text:'New update '+(messages.length+1)}]")}`,
  "messages=[{id:'message-0',text:'The workspace is ready.'}];",
  button,
);
add(
  'questionnaire',
  'Single choice',
  'Use a short question with distinct choices and a controlled answer value.',
  '<aevko-questionnaire label="Project brief" [items]="items" [formControl]="answers"/><p role="status">Scope: {{answers.value[\'scope\'] || \'not selected\'}}</p>',
  "items=[{name:'scope',prompt:'What should this project deliver?',description:'Choose the primary outcome.',choices:[{value:'website',label:'A public website'},{value:'application',label:'An internal application'},{value:'system',label:'A design system'}]}];answers=new FormControl<Record<string,string|readonly string[]>>({}, {nonNullable:true});",
);
add(
  'questionnaire',
  'Multiple choice',
  'Allow several verification requirements to be selected.',
  '<aevko-questionnaire label="Review checklist" [items]="items" [formControl]="answers"/>',
  "items=[{name:'checks',prompt:'What should the review include?',multiple:true,choices:[{value:'keyboard',label:'Keyboard navigation'},{value:'responsive',label:'Responsive layouts'},{value:'contrast',label:'Color contrast'}]}];answers=new FormControl<Record<string,string|readonly string[]>>({}, {nonNullable:true});",
);
const toastImports = ["import { AevkoToastStore } from './ui/toast';", ...button];
add(
  'toast',
  'Notification tones',
  'Show a notification with a descriptive title and supporting detail.',
  `<div class="row">${action('Success', "store.show('Changes saved', {tone:'success',description:'Your workspace is up to date.'})")}${action('Error', "store.show('Upload failed', {tone:'error',description:'Check your connection and try again.'})")}</div><aevko-toaster label="Status example notifications"/>`,
  'store=inject(AevkoToastStore);',
  toastImports,
);
add(
  'toast',
  'Actionable notification',
  'An action can undo a change and provide a visible confirmation.',
  `${action('Archive project', "store.show('Project archived', {actionLabel:'Undo',action:undo})")}<aevko-toaster label="Undo example notifications"/>${state}`,
  "store=inject(AevkoToastStore);status='';undo=()=>{this.status='Project restored.';};",
  toastImports,
);
add(
  'trace',
  'Process states',
  'Show completed, active, and queued work in sequence.',
  '<aevko-trace label="Release progress"><aevko-trace-item state="complete"><strong aevkoTraceTitle>Build application</strong>Production assets generated.</aevko-trace-item><aevko-trace-item state="running"><strong aevkoTraceTitle>Run verification</strong>Checking the release candidate.</aevko-trace-item><aevko-trace-item state="pending"><strong aevkoTraceTitle>Publish preview</strong>Waiting for verification.</aevko-trace-item></aevko-trace>',
);
add(
  'trace',
  'Controlled completion',
  'Advance a process and observe the status change.',
  `<aevko-trace label="Review progress"><aevko-trace-item [state]="complete ? 'complete' : 'running'"><strong aevkoTraceTitle>Review changes</strong>{{complete ? 'Review completed.' : 'Review in progress.'}}</aevko-trace-item></aevko-trace>${action('Toggle completion', 'complete=!complete')}`,
  'complete=false;',
  button,
);
