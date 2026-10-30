import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideExternalLink,
  LucideFolderOpen,
  LucideMenu,
  LucidePackageOpen,
  LucidePlus,
  LucideSave,
} from '@lucide/angular';
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
  AevkoCodeBlockCopy,
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
import { AevkoAccordion } from '../../../../registry/components/accordion';
import { AevkoAspectRatio } from '../../../../registry/components/aspect-ratio';
import {
  AevkoCard,
  AevkoCardContent,
  AevkoCardDescription,
  AevkoCardFooter,
  AevkoCardHeader,
  AevkoCardTitle,
} from '../../../../registry/components/card';
import { AevkoCarousel, AevkoCarouselSlide } from '../../../../registry/components/carousel';
import { AevkoCollapsible } from '../../../../registry/components/collapsible';
import { AevkoDirection } from '../../../../registry/components/direction';
import { AevkoEmpty } from '../../../../registry/components/empty';
import {
  AevkoField,
  AevkoFieldDescription,
  AevkoFieldLabel,
} from '../../../../registry/components/field';
import { AevkoInput } from '../../../../registry/components/input';
import { AevkoItem } from '../../../../registry/components/item';
import { AevkoLabel } from '../../../../registry/components/label';
import { AevkoNativeSelect } from '../../../../registry/components/native-select';
import { AevkoResizable } from '../../../../registry/components/resizable';
import { AevkoScrollArea } from '../../../../registry/components/scroll-area';
import { AevkoSeparator } from '../../../../registry/components/separator';
import { AevkoSidebar } from '../../../../registry/components/sidebar';
import { AevkoTextarea } from '../../../../registry/components/textarea';
import {
  AevkoTable,
  AevkoTableBody,
  AevkoTableCaption,
  AevkoTableCell,
  AevkoTableContainer,
  AevkoTableFooter,
  AevkoTableHead,
  AevkoTableHeader,
  AevkoTableRow,
} from '../../../../registry/components/table';
import { CodeEditor } from './code-editor';

export const COMPONENTS = [
  'Accordion',
  'Aspect Ratio',
  'Card',
  'Carousel',
  'Collapsible',
  'Direction',
  'Empty',
  'Item',
  'Resizable',
  'Scroll Area',
  'Separator',
  'Sidebar',
  'Button',
  'Button Group',
  'Command',
  'Context Menu',
  'Dropdown Menu',
  'Menubar',
  'Navigation Menu',
  'Toggle',
  'Toggle Group',
  'Calendar',
  'Checkbox',
  'Combobox',
  'Date Picker',
  'Field',
  'Input',
  'Input Group',
  'Input OTP',
  'Label',
  'Native Select',
  'Questionnaire',
  'Radio Group',
  'Select',
  'Slider',
  'Switch',
  'Textarea',
  'Alert',
  'Alert Dialog',
  'Dialog',
  'Drawer',
  'Hover Card',
  'Popover',
  'Progress',
  'Sheet',
  'Skeleton',
  'Spinner',
  'Toast',
  'Tooltip',
  'Attachment',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Bubble',
  'Chart',
  'Code Block',
  'Data Table',
  'Marker',
  'Message',
  'Message Scroller',
  'Pagination',
  'Table',
  'Tabs',
  'Trace',
] as const;

const slugify = (name: string) => name.toLocaleLowerCase().replaceAll(' ', '-');
const ready = new Set([
  'accordion',
  'aspect-ratio',
  'card',
  'carousel',
  'collapsible',
  'direction',
  'empty',
  'item',
  'resizable',
  'scroll-area',
  'separator',
  'sidebar',
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
  'field',
  'input',
  'label',
  'native-select',
  'textarea',
  'table',
]);

@Component({
  standalone: true,
  imports: [
    RouterLink,
    AevkoButton,
    AevkoCard,
    AevkoCardHeader,
    AevkoCardTitle,
    AevkoCardDescription,
    AevkoCardContent,
    AevkoCardFooter,
    AevkoSeparator,
    CodeEditor,
  ],
  template: `
    <section class="hero page-wide">
      <div>
        <p class="eyebrow">Angular components. No black box.</p>
        <h1>Build interfaces.<br />Make them yours.</h1>
        <p class="lede">
          Accessible Angular components copied into your project. Start with considered defaults,
          then own every line.
        </p>
        <div class="button-row">
          <a class="button-link primary" routerLink="/getting-started">Get started</a
          ><a class="button-link" routerLink="/components">Explore components</a>
        </div>
        <aevko-code-editor
          value=""
          packageCommand="init --yes"
          language="shell"
          label="Aevko initialization command"
        />
      </div>
      <div class="hero-art" aria-label="Aevko geometric identity">
        <img src="/brand/logo-icon.svg" width="166" height="150" alt="" />
      </div>
    </section>
    <aevko-separator />
    <section class="page-wide section">
      <p class="eyebrow">The components are the design.</p>
      <h2>Good defaults. Open possibilities.</h2>
      <div class="preview-grid">
        <aevko-card>
          <aevko-card-header
            ><aevko-card-title>Create a project</aevko-card-title
            ><aevko-card-description
              >A source-owned interface foundation.</aevko-card-description
            ></aevko-card-header
          >
          <aevko-card-content
            ><label for="project">Project name</label><input id="project" value="Studio workspace"
          /></aevko-card-content>
          <aevko-card-footer
            ><button aevkoButton>Create project</button
            ><button aevkoButton variant="outline">Cancel</button></aevko-card-footer
          >
        </aevko-card>
        <div class="principles">
          <article>
            <strong>Own your code</strong><span>Review, edit and ship local source.</span>
          </article>
          <article>
            <strong>Accessible</strong
            ><span>Semantics and keyboard behavior are foundational.</span>
          </article>
          <article>
            <strong>Angular-first</strong><span>Standalone, typed and compositional.</span>
          </article>
        </div>
      </div>
    </section>
    <section class="palette-section section">
      <div class="page-wide palette-copy">
        <div>
          <p class="eyebrow">One foundation. Your expression.</p>
          <h2>Change the system, not every component.</h2>
          <p>A neutral scale, semantic tokens, light and dark, without gradients.</p>
        </div>
        <div class="swatches" aria-label="Aevko palette">
          <span class="black">Black</span><span class="graphite">Graphite</span
          ><span class="gray">Gray</span><span class="light-gray">Light gray</span
          ><span class="white">White</span>
        </div>
      </div>
    </section>
  `,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}

@Component({
  standalone: true,
  imports: [RouterLink, CodeEditor],
  template: `
    <article class="article page-narrow">
      <p class="eyebrow">Documentation / Installation</p>
      <h1>From Angular app to editable component.</h1>
      <p class="lede">Initialize once, add only what you need, and import from your own source.</p>
      <h2>Requirements</h2>
      <ul>
        <li>Angular 22; Angular 21 only after its consumer suite passes.</li>
        <li>Node 22.22.3+, 24.15.0+ or 26.</li>
        <li>Standalone Angular application.</li>
      </ul>
      <h2>1. Initialize</h2>
      <aevko-code-editor
        value=""
        packageCommand="init --yes"
        language="shell"
        label="Aevko initialization command"
      />
      <p>
        Initialization creates <code>aevko.json</code>, merges Tailwind CSS 4 and semantic tokens,
        and preserves existing styles.
      </p>
      <h2>2. Add a component</h2>
      <aevko-code-editor
        value=""
        packageCommand="add button --yes"
        language="shell"
        label="Button installation command"
      />
      <h2>3. Import local source</h2>
      <aevko-code-editor
        [value]="buttonImport"
        language="typescript"
        filename="app.component.ts"
        label="Button import example"
      />
      <a class="text-link" routerLink="/components/button">Continue to Button →</a>
    </article>
  `,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedPage {
  protected readonly buttonImport = `import { AevkoButton } from './ui/button';`;
}

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-wide section">
      <p class="eyebrow">Catalog / 64 components</p>
      <h1>Components</h1>
      <p class="lede">Only evidence-backed components are marked ready.</p>
      <label class="catalog-search"
        ><span>Filter components</span
        ><input
          type="search"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
          placeholder="Try button or dialog"
      /></label>
      <div class="catalog-grid">
        @for (name of filtered(); track name) {
          @if (isReady(name)) {
            <a [routerLink]="['/components', slug(name)]"
              ><strong>{{ name }}</strong
              ><span class="status ready">Phase 0</span></a
            >
          } @else {
            <div>
              <strong>{{ name }}</strong
              ><span class="status">Planned</span>
            </div>
          }
        }
      </div>
    </section>
  `,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsPage {
  protected readonly query = signal('');
  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return query
      ? COMPONENTS.filter((name) => name.toLocaleLowerCase().includes(query))
      : COMPONENTS;
  });
  protected slug = slugify;
  protected isReady(name: string): boolean {
    return ready.has(slugify(name));
  }
}

const componentDocs = {
  accordion: {
    title: 'Accordion',
    description: 'Single or multiple expandable sections with controlled state.',
    command: 'npx aevko-ui@latest add accordion --yes',
    api: 'items; type: single | multiple; value; collapsible; disabled; id; headingLevel',
    accessibility:
      'Each heading owns a native button with aria-expanded and aria-controls. Disabled sections stay understandable.',
    code: '<aevko-accordion [items]="sections" type="multiple" [(value)]="open" />',
  },
  'aspect-ratio': {
    title: 'Aspect Ratio',
    description: 'A responsive ratio container that prevents media distortion.',
    command: 'npx aevko-ui@latest add aspect-ratio --yes',
    api: 'ratio: number | number/number',
    accessibility:
      'The container adds no semantics; projected media must provide its own alternative text.',
    code: '<aevko-aspect-ratio ratio="16/9"><img alt="Project preview" /></aevko-aspect-ratio>',
  },
  carousel: {
    title: 'Carousel',
    description: 'Projected slides with buttons, arrow keys, swipe and optional looping.',
    command: 'npx aevko-ui@latest add carousel --yes',
    api: 'label; index; loop; orientation; AevkoCarouselSlide.label; aevkoCarouselPreviousIcon; aevkoCarouselNextIcon',
    accessibility:
      'The region and slides expose carousel semantics, status is announced and every control has an accessible name.',
    code: '<aevko-carousel label="Projects"><aevko-carousel-slide label="Slide 1 of 2">...</aevko-carousel-slide></aevko-carousel>',
  },
  collapsible: {
    title: 'Collapsible',
    description: 'A native disclosure with controlled or local open state.',
    command: 'npx aevko-ui@latest add collapsible --yes',
    api: 'label; open; disabled; panelId; aevkoCollapsibleIcon',
    accessibility: 'A native button reports aria-expanded and owns the disclosed region.',
    code: '<aevko-collapsible label="Details" [(open)]="open">...</aevko-collapsible>',
  },
  direction: {
    title: 'Direction',
    description: 'An LTR and RTL context directive for directional components.',
    command: 'npx aevko-ui@latest add direction --yes',
    api: 'aevkoDirection: ltr | rtl; AEVKO_DIRECTION token',
    accessibility:
      'The directive writes the native dir attribute so browser text and keyboard behavior inherit correctly.',
    code: '<section aevkoDirection="rtl">...</section>',
  },
  empty: {
    title: 'Empty',
    description: 'A compositional empty state with icon, title, description and action slots.',
    command: 'npx aevko-ui@latest add empty --yes',
    api: 'aevkoEmptyIcon; aevkoEmptyTitle; aevkoEmptyDescription; aevkoEmptyAction',
    accessibility:
      'The decorative icon is hidden; use semantic projected heading and action elements.',
    code: '<aevko-empty><h2 aevkoEmptyTitle>No projects</h2><button aevkoEmptyAction>Create</button></aevko-empty>',
  },
  item: {
    title: 'Item',
    description: 'A compositional row with icon, copy, description and action.',
    command: 'npx aevko-ui@latest add item --yes',
    api: 'variant: default | outline | muted; disabled; named slots',
    accessibility:
      'Use a native link or button in the action slot and do not rely on the disabled appearance alone.',
    code: '<aevko-item variant="outline"><strong aevkoItemTitle>Project</strong></aevko-item>',
  },
  resizable: {
    title: 'Resizable',
    description: 'Two panels resized by pointer or keyboard with optional persistence.',
    command: 'npx aevko-ui@latest add resizable --yes',
    api: 'orientation; size; min; max; step; storageKey',
    accessibility:
      'The handle uses separator range semantics. Arrow keys resize; Home and End move to bounds.',
    code: '<aevko-resizable><aside aevkoResizableFirst>...</aside><main aevkoResizableSecond>...</main></aevko-resizable>',
  },
  'scroll-area': {
    title: 'Scroll Area',
    description: 'A focusable native scroll region with optional scrollbar styling.',
    command: 'npx aevko-ui@latest add scroll-area --yes',
    api: 'tabIndex; scrollbar: auto | thin | hidden',
    accessibility:
      'Native scrolling preserves touch, wheel and keyboard behavior. Add an accessible label when context is unclear.',
    code: '<aevko-scroll-area class="max-h-80">...</aevko-scroll-area>',
  },
  sidebar: {
    title: 'Sidebar',
    description: 'A collapsible desktop navigation and responsive mobile drawer.',
    command: 'npx aevko-ui@latest add sidebar --yes',
    api: 'label; open; collapsed; closeOnNavigate; header/footer and menu/collapse icon slots',
    accessibility:
      'The mobile trigger exposes expanded state, Escape closes the drawer and navigation keeps a visible label.',
    code: '<aevko-sidebar label="Workspace"><a routerLink="/home">Home</a></aevko-sidebar>',
  },
  button: {
    title: 'Button',
    description: 'An intentional native action with clear hierarchy and a stable loading state.',
    command: 'npx aevko-ui@latest add button --yes',
    api: 'variant: primary | outline | ghost | accent | danger; size: sm | md | lg; loading; disabled; type; aevkoButtonIconStart; aevkoButtonIconEnd',
    accessibility:
      'Tab focuses the native button. Enter and Space activate it. Loading disables activation, sets aria-busy and keeps the visible label.',
    code: '<button aevkoButton variant="accent" [loading]="saving()">Save changes</button>',
  },
  'button-group': {
    title: 'Button Group',
    description: 'Related native actions grouped with explicit orientation and an accessible name.',
    command: 'npx aevko-ui@latest add button-group --yes',
    api: 'label; orientation',
    accessibility:
      'The host exposes a named group while every projected button keeps native keyboard behavior.',
    code: '<aevko-button-group label="Text alignment"><button aevkoButton>Left</button><button aevkoButton>Center</button></aevko-button-group>',
  },
  toggle: {
    title: 'Toggle',
    description: 'A native pressed-state button with controlled state, variants and sizes.',
    command: 'npx aevko-ui@latest add toggle --yes',
    api: 'pressed; disabled; variant; size',
    accessibility:
      'The native button publishes aria-pressed and remains operable with Enter and Space.',
    code: '<button aevkoToggle [(pressed)]="bold" aria-label="Bold">Bold</button>',
  },
  badge: {
    title: 'Badge',
    description:
      'Compact status or metadata content with neutral variants and an optional icon slot.',
    command: 'npx aevko-ui@latest add badge --yes',
    api: 'variant; aevkoBadgeIcon',
    accessibility:
      'The badge adds no live semantics; its text remains available to assistive technology.',
    code: '<aevko-badge variant="muted">In review</aevko-badge>',
  },
  alert: {
    title: 'Alert',
    description:
      'A compositional status message with explicit polite or assertive announcement behavior.',
    command: 'npx aevko-ui@latest add alert --yes',
    api: 'variant; live; title, description and icon slots',
    accessibility: 'Polite messages use role status; assertive messages use role alert.',
    code: '<aevko-alert><strong aevkoAlertTitle>Saved</strong><span aevkoAlertDescription>Your changes are available.</span></aevko-alert>',
  },
  progress: {
    title: 'Progress',
    description: 'Determinate and indeterminate progress with clamped native range semantics.',
    command: 'npx aevko-ui@latest add progress --yes',
    api: 'label; value; max',
    accessibility:
      'The host exposes progressbar semantics and omits aria-valuenow while indeterminate.',
    code: '<aevko-progress label="Upload progress" [value]="64" />',
  },
  spinner: {
    title: 'Spinner',
    description: 'A compact loading status with configurable size and reduced-motion behavior.',
    command: 'npx aevko-ui@latest add spinner --yes',
    api: 'label; size',
    accessibility: 'The status has an accessible label while its animated ring stays decorative.',
    code: '<aevko-spinner label="Saving changes" size="1.25rem" />',
  },
  skeleton: {
    title: 'Skeleton',
    description: 'A flexible decorative placeholder that becomes static under reduced motion.',
    command: 'npx aevko-ui@latest add skeleton --yes',
    api: 'Host dimensions through CSS classes or styles',
    accessibility:
      'The placeholder is hidden from assistive technology; announce loading on the containing region.',
    code: '<aevko-skeleton class="block h-20 w-full" />',
  },
  avatar: {
    title: 'Avatar',
    description: 'An image avatar with accessible initials fallback and configurable size.',
    command: 'npx aevko-ui@latest add avatar --yes',
    api: 'src; alt; fallback; size',
    accessibility:
      'The image uses consumer-provided alternative text. The fallback exposes the same accessible name.',
    code: '<aevko-avatar src="/people/ada.jpg" alt="Ada Lovelace" fallback="AL" size="3rem" />',
  },
  attachment: {
    title: 'Attachment',
    description:
      'A file representation with metadata and projected actions, without implicit upload behavior.',
    command: 'npx aevko-ui@latest add attachment --yes',
    api: 'name; metadata; icon and action slots',
    accessibility:
      'File name and metadata remain text; projected actions must use native links or buttons.',
    code: '<aevko-attachment name="brief.pdf" metadata="PDF · 2.4 MB"><button aevkoAttachmentAction>Download</button></aevko-attachment>',
  },
  marker: {
    title: 'Marker',
    description: 'A generic labeled indicator for status, sequence or lightweight metadata.',
    command: 'npx aevko-ui@latest add marker --yes',
    api: 'variant; projected label',
    accessibility:
      'The visual dot is decorative and the projected text communicates the marker meaning.',
    code: '<aevko-marker variant="muted">Queued</aevko-marker>',
  },
  pagination: {
    title: 'Pagination',
    description: 'Controlled page navigation with current-page and previous/next semantics.',
    command: 'npx aevko-ui@latest add pagination --yes',
    api: 'page; totalPages; label',
    accessibility: 'The host is a named navigation landmark and the active page uses aria-current.',
    code: '<aevko-pagination label="Results pages" [(page)]="page" [totalPages]="5" />',
  },
  breadcrumb: {
    title: 'Breadcrumb',
    description: 'A compositional path with native list and current-page semantics.',
    command: 'npx aevko-ui@latest add breadcrumb --yes',
    api: 'label; item current; separator; projected custom separator',
    accessibility:
      'The root is a named navigation landmark, items form a list and the current item exposes aria-current page.',
    code: `<aevko-breadcrumb label="Project path">
  <aevko-breadcrumb-item><a href="/projects">Projects</a></aevko-breadcrumb-item>
  <aevko-breadcrumb-item [current]="true">Aevko UI</aevko-breadcrumb-item>
</aevko-breadcrumb>`,
  },
  bubble: {
    title: 'Bubble',
    description: 'A compact conversational surface with alignment, tone and reaction composition.',
    command: 'npx aevko-ui@latest add bubble --yes',
    api: 'align; variant; aevkoBubbleReactions',
    accessibility:
      'The surface adds no conversational role; projected text, reactions and controls preserve their native semantics.',
    code: `<aevko-bubble align="end">The registry build passed.<button aevkoBubbleReactions type="button" aria-label="React with thumbs up">👍 2</button></aevko-bubble>`,
  },
  message: {
    title: 'Message',
    description: 'A structured message row for authorship, metadata, content, visuals and actions.',
    command: 'npx aevko-ui@latest add message --yes',
    api: 'align; variant; visual, author, meta and action slots',
    accessibility:
      'The component stays presentational so the containing application can choose article, log or live-region semantics.',
    code: `<aevko-message>
  <strong aevkoMessageAuthor>Ada</strong><time aevkoMessageMeta>10:42</time>
  <aevko-bubble>The registry build passed.</aevko-bubble>
</aevko-message>`,
  },
  trace: {
    title: 'Trace',
    description:
      'An ordered execution timeline with explicit complete, running, error and pending states.',
    command: 'npx aevko-ui@latest add trace --yes',
    api: 'label; item state; title and time slots',
    accessibility:
      'The ordered list communicates sequence while status meaning remains available as projected text, not color alone.',
    code: `<aevko-trace label="Deployment trace">
  <aevko-trace-item state="complete"><strong aevkoTraceTitle>Build</strong>Completed</aevko-trace-item>
  <aevko-trace-item state="running"><strong aevkoTraceTitle>Deploy</strong>Running</aevko-trace-item>
</aevko-trace>`,
  },
  checkbox: {
    title: 'Checkbox',
    description: 'A styled native checkbox with Angular Forms and indeterminate-state support.',
    command: 'npx aevko-ui@latest add checkbox --yes',
    api: 'invalid; native checked, disabled and indeterminate state',
    accessibility:
      'The real checkbox retains browser keyboard, form submission and accessible checked-state behavior.',
    code: '<label><input aevkoCheckbox type="checkbox" [(ngModel)]="accepted" /> Accept terms and conditions</label>',
  },
  switch: {
    title: 'Switch',
    description: 'A native binary control for settings that take effect immediately.',
    command: 'npx aevko-ui@latest add switch --yes',
    api: 'size; invalid; native checked and disabled state',
    accessibility:
      'A native checkbox with role switch exposes checked state while preserving forms and keyboard behavior.',
    code: '<label><input aevkoSwitch type="checkbox" [(ngModel)]="notifications" /> Enable notifications</label>',
  },
  'radio-group': {
    title: 'Radio Group',
    description: 'Native exclusive choices grouped by a fieldset and visible legend.',
    command: 'npx aevko-ui@latest add radio-group --yes',
    api: 'orientation; invalid; native name, value, checked and disabled state',
    accessibility:
      'Fieldset and legend name the set; native radios provide exclusive selection and arrow-key behavior.',
    code: `<fieldset aevkoRadioGroup><legend>Density</legend>
  <label><input aevkoRadioGroupItem type="radio" name="density" value="default" /> Default</label>
  <label><input aevkoRadioGroupItem type="radio" name="density" value="compact" /> Compact</label>
</fieldset>`,
  },
  'toggle-group': {
    title: 'Toggle Group',
    description:
      'Single or multiple pressed-state buttons with logical orientation and focus movement.',
    command: 'npx aevko-ui@latest add toggle-group --yes',
    api: 'label; type; orientation; value; item value',
    accessibility:
      'A named group contains native buttons with aria-pressed; arrows, Home and End move focus.',
    code: `<aevko-toggle-group label="Text alignment" type="single" [(value)]="alignment">
  <button aevkoToggleGroupItem value="left">Left</button>
  <button aevkoToggleGroupItem value="center">Center</button>
</aevko-toggle-group>`,
  },
  'input-group': {
    title: 'Input Group',
    description:
      'Native inputs and textareas composed with text, icons and actions in one focus surface.',
    command: 'npx aevko-ui@latest add input-group --yes',
    api: 'control; addon align; button; native input and textarea attributes',
    accessibility:
      'The projected control remains native and first in DOM focus order even when an addon is positioned visually before it.',
    code: `<label for="website">Website</label>
<aevko-input-group>
  <input aevkoInputGroupControl id="website" placeholder="example.com" />
  <aevko-input-group-addon>https://</aevko-input-group-addon>
  <button aevkoInputGroupButton type="button">Copy</button>
</aevko-input-group>`,
  },
  'input-otp': {
    title: 'Input OTP',
    description: 'A single accessible one-time-code input presented as readable character slots.',
    command: 'npx aevko-ui@latest add input-otp --yes',
    api: 'label; maxLength; characters; value; disabled; invalid; ControlValueAccessor',
    accessibility:
      'One native input owns the accessible name, paste, backspace and autofill behavior; visual slots stay decorative.',
    code: '<aevko-input-otp label="Verification code" [maxLength]="6" [(value)]="code" />',
  },
  slider: {
    title: 'Slider',
    description: 'A styled native range input for a single numeric value.',
    command: 'npx aevko-ui@latest add slider --yes',
    api: 'orientation; invalid; native min, max, step, value and disabled attributes',
    accessibility:
      'Native range semantics provide keyboard, touch, value and Angular Forms behavior without a custom slider engine.',
    code: '<label for="volume">Volume</label><input aevkoSlider id="volume" type="range" min="0" max="100" value="64" />',
  },
  'message-scroller': {
    title: 'Message Scroller',
    description:
      'A transcript viewport that follows only by choice and preserves position when history is prepended.',
    command: 'npx aevko-ui@latest add message-scroller --yes',
    api: 'label; autoScroll; preserveScrollOnPrepend; item messageId and scrollAnchor; scrollToMessage',
    accessibility:
      'The viewport is a labelled keyboard-focusable region and the transcript is a polite additions-only log.',
    code: `<aevko-message-scroller label="Project conversation">
  <aevko-message-scroller-item messageId="m1">First message</aevko-message-scroller-item>
  <aevko-message-scroller-item messageId="m2" [scrollAnchor]="true">Latest turn</aevko-message-scroller-item>
</aevko-message-scroller>`,
  },
  tabs: {
    title: 'Tabs',
    description: 'Layered panels with controlled selection, orientation and keyboard activation.',
    command: 'npx aevko-ui@latest add tabs --yes',
    api: 'label; id; value; orientation; activation; list, trigger and content primitives',
    accessibility:
      'Triggers and panels are linked by ids; arrows, Home and End move focus while automatic or manual activation stays explicit.',
    code: `<aevko-tabs label="Project views" [(value)]="view">
  <aevko-tabs-list><button aevkoTabsTrigger value="overview">Overview</button><button aevkoTabsTrigger value="activity">Activity</button></aevko-tabs-list>
  <aevko-tabs-content value="overview">Project summary</aevko-tabs-content>
  <aevko-tabs-content value="activity">Recent activity</aevko-tabs-content>
</aevko-tabs>`,
  },
  'code-block': {
    title: 'Code Block',
    description:
      'Focusable LTR source, terminal output and diffs with optional numbering and copy actions.',
    command: 'npx aevko-ui@latest add code-block --yes',
    api: 'variant; size; code; language; lineNumbers; startLine; wrap; line variants; copy value',
    accessibility:
      'The code viewport is keyboard-focusable, always reads LTR and excludes visual line numbers from selection.',
    code: `<aevko-code-block><aevko-code-block-header>app.component.ts<button aevkoCodeBlockCopy [value]="source"></button></aevko-code-block-header><aevko-code-block-content [code]="source" language="typescript" [lineNumbers]="true" /></aevko-code-block>`,
  },
  chart: {
    title: 'Chart',
    description:
      'An accessible, engine-agnostic chart frame with legend and semantic data composition.',
    command: 'npx aevko-ui@latest add chart --yes',
    api: 'label; description; series; aevkoChartVisual; aevkoChartData',
    accessibility:
      'The visual is decorative while projected native table or text data remains available to assistive technology.',
    code: `<aevko-chart label="Monthly revenue" description="January through April" [series]="series">
  <svg aevkoChartVisual aria-hidden="true">...</svg>
  <table aevkoChartData>...</table>
</aevko-chart>`,
  },
  'data-table': {
    title: 'Data Table',
    description:
      'Typed tabular data with controlled filtering, sorting, selection, pagination and loading states.',
    command: 'npx aevko-ui@latest add data-table --yes',
    api: 'caption; rows; columns; rowKey; filter; sort; selectable; selectedKeys; page; pageSize; loading; manual',
    accessibility:
      'A native table retains caption/header/cell relationships; sort state, row selection and loading remain explicitly labelled.',
    code: '<aevko-data-table caption="Invoices" [rows]="invoices" [columns]="columns" [rowKey]="invoiceKey" [selectable]="true" />',
  },
  dialog: {
    title: 'Dialog',
    description: 'A focused modal surface for a contained task with deliberate dismissal.',
    command: 'npx aevko-ui@latest add dialog --yes',
    api: 'title; description; open; initialFocus; closeOnEscape; closeOnBackdrop; restoreFocus; trigger and close slots',
    accessibility:
      'The native modal makes background content inert, traps focus and restores it to the opener after dismissal. Escape and backdrop behavior remain explicit inputs.',
    code: `<aevko-dialog title="Edit workspace" description="Give your team a recognizable name." initialFocus="#workspace-name">
  <button aevkoDialogTrigger>Edit workspace</button>
  <label for="workspace-name">Workspace name</label><input id="workspace-name" />
  <button aevkoDialogClose>Cancel</button><button>Save changes</button>
</aevko-dialog>`,
  },
  'alert-dialog': {
    title: 'Alert Dialog',
    description: 'An interruptive modal for an important choice that requires a response.',
    command: 'npx aevko-ui@latest add alert-dialog --yes',
    api: 'title; description; open; initialFocus; closeOnEscape; restoreFocus; trigger and close slots',
    accessibility:
      'The panel exposes alertdialog semantics, blocks backdrop dismissal and keeps focus inside until a projected action closes it.',
    code: `<aevko-alert-dialog title="Delete workspace?" description="This permanently removes the workspace." initialFocus="#keep-workspace">
  <button aevkoAlertDialogTrigger>Delete workspace</button>
  <button id="keep-workspace" aevkoAlertDialogClose>Keep workspace</button>
  <button aevkoAlertDialogClose>Delete workspace</button>
</aevko-alert-dialog>`,
  },
  drawer: {
    title: 'Drawer',
    description: 'A mobile-friendly modal surface anchored to a viewport edge.',
    command: 'npx aevko-ui@latest add drawer --yes',
    api: 'title; description; open; side; initialFocus; dismissal and focus inputs; trigger and close slots',
    accessibility:
      'The drawer uses native modal focus containment and restoration while projected controls keep their original semantics.',
    code: `<aevko-drawer title="Project filters" description="Narrow the visible projects.">
  <button aevkoDrawerTrigger>Open filters</button>
  <label><input type="checkbox" /> Active projects</label>
  <button aevkoDrawerClose>Apply filters</button>
</aevko-drawer>`,
  },
  sheet: {
    title: 'Sheet',
    description: 'A dialog surface attached to an edge for complementary content and tasks.',
    command: 'npx aevko-ui@latest add sheet --yes',
    api: 'title; description; open; side; initialFocus; dismissal and focus inputs; trigger and close slots',
    accessibility:
      'The sheet retains native dialog modality, Escape handling and focus restoration regardless of its visual edge.',
    code: `<aevko-sheet title="Workspace settings" description="Update details for this workspace." side="right">
  <button aevkoSheetTrigger>Open settings</button>
  <label for="sheet-name">Name</label><input id="sheet-name" />
  <button aevkoSheetClose>Save changes</button>
</aevko-sheet>`,
  },
  popover: {
    title: 'Popover',
    description: 'A controlled non-modal surface for rich content and compact tasks.',
    command: 'npx aevko-ui@latest add popover --yes',
    api: 'label; id; open; side; align; closeOnEscape; trigger and close slots',
    accessibility:
      'The trigger exposes popup, expanded and control relationships. Escape dismisses the surface without trapping focus.',
    code: `<aevko-popover label="Workspace options"><button aevkoPopoverTrigger>Open options</button><p>Choose a workspace preference.</p><button aevkoPopoverClose>Done</button></aevko-popover>`,
  },
  'hover-card': {
    title: 'Hover Card',
    description: 'A delayed preview for information already available through a link.',
    command: 'npx aevko-ui@latest add hover-card --yes',
    api: 'id; open; side; align; delay; closeDelay; trigger slot',
    accessibility:
      'The preview opens on pointer hover or keyboard focus and its description relationship is applied to the trigger.',
    code: `<aevko-hover-card><a aevkoHoverCardTrigger href="/people/ada">Ada Lovelace</a><strong>Ada Lovelace</strong><p>Maintainer of the analytical workspace.</p></aevko-hover-card>`,
  },
  tooltip: {
    title: 'Tooltip',
    description: 'Supplementary text shown for an element on hover and keyboard focus.',
    command: 'npx aevko-ui@latest add tooltip --yes',
    api: 'id; open; side; delay; trigger slot',
    accessibility:
      'The projected trigger references a role tooltip description that appears for both focus and pointer hover.',
    code: `<aevko-tooltip><button aevkoTooltipTrigger aria-label="Save workspace">Save</button><span>Save workspace</span></aevko-tooltip>`,
  },
  toast: {
    title: 'Toast',
    description:
      'Transient application feedback with actions, dismissal and polite or assertive announcements.',
    command: 'npx aevko-ui@latest add toast --yes',
    api: 'AevkoToastStore.show; dismiss; clear; runAction; AevkoToaster',
    accessibility:
      'Ordinary notifications use status while error notifications use alert; each item includes a labelled dismissal control.',
    code: `toast.show('Workspace saved', { description: 'Your changes are now available.', tone: 'success' });
<aevko-toaster />`,
  },
  command: {
    title: 'Command',
    description: 'A searchable keyboard command list for fast application actions.',
    command: 'npx aevko-ui@latest add command --yes',
    api: 'label; placeholder; items; query; value; activated',
    accessibility:
      'A labelled search input controls a listbox; arrows move the active choice and Enter activates it.',
    code: `<aevko-command label="Project commands" [items]="commands" [(value)]="command" (activated)="run($event)" />`,
  },
  'dropdown-menu': {
    title: 'Dropdown Menu',
    description: 'A button-triggered menu of application actions with roving focus.',
    command: 'npx aevko-ui@latest add dropdown-menu --yes',
    api: 'label; id; open; align; trigger and item primitives',
    accessibility:
      'The trigger exposes menu state; Arrow keys, Home, End and Escape operate native menu items.',
    code: `<aevko-dropdown-menu label="Account actions"><button aevkoDropdownMenuTrigger>Open</button><button aevkoDropdownMenuItem>Profile</button><button aevkoDropdownMenuItem>Billing</button></aevko-dropdown-menu>`,
  },
  'context-menu': {
    title: 'Context Menu',
    description: 'A right-click action menu positioned at the pointer.',
    command: 'npx aevko-ui@latest add context-menu --yes',
    api: 'label; open; trigger and item primitives',
    accessibility:
      'Right click opens a labelled menu; Arrow keys, Home, End and Escape move or dismiss focus.',
    code: `<aevko-context-menu label="Canvas actions"><div aevkoContextMenuTrigger>Right click this area</div><button aevkoContextMenuItem>Duplicate</button><button aevkoContextMenuItem>Delete</button></aevko-context-menu>`,
  },
  menubar: {
    title: 'Menubar',
    description: 'A persistent desktop command strip with horizontal roving focus.',
    command: 'npx aevko-ui@latest add menubar --yes',
    api: 'label; AevkoMenubarItem.disabled',
    accessibility:
      'The named menubar contains native buttons with menuitem semantics; Left, Right, Home and End move focus.',
    code: `<aevko-menubar label="Application menu"><button aevkoMenubarItem>File</button><button aevkoMenubarItem>Edit</button><button aevkoMenubarItem>View</button></aevko-menubar>`,
  },
  'navigation-menu': {
    title: 'Navigation Menu',
    description: 'A named responsive navigation surface for links and projected controls.',
    command: 'npx aevko-ui@latest add navigation-menu --yes',
    api: 'label; projected native links and buttons',
    accessibility:
      'The host is a named navigation landmark and projected links retain browser semantics.',
    code: `<aevko-navigation-menu label="Primary"><a href="/docs">Docs</a><a href="/components">Components</a></aevko-navigation-menu>`,
  },
  calendar: {
    title: 'Calendar',
    description: 'A dependency-free month grid with controlled ISO date and month state.',
    command: 'npx aevko-ui@latest add calendar --yes',
    api: 'label; month; value; min; max; --cell-size',
    accessibility:
      'The labelled grid exposes rows, column headers and selectable date cells; Arrow keys move by day or week.',
    code: `<aevko-calendar label="Choose deployment date" month="2026-10" [(value)]="date" />`,
  },
  combobox: {
    title: 'Combobox',
    description: 'An autocomplete input that filters and selects application-owned options.',
    command: 'npx aevko-ui@latest add combobox --yes',
    api: 'label; placeholder; emptyMessage; items; value; query',
    accessibility:
      'The input exposes combobox, autocomplete, expanded and listbox relationships; arrows and Enter operate suggestions.',
    code: `<aevko-combobox label="Framework" [items]="frameworks" [(value)]="framework" />`,
  },
  'date-picker': {
    title: 'Date Picker',
    description: 'A composed Popover and Calendar for selecting one ISO date.',
    command: 'npx aevko-ui@latest add date-picker --yes',
    api: 'label; placeholder; value; month; open; min; max',
    accessibility:
      'A labelled popup trigger opens the full keyboard-operable calendar and returns the selected date as ISO text.',
    code: `<aevko-date-picker label="Deployment date" month="2026-10" [(value)]="date" />`,
  },
  questionnaire: {
    title: 'Questionnaire',
    description: 'A multi-step flow for single, multiple, freeform and skippable questions.',
    command: 'npx aevko-ui@latest add questionnaire --yes',
    api: 'label; items; active; answers; submitted',
    accessibility:
      'Each question uses a fieldset and legend with native radio or checkbox choices; validation errors announce assertively.',
    code: `<aevko-questionnaire label="Project brief" [items]="questions" [(answers)]="answers" (submitted)="save($event)" />`,
  },
  select: {
    title: 'Select',
    description: 'A controlled button-triggered listbox for choosing one application option.',
    command: 'npx aevko-ui@latest add select --yes',
    api: 'label; placeholder; items; value; disabled',
    accessibility:
      'The trigger exposes expanded and listbox relationships; Arrow keys and Enter choose enabled options.',
    code: `<aevko-select label="Theme" [items]="themes" [(value)]="theme" />`,
  },
  field: {
    title: 'Field',
    description:
      'A compositional field that keeps native label, description and error wiring explicit.',
    command: 'npx aevko-ui@latest add field --yes',
    api: 'invalid; aevkoFieldLabel; aevkoFieldDescription; aevkoFieldError',
    accessibility:
      'Keep label for and control id paired. Reference description and error ids from aria-describedby.',
    code: '<aevko-field><label aevkoFieldLabel for="email">Email</label><input id="email" aria-describedby="email-help" /></aevko-field>',
  },
  input: {
    title: 'Input',
    description:
      'A styled native input with browser behavior and Angular Forms compatibility intact.',
    command: 'npx aevko-ui@latest add input --yes',
    api: 'invalid; all native input attributes and events',
    accessibility:
      'Always provide an associated label. Invalid state writes aria-invalid without replacing native constraints.',
    code: '<label for="name">Name</label><input aevkoInput id="name" autocomplete="name" />',
  },
  label: {
    title: 'Label',
    description: 'A visual treatment for the native label element.',
    command: 'npx aevko-ui@latest add label --yes',
    api: 'Native label attributes, including for',
    accessibility: 'Uses a real label so clicking it focuses its associated form control.',
    code: '<label aevkoLabel for="project">Project name</label>',
  },
  'native-select': {
    title: 'Native Select',
    description: 'A styled platform select with native keyboard, touch and form behavior.',
    command: 'npx aevko-ui@latest add native-select --yes',
    api: 'invalid; all native select attributes and events',
    accessibility:
      'Associate a label and keep the placeholder option meaningful when selection is required.',
    code: '<select aevkoNativeSelect id="role"><option>Designer</option></select>',
  },
  textarea: {
    title: 'Textarea',
    description: 'A native multiline control with optional content-driven resizing.',
    command: 'npx aevko-ui@latest add textarea --yes',
    api: 'invalid; autoResize; all native textarea attributes and events',
    accessibility:
      'Associate a label and describe format or limits with aria-describedby when needed.',
    code: '<textarea aevkoTextarea id="notes" [autoResize]="true"></textarea>',
  },
  card: {
    title: 'Card',
    description:
      'A compositional surface with header, title, description, content, actions and footer.',
    command: 'npx aevko-ui@latest add card --yes',
    api: 'AevkoCard, Header, Title, Description, Content, Actions and Footer',
    accessibility:
      'Card adds no landmark role. Choose a semantic wrapper in content when it represents an article, region or form.',
    code: '<aevko-card class="border-dashed rounded-none bg-transparent">...</aevko-card>',
  },
  separator: {
    title: 'Separator',
    description: 'A horizontal or vertical divider with decorative and semantic modes.',
    command: 'npx aevko-ui@latest add separator --yes',
    api: "orientation: 'horizontal' | 'vertical'; decorative: boolean",
    accessibility:
      'Decorative separators use role none. Set decorative false only when the divider communicates structure.',
    code: '<aevko-separator orientation="horizontal" [decorative]="false" />',
  },
  table: {
    title: 'Table',
    description: 'Semantic native table primitives for readable, responsive data.',
    command: 'npx aevko-ui@latest add table --yes',
    api: 'container, table, header, body, footer, row, head, cell and caption primitives',
    accessibility:
      'Native table elements preserve row and column relationships. The overflow container is keyboard focusable and carries an accessible label.',
    code: `<div aevkoTableContainer label="Recent invoices">
  <table aevkoTable>
    <caption aevkoTableCaption>Recent invoices</caption>
    <thead aevkoTableHeader>
      <tr aevkoTableRow><th aevkoTableHead scope="col">Invoice</th><th aevkoTableHead scope="col">Amount</th></tr>
    </thead>
    <tbody aevkoTableBody>
      <tr aevkoTableRow><td aevkoTableCell>INV001</td><td aevkoTableCell>$250.00</td></tr>
    </tbody>
  </table>
</div>`,
  },
} as const;

interface ApiRow {
  readonly name: string;
  readonly type: string;
  readonly defaultValue: string;
  readonly description: string;
}

const row = (name: string, type: string, defaultValue: string, description: string): ApiRow => ({
  name,
  type,
  defaultValue,
  description,
});

const componentApi: Record<keyof typeof componentDocs, readonly ApiRow[]> = {
  accordion: [
    row(
      'items',
      'readonly AevkoAccordionItem[]',
      'required',
      'Sections identified by a stable id, label and content.',
    ),
    row(
      'type',
      "'single' | 'multiple'",
      "'single'",
      'Controls whether one or several sections may stay open.',
    ),
    row(
      'value',
      'model<readonly string[]>',
      '[]',
      'Ids of the expanded sections; supports two-way binding.',
    ),
    row('collapsible', 'boolean', 'true', 'Allows the last expanded section to close.'),
    row('disabled', 'boolean', 'false', 'Disables every accordion trigger.'),
    row('id', 'string', "'aevko-accordion'", 'Prefix used to associate triggers and panels.'),
    row(
      'headingLevel',
      '2 | 3 | 4 | 5 | 6',
      '2',
      'Semantic heading level rendered for each trigger.',
    ),
  ],
  'aspect-ratio': [
    row(
      'ratio',
      'number | `${number}/${number}`',
      '16 / 9',
      'Width-to-height ratio maintained by projected content.',
    ),
  ],
  carousel: [
    row('label', 'string', 'required', 'Accessible name for the carousel region.'),
    row('index', 'model<number>', '0', 'Zero-based active slide index; supports two-way binding.'),
    row('loop', 'boolean', 'false', 'Moves from the last slide to the first and vice versa.'),
    row(
      'orientation',
      "'horizontal' | 'vertical'",
      "'horizontal'",
      'Axis used by navigation and swipe gestures.',
    ),
    row(
      'AevkoCarouselSlide.label',
      'string',
      'optional',
      'Accessible name announced for an individual slide.',
    ),
    row(
      'aevkoCarouselPreviousIcon',
      'projected slot',
      'inline SVG',
      'Replaces the previous-control fallback icon.',
    ),
    row(
      'aevkoCarouselNextIcon',
      'projected slot',
      'inline SVG',
      'Replaces the next-control fallback icon.',
    ),
  ],
  collapsible: [
    row(
      'label',
      'string',
      'required',
      'Visible label and accessible name for the disclosure trigger.',
    ),
    row('open', 'model<boolean>', 'false', 'Controlled or local expanded state.'),
    row('disabled', 'boolean', 'false', 'Prevents the trigger from changing state.'),
    row('panelId', 'string', "'aevko-collapsible-panel'", 'Id referenced by aria-controls.'),
    row(
      'aevkoCollapsibleIcon',
      'projected slot',
      'inline SVG',
      'Replaces the disclosure fallback icon.',
    ),
  ],
  direction: [
    row('aevkoDirection', "'ltr' | 'rtl'", "'ltr'", 'Writes the native dir attribute on the host.'),
    row(
      'AEVKO_DIRECTION',
      'InjectionToken<Signal>',
      "'ltr'",
      'Exposes the inherited direction to descendants.',
    ),
  ],
  empty: [
    row('aevkoEmptyIcon', 'projected slot', 'empty', 'Decorative icon or custom visual.'),
    row('aevkoEmptyTitle', 'projected slot', 'empty', 'Primary empty-state heading.'),
    row('aevkoEmptyDescription', 'projected slot', 'empty', 'Supporting explanation.'),
    row('aevkoEmptyAction', 'projected slot', 'empty', 'Native link, button or custom action.'),
  ],
  item: [
    row('variant', "'default' | 'outline' | 'muted'", "'default'", 'Visual hierarchy of the row.'),
    row('disabled', 'boolean', 'false', 'Applies disabled state styling and semantics.'),
    row('aevkoItemIcon', 'projected slot', 'empty', 'Leading icon or visual.'),
    row('aevkoItemTitle / Description', 'projected slots', 'empty', 'Primary and supporting copy.'),
    row('aevkoItemAction', 'projected slot', 'empty', 'Trailing link, button or custom action.'),
  ],
  resizable: [
    row(
      'orientation',
      "'horizontal' | 'vertical'",
      "'horizontal'",
      'Direction in which the separator moves.',
    ),
    row('size', 'model<number>', '50', 'First panel size as a percentage.'),
    row('min', 'number', '15', 'Minimum first-panel percentage.'),
    row('max', 'number', '85', 'Maximum first-panel percentage.'),
    row('step', 'number', '5', 'Percentage changed by an arrow-key press.'),
    row('storageKey', 'string | null', 'null', 'Optional localStorage key used to restore size.'),
  ],
  'scroll-area': [
    row('tabIndex', 'number', '0', 'Tab order of the native scroll region.'),
    row(
      'scrollbar',
      "'auto' | 'thin' | 'hidden'",
      "'auto'",
      'Visual scrollbar treatment without replacing native scrolling.',
    ),
  ],
  sidebar: [
    row('label', 'string', "'Primary navigation'", 'Accessible name for the navigation and panel.'),
    row('open', 'model<boolean>', 'false', 'Responsive drawer state.'),
    row('collapsed', 'model<boolean>', 'false', 'Desktop collapsed state.'),
    row(
      'closeOnNavigate',
      'boolean',
      'true',
      'Closes the mobile drawer after projected navigation is used.',
    ),
    row(
      'aevkoSidebarHeader / Footer',
      'projected slots',
      'empty',
      'Persistent content around navigation.',
    ),
    row('aevkoSidebarMenuIcon', 'projected slot', 'inline SVG', 'Replaces the mobile menu icon.'),
    row('aevkoSidebarExpandIcon', 'projected slot', 'inline SVG', 'Replaces the expand icon.'),
    row('aevkoSidebarCollapseIcon', 'projected slot', 'inline SVG', 'Replaces the collapse icon.'),
  ],
  button: [
    row(
      'variant',
      "'primary' | 'outline' | 'ghost' | 'accent' | 'danger'",
      "'primary'",
      'Visual hierarchy of the action.',
    ),
    row('size', "'sm' | 'md' | 'lg'", "'md'", 'Control height and horizontal padding.'),
    row('type', "'button' | 'submit' | 'reset'", "'button'", 'Native button type.'),
    row(
      'loading',
      'boolean',
      'false',
      'Disables activation, exposes aria-busy and shows a spinner.',
    ),
    row('disabled', 'boolean', 'false', 'Forwards the native disabled state.'),
    row('aevkoButtonIconStart', 'projected slot', 'empty', 'Leading icon or custom element.'),
    row('aevkoButtonIconEnd', 'projected slot', 'empty', 'Trailing icon or custom element.'),
  ],
  'button-group': [
    row('label', 'string', 'required', 'Accessible name for the group of related actions.'),
    row(
      'orientation',
      "'horizontal' | 'vertical'",
      "'horizontal'",
      'Visual stacking direction for projected controls.',
    ),
    row(
      'content',
      'projected native buttons',
      'required',
      'Related actions; Button is installed transitively.',
    ),
  ],
  toggle: [
    row('pressed', 'model<boolean>', 'false', 'Pressed state with two-way binding support.'),
    row('disabled', 'boolean', 'false', 'Forwards the native disabled state.'),
    row('variant', "'default' | 'outline'", "'default'", 'Visual treatment for the toggle.'),
    row('size', "'sm' | 'md' | 'lg'", "'md'", 'Control height and padding.'),
  ],
  badge: [
    row(
      'variant',
      "'default' | 'outline' | 'muted' | 'danger'",
      "'default'",
      'Visual status hierarchy.',
    ),
    row('aevkoBadgeIcon', 'projected slot', 'empty', 'Optional leading SVG, image or component.'),
    row('content', 'projected content', 'required', 'Visible status or metadata label.'),
  ],
  alert: [
    row(
      'variant',
      "'default' | 'muted' | 'danger'",
      "'default'",
      'Visual emphasis of the message.',
    ),
    row(
      'live',
      "'polite' | 'assertive'",
      "'polite'",
      'Chooses status or alert announcement semantics.',
    ),
    row('aevkoAlertTitle', 'projected slot', 'empty', 'Concise message heading.'),
    row('aevkoAlertDescription', 'projected slot', 'empty', 'Supporting message detail.'),
    row('aevkoAlertIcon', 'projected slot', 'empty', 'Decorative leading visual.'),
  ],
  progress: [
    row('label', 'string', 'required', 'Accessible name for the operation.'),
    row('value', 'number | null', 'null', 'Current value; null enables indeterminate mode.'),
    row('max', 'number', '100', 'Maximum range value; values are clamped safely.'),
  ],
  spinner: [
    row('label', 'string', "'Loading'", 'Accessible name announced for the loading status.'),
    row('size', 'CSS length string', "'1rem'", 'Inline size and block size of the ring.'),
  ],
  skeleton: [
    row(
      'dimensions',
      'consumer CSS',
      'min-height: 1rem',
      'Width, height and shape are controlled by host classes or styles.',
    ),
    row(
      'semantics',
      'aria-hidden',
      'true',
      'The placeholder is decorative and excluded from the accessibility tree.',
    ),
  ],
  avatar: [
    row(
      'src',
      'string | null',
      'null',
      'Image URL; fallback appears when absent or loading fails.',
    ),
    row('alt', 'string', 'required', 'Accessible name for both image and fallback.'),
    row('fallback', 'string', 'required', 'Initials or short text rendered without an image.'),
    row('size', 'CSS length string', "'2.5rem'", 'Width and height of the square avatar.'),
  ],
  attachment: [
    row('name', 'string', 'required', 'Visible file name.'),
    row('metadata', 'string', 'optional', 'File type, size or other supporting text.'),
    row('aevkoAttachmentIcon', 'projected slot', 'empty', 'Optional decorative file visual.'),
    row(
      'aevkoAttachmentAction',
      'projected slot',
      'empty',
      'Native link, button or custom action.',
    ),
  ],
  marker: [
    row(
      'variant',
      "'default' | 'muted' | 'danger'",
      "'default'",
      'Neutral status treatment for the decorative dot.',
    ),
    row('content', 'projected text', 'required', 'Human-readable meaning of the marker.'),
  ],
  pagination: [
    row('page', 'model<number>', '1', 'Current page with two-way binding support.'),
    row('totalPages', 'number', 'required', 'Number of available pages.'),
    row('label', 'string', "'Pagination'", 'Accessible name for the navigation landmark.'),
  ],
  breadcrumb: [
    row('label', 'string', "'Breadcrumb'", 'Accessible name for the navigation landmark.'),
    row('current', 'boolean', 'false', 'Marks an item as the current page.'),
    row('separator', 'string', "'/'", 'Fallback separator between non-current items.'),
    row(
      'aevkoBreadcrumbSeparator',
      'projected slot',
      'fallback string',
      'Replaces the fallback with an SVG, text or custom component.',
    ),
  ],
  bubble: [
    row('align', "'start' | 'end'", "'start'", 'Places the surface at the logical edge.'),
    row(
      'variant',
      "'default' | 'muted' | 'outline'",
      "'default'",
      'Selects the neutral surface hierarchy.',
    ),
    row(
      'aevkoBubbleReactions',
      'projected slot',
      'empty',
      'Optional native reaction controls or metadata.',
    ),
  ],
  message: [
    row('align', "'start' | 'end'", "'start'", 'Orders visual and content by logical side.'),
    row(
      'variant',
      "'default' | 'muted' | 'danger'",
      "'default'",
      'Changes visual emphasis without adding semantics.',
    ),
    row('aevkoMessageVisual', 'projected slot', 'empty', 'Optional decorative avatar or icon.'),
    row('aevkoMessageAuthor', 'projected slot', 'empty', 'Visible sender or source.'),
    row('aevkoMessageMeta', 'projected slot', 'empty', 'Time or delivery metadata.'),
    row(
      'aevkoMessageAction',
      'projected slot',
      'empty',
      'Native actions associated with the message.',
    ),
  ],
  trace: [
    row('label', 'string', "'Event trace'", 'Accessible name for the ordered timeline.'),
    row(
      'state',
      "'complete' | 'running' | 'error' | 'pending'",
      "'complete'",
      'Visual execution state for each item.',
    ),
    row('aevkoTraceTitle', 'projected slot', 'empty', 'Step title or native interactive trigger.'),
    row('aevkoTraceTime', 'projected slot', 'empty', 'Time or duration metadata.'),
  ],
  checkbox: [
    row('invalid', 'boolean', 'false', 'Writes aria-invalid and applies invalid styling.'),
    row(
      'native attributes',
      'HTMLInputElement',
      'browser default',
      'Supports checked, indeterminate, disabled, value, Forms bindings and native events.',
    ),
  ],
  switch: [
    row('size', "'sm' | 'md'", "'md'", 'Changes the track and thumb dimensions.'),
    row('invalid', 'boolean', 'false', 'Writes aria-invalid and applies invalid styling.'),
    row(
      'native attributes',
      'HTMLInputElement',
      'browser default',
      'Supports checked, disabled, value, Forms bindings and native events.',
    ),
  ],
  'radio-group': [
    row(
      'orientation',
      "'horizontal' | 'vertical'",
      "'vertical'",
      'Controls the fieldset layout without changing radio semantics.',
    ),
    row('invalid', 'boolean', 'false', 'Exposes group invalid state for styling.'),
    row(
      'native radio attributes',
      'HTMLInputElement',
      'browser default',
      'Each item accepts name, value, checked, disabled and Forms bindings.',
    ),
  ],
  'toggle-group': [
    row('label', 'string', 'required', 'Accessible name for the button group.'),
    row('type', "'single' | 'multiple'", "'single'", 'Controls exclusive or additive selection.'),
    row(
      'orientation',
      "'horizontal' | 'vertical'",
      "'horizontal'",
      'Sets layout and arrow-key focus axis.',
    ),
    row('value', 'model<readonly string[]>', '[]', 'Selected item values with two-way binding.'),
    row('item value', 'string', 'required', 'Stable value emitted by each native button.'),
  ],
  'input-group': [
    row(
      'aevkoInputGroupControl',
      'native input or textarea',
      'required',
      'The focusable form control.',
    ),
    row(
      'addon align',
      "'inline-start' | 'inline-end' | 'block-start' | 'block-end'",
      "'inline-start'",
      'Positions projected text, icons or controls without changing DOM focus order.',
    ),
    row('aevkoInputGroupButton', 'native button', "type='button'", 'Optional embedded action.'),
  ],
  'input-otp': [
    row('label', 'string', 'required', 'Accessible name for the single native input.'),
    row('maxLength', 'number', '6', 'Number of accepted and displayed characters.'),
    row('characters', 'RegExp', '/[0-9A-Za-z]/', 'Per-character acceptance rule.'),
    row('value', 'model<string>', "''", 'Current code; also supports Angular Forms.'),
    row('disabled / invalid', 'boolean', 'false', 'Form and validation states.'),
  ],
  slider: [
    row('orientation', "'horizontal' | 'vertical'", "'horizontal'", 'Visual range axis.'),
    row('invalid', 'boolean', 'false', 'Writes aria-invalid for validation.'),
    row(
      'native attributes',
      'HTMLInputElement',
      'browser default',
      'Supports min, max, step, value, disabled and Forms.',
    ),
  ],
  'message-scroller': [
    row('label', 'string', "'Messages'", 'Accessible name for the transcript region.'),
    row(
      'autoScroll',
      'boolean',
      'false',
      'Follows growing content only while the reader stays at the live edge.',
    ),
    row(
      'preserveScrollOnPrepend',
      'boolean',
      'true',
      'Offsets prepended history so the visible content does not jump.',
    ),
    row('messageId', 'string', 'required', 'Stable address for each transcript item.'),
    row('scrollAnchor', 'boolean', 'false', 'Marks a meaningful turn boundary.'),
    row(
      'scrollToMessage',
      '(id: string) => boolean',
      'method',
      'Moves a mounted item to the viewport start.',
    ),
  ],
  tabs: [
    row('label', 'string', 'required', 'Accessible name for the tab list.'),
    row(
      'id',
      'string',
      "'aevko-tabs'",
      'Prefix linking triggers and panels; make it unique per page.',
    ),
    row('value', 'model<string>', 'first trigger', 'Controlled selected tab value.'),
    row('orientation', "'horizontal' | 'vertical'", "'horizontal'", 'Layout and arrow-key axis.'),
    row(
      'activation',
      "'automatic' | 'manual'",
      "'automatic'",
      'Whether focus immediately selects a tab.',
    ),
    row('trigger / content value', 'string', 'required', 'Stable association key.'),
  ],
  'code-block': [
    row('variant', "'default' | 'destructive'", "'default'", 'Surface tone.'),
    row('size', "'default' | 'sm'", "'default'", 'Content density.'),
    row('code / language', 'string', "'' / 'text'", 'Plain source and language metadata.'),
    row(
      'lineNumbers / startLine',
      'boolean / number',
      'false / 1',
      'Optional non-selectable gutter.',
    ),
    row('wrap', 'boolean', 'false', 'Wraps long lines instead of horizontal scrolling.'),
    row(
      'line variant',
      "'default' | 'added' | 'removed' | 'highlighted'",
      "'default'",
      'Optional per-line emphasis.',
    ),
    row('copy value', 'string', 'required', 'Exact text written to the clipboard.'),
  ],
  chart: [
    row('label', 'string', 'required', 'Accessible figure name.'),
    row('description', 'string', "''", 'Visible context for the displayed measure.'),
    row(
      'series',
      'readonly AevkoChartSeries[]',
      '[]',
      'Legend labels and optional consumer colors.',
    ),
    row(
      'aevkoChartVisual',
      'projected slot',
      'empty',
      'Canvas, SVG or chart-engine component, hidden from assistive technology.',
    ),
    row('aevkoChartData', 'projected slot', 'empty', 'Native table or textual data alternative.'),
  ],
  'data-table': [
    row(
      'rows / columns',
      'readonly T[] / readonly Column<T>[]',
      'required',
      'Typed records and visible column definitions.',
    ),
    row('rowKey', '(row: T) => string', 'required', 'Stable identity for tracking and selection.'),
    row(
      'filter / sort',
      'model<string> / model<Sort | null>',
      "'' / null",
      'Controlled query and sorting state.',
    ),
    row(
      'selectable / selectedKeys',
      'boolean / model<readonly string[]>',
      'false / []',
      'Optional labelled row selection.',
    ),
    row('page / pageSize', 'model<number> / number', '1 / 10', 'Current page and local page size.'),
    row(
      'manual / totalRows',
      'boolean / number | null',
      'false / null',
      'Delegates sorting/filter/paging to remote application state.',
    ),
    row(
      'loading / emptyMessage',
      'boolean / string',
      "false / 'No results found'",
      'Data-region loading and empty feedback.',
    ),
  ],
  dialog: [
    row('title', 'string', 'required', 'Accessible and visible modal heading.'),
    row('description', 'string', "''", 'Optional supporting text and accessible description.'),
    row('open', 'model<boolean>', 'false', 'Controlled open state with two-way binding.'),
    row('initialFocus', 'CSS selector', "''", 'Element inside the panel focused after opening.'),
    row(
      'closeOnEscape / closeOnBackdrop',
      'boolean',
      'true / true',
      'Configures non-action dismissal.',
    ),
    row('restoreFocus', 'boolean', 'true', 'Returns focus to the previous active element.'),
    row(
      'aevkoDialogTrigger / aevkoDialogClose',
      'projected slots',
      'empty',
      'Native elements that open or close the modal.',
    ),
  ],
  'alert-dialog': [
    row('title / description', 'string', "required / ''", 'Decision heading and consequence text.'),
    row('open', 'model<boolean>', 'false', 'Controlled alert-dialog state.'),
    row('initialFocus', 'CSS selector', "''", 'Usually targets the safest available action.'),
    row(
      'closeOnEscape / restoreFocus',
      'boolean',
      'true / true',
      'Keyboard dismissal and focus return.',
    ),
    row(
      'aevkoAlertDialogTrigger / aevkoAlertDialogClose',
      'projected slots',
      'empty',
      'Native opener and explicit decision controls.',
    ),
  ],
  drawer: [
    row('title / description', 'string', "required / ''", 'Accessible drawer heading and context.'),
    row('open', 'model<boolean>', 'false', 'Controlled open state.'),
    row(
      'side',
      "'top' | 'right' | 'bottom' | 'left'",
      "'bottom'",
      'Viewport edge used by the surface.',
    ),
    row(
      'dismissal and focus inputs',
      'boolean / CSS selector',
      'dialog defaults',
      'Configures Escape, backdrop, initial focus and restoration.',
    ),
    row(
      'aevkoDrawerTrigger / aevkoDrawerClose',
      'projected slots',
      'empty',
      'Native opener and close actions.',
    ),
  ],
  sheet: [
    row('title / description', 'string', "required / ''", 'Accessible sheet heading and context.'),
    row('open', 'model<boolean>', 'false', 'Controlled open state.'),
    row(
      'side',
      "'top' | 'right' | 'bottom' | 'left'",
      "'right'",
      'Viewport edge used by the surface.',
    ),
    row(
      'dismissal and focus inputs',
      'boolean / CSS selector',
      'dialog defaults',
      'Configures Escape, backdrop, initial focus and restoration.',
    ),
    row(
      'aevkoSheetTrigger / aevkoSheetClose',
      'projected slots',
      'empty',
      'Native opener and close actions.',
    ),
  ],
  popover: [
    row(
      'label / id',
      'string',
      "required / 'aevko-popover'",
      'Accessible popup name and relationship id.',
    ),
    row('open', 'model<boolean>', 'false', 'Controlled visibility.'),
    row('side / align', 'union', "'bottom' / 'center'", 'Logical placement around the trigger.'),
    row('closeOnEscape', 'boolean', 'true', 'Dismisses the non-modal surface with Escape.'),
    row(
      'aevkoPopoverTrigger / aevkoPopoverClose',
      'projected slots',
      'empty',
      'Native opener and optional close action.',
    ),
  ],
  'hover-card': [
    row('open', 'model<boolean>', 'false', 'Observable preview visibility.'),
    row('side / align', 'union', "'bottom' / 'center'", 'Preview placement.'),
    row('delay / closeDelay', 'number', '150 / 200', 'Open and close delays in milliseconds.'),
    row(
      'aevkoHoverCardTrigger',
      'projected slot',
      'required',
      'Usually a native link to the full destination.',
    ),
  ],
  tooltip: [
    row('open', 'model<boolean>', 'false', 'Observable tooltip visibility.'),
    row('side', "'top' | 'right' | 'bottom' | 'left'", "'top'", 'Tooltip placement.'),
    row('delay', 'number', '300', 'Open delay in milliseconds.'),
    row(
      'aevkoTooltipTrigger',
      'projected slot',
      'required',
      'Focus and hover target described by the tooltip.',
    ),
  ],
  toast: [
    row(
      'show(title, options)',
      '(string, AevkoToastOptions) => string',
      'service method',
      'Queues a toast and returns its id.',
    ),
    row(
      'tone',
      "'default' | 'success' | 'info' | 'warning' | 'error'",
      "'default'",
      'Announcement urgency and visual treatment.',
    ),
    row('duration', 'number', '5000', 'Automatic dismissal delay; zero persists.'),
    row('actionLabel / action', 'string / callback', 'empty', 'Optional application action.'),
    row('dismiss / clear', 'service methods', 'available', 'Removes one or all notifications.'),
  ],
  command: [
    row(
      'items',
      'readonly AevkoCommandItem[]',
      'required',
      'Commands, descriptions, shortcuts and disabled state.',
    ),
    row('query / value', 'model<string>', "'' / ''", 'Controlled filter and selected command.'),
    row(
      'activated',
      'output<AevkoCommandItem>',
      'event',
      'Emits an enabled command activated by click or Enter.',
    ),
  ],
  'dropdown-menu': [
    row(
      'label / id',
      'string',
      'required / generated default',
      'Accessible menu name and trigger relationship.',
    ),
    row('open', 'model<boolean>', 'false', 'Controlled menu state.'),
    row('align', "'start' | 'end'", "'start'", 'Popup alignment.'),
    row('trigger / item', 'projected directives', 'required', 'Native trigger and action buttons.'),
  ],
  'context-menu': [
    row('label', 'string', 'required', 'Accessible menu name.'),
    row('open', 'model<boolean>', 'false', 'Observable context-menu state.'),
    row(
      'trigger / item',
      'projected directives',
      'required',
      'Right-click region and native actions.',
    ),
  ],
  menubar: [
    row('label', 'string', 'required', 'Accessible application command strip name.'),
    row('AevkoMenubarItem.disabled', 'boolean', 'false', 'Removes a command from roving focus.'),
  ],
  'navigation-menu': [
    row('label', 'string', 'required', 'Accessible navigation landmark name.'),
    row(
      'projected content',
      'native links or buttons',
      'empty',
      'Application-owned destinations and controls.',
    ),
  ],
  calendar: [
    row(
      'month / value',
      "model<'YYYY-MM' | 'YYYY-MM-DD'>",
      "'2026-01' / ''",
      'Controlled visible month and selected ISO date.',
    ),
    row('min / max', 'ISO date string', "'' / ''", 'Optional inclusive selection bounds.'),
    row('--cell-size', 'CSS custom property', '2.5rem', 'Calendar cell geometry.'),
  ],
  combobox: [
    row(
      'items',
      'readonly AevkoComboboxItem[]',
      'required',
      'Options, disabled state and search keywords.',
    ),
    row('value / query', 'model<string>', "'' / ''", 'Controlled selection and input text.'),
    row('emptyMessage', 'string', "'No items found.'", 'No-result feedback.'),
  ],
  'date-picker': [
    row(
      'value / month / open',
      'model<string | boolean>',
      "'' / '2026-01' / false",
      'Controlled date, visible month and popup state.',
    ),
    row('min / max', 'ISO date string', "'' / ''", 'Optional selection bounds.'),
    row(
      'registry dependencies',
      'calendar + popover',
      'installed automatically',
      'Source-owned composition without npm packages.',
    ),
  ],
  questionnaire: [
    row(
      'items',
      'readonly AevkoQuestionnaireItem[]',
      'required',
      'Ordered questions, choices and behavior.',
    ),
    row('active', 'model<number>', '0', 'Controlled active question index.'),
    row('answers', 'model<Record<string, string | string[]>>', '{}', 'Controlled answer state.'),
    row('submitted', 'output<answers>', 'event', 'Emits validated final answers.'),
  ],
  select: [
    row('items', 'readonly AevkoSelectItem[]', 'required', 'Labels, values and disabled options.'),
    row('value', 'model<string>', "''", 'Controlled selected value.'),
    row('disabled', 'boolean', 'false', 'Disables the trigger.'),
    row('placeholder', 'string', "'Select an option'", 'Text before selection.'),
  ],
  field: [
    row('invalid', 'boolean', 'false', 'Marks the group invalid for styling and semantics.'),
    row('aevkoFieldLabel', 'projected slot', 'empty', 'Native label or custom label content.'),
    row('aevkoFieldDescription', 'projected slot', 'empty', 'Help text referenced by the control.'),
    row('aevkoFieldError', 'projected slot', 'empty', 'Validation message shown by the consumer.'),
  ],
  input: [
    row('invalid', 'boolean', 'false', 'Writes aria-invalid and applies invalid-state styling.'),
    row(
      'native attributes',
      'HTMLInputElement',
      'browser default',
      'Accepts native input properties, events and Angular Forms bindings.',
    ),
  ],
  label: [
    row(
      'native attributes',
      'HTMLLabelElement',
      'browser default',
      'Accepts native label attributes, including for.',
    ),
  ],
  'native-select': [
    row('invalid', 'boolean', 'false', 'Writes aria-invalid and applies invalid-state styling.'),
    row(
      'native attributes',
      'HTMLSelectElement',
      'browser default',
      'Accepts native select properties, options, events and Forms bindings.',
    ),
  ],
  textarea: [
    row('invalid', 'boolean', 'false', 'Writes aria-invalid and applies invalid-state styling.'),
    row('autoResize', 'boolean', 'false', 'Grows the control to fit its current content.'),
    row(
      'native attributes',
      'HTMLTextAreaElement',
      'browser default',
      'Accepts native textarea properties, events and Forms bindings.',
    ),
  ],
  card: [
    row('AevkoCard', 'component', 'required', 'Surface and layout root.'),
    row('AevkoCardHeader', 'component', 'optional', 'Groups title, description and actions.'),
    row('AevkoCardTitle', 'component', 'optional', 'Primary title content.'),
    row('AevkoCardDescription', 'component', 'optional', 'Supporting title copy.'),
    row('AevkoCardContent', 'component', 'optional', 'Main projected content.'),
    row('AevkoCardActions', 'component', 'optional', 'Header-level actions.'),
    row('AevkoCardFooter', 'component', 'optional', 'Trailing metadata or actions.'),
  ],
  separator: [
    row(
      'orientation',
      "'horizontal' | 'vertical'",
      "'horizontal'",
      'Visual and semantic axis of the divider.',
    ),
    row(
      'decorative',
      'boolean',
      'true',
      'Uses role none when the separator carries no structural meaning.',
    ),
  ],
  table: [
    row(
      'aevkoTableContainer',
      'component on div',
      'required for overflow',
      'Keyboard-focusable responsive container with an accessible label.',
    ),
    row(
      'aevkoTable',
      'component on table',
      'required',
      'Native table root with collapsed borders and full width.',
    ),
    row(
      'aevkoTableHeader / Body / Footer',
      'components on native groups',
      'as needed',
      'Styled native row groups without changing semantics.',
    ),
    row(
      'aevkoTableRow',
      'component on tr',
      'required per row',
      'Native row with divider and hover feedback.',
    ),
    row(
      'aevkoTableHead',
      'component on th',
      'required per header',
      'Native column or row header; set scope for its relationship.',
    ),
    row(
      'aevkoTableCell',
      'component on td',
      'required per cell',
      'Native data cell with consistent spacing and alignment.',
    ),
    row(
      'aevkoTableCaption',
      'component on caption',
      'optional',
      'Visible description associated with the native table.',
    ),
  ],
};

const customizationGuidance: Record<keyof typeof componentDocs, string> = {
  accordion:
    'Tune trigger height, dividers, typography and chevron motion in the installed accordion stylesheet. State and heading semantics remain in the template.',
  'aspect-ratio':
    'Style the host or projected media directly. The component only owns the ratio calculation, so cropping and object-fit stay under consumer control.',
  carousel:
    'Style the viewport, slides and controls locally, then replace either control icon through its projection slot without adding an icon dependency.',
  collapsible:
    'Change trigger layout, borders and disclosure motion in local source. Project a custom indicator when the inline chevron does not fit the product language.',
  direction:
    'Apply the directive at the narrowest shared boundary. Descendants inherit the native dir attribute and can still use logical CSS properties.',
  empty:
    'Compose the title, description, visual and action from native elements. Spacing can be changed on the host without changing the projected content contract.',
  item: 'Use variants for hierarchy, then style the icon, copy and action slots independently. The row does not prescribe the action element.',
  resizable:
    'Adjust panel minimums and keyboard step through inputs; edit handle size and feedback in local CSS while preserving separator semantics.',
  'scroll-area':
    'Keep native scrolling and use the scrollbar input only for presentation. Size the host with normal CSS or utility classes.',
  sidebar:
    'Compose header, links and footer from product content. Mobile, collapse and icon treatments remain editable in the installed template and stylesheet.',
  button:
    'Build product variants from the local CSS, override semantic tokens at any ancestor and project start or end content that inherits currentColor.',
  'button-group':
    'Arrange related actions horizontally or vertically while styling each projected native button independently.',
  toggle:
    'Bind pressed for controlled state, choose a size and edit the local on/off treatments to match product hierarchy.',
  badge:
    'Choose a neutral variant, project any icon implementation and override compact spacing through local CSS.',
  alert:
    'Compose title, description and an optional visual, then select announcement urgency independently from visual emphasis.',
  progress:
    'Bind a real numeric operation or use null for indeterminate work; change track and indicator tokens locally.',
  spinner:
    'Set an accessible operation label and any CSS length for size while inheriting color from its parent.',
  skeleton:
    'Control every placeholder dimension through consumer classes and combine several shapes into the final loading composition.',
  avatar:
    'Provide a product image when available, tune the square size with any CSS length and style the initials fallback in local source.',
  attachment:
    'Project any icon and native file action while keeping upload, download and deletion behavior entirely in the consuming application.',
  marker:
    'Use the small visual indicator inside lists, timelines or metadata and adapt its neutral variants through local tokens.',
  pagination:
    'Bind the current page to application state, choose a landmark label and edit page-window behavior locally for large collections.',
  breadcrumb:
    'Compose links and the current label from native elements, then replace the separator slot with any icon system when the text fallback does not fit.',
  bubble:
    'Choose alignment and neutral hierarchy per message, then project native reaction controls that inherit currentColor and remain independently stylable.',
  message:
    'Combine author, metadata, visuals, actions and any message surface without coupling the row to a chat service or icon library.',
  trace:
    'Edit marker and connector treatments locally, project rich titles or links and keep execution state bound to real application data.',
  checkbox:
    'Pair the native control with ordinary labels and Angular Forms. Edit its local check treatment while retaining checked and indeterminate browser state.',
  switch:
    'Use the switch for immediate binary settings, choose a compact size when needed and theme the square track through semantic tokens.',
  'radio-group':
    'Compose native labels and descriptions inside the fieldset, then select horizontal or vertical layout without replacing browser selection behavior.',
  'toggle-group':
    'Choose single or multiple selection, bind the value array and replace item content with text, SVG or custom Angular content as needed.',
  'input-group':
    'Compose native inputs, textareas, text, SVG and buttons in one surface. Keep the control first in source and move addons visually with logical alignment.',
  'input-otp':
    'Bind through value or Angular Forms, choose a character rule and edit the local slot geometry without splitting the accessible input into several fields.',
  slider:
    'Use native min, max and step values and theme the track/thumb locally. Build a separate multi-thumb control only when a real interval workflow requires it.',
  'message-scroller':
    'Constrain the host height, compose any message rows and opt into live following explicitly. The component owns scroll behavior, not transport or message state.',
  tabs: 'Compose only the triggers and panels needed, bind value for controlled navigation and choose manual activation when changing tabs is expensive.',
  'code-block':
    'Use plain text by default and project highlighted lines only when needed. Syntax highlighting stays optional and outside the base install.',
  chart:
    'Project any SVG, canvas or Angular chart engine while keeping its package application-owned. Theme series with tokens and always include semantic data.',
  'data-table':
    'Keep domain formatting in typed column accessors, use controlled state for remote datasets and edit the local template when a product needs custom cells.',
  dialog:
    'Project the exact form or task controls you need, bind open when application state matters and tune focus/dismissal without replacing the native modal primitive.',
  'alert-dialog':
    'Write a concrete consequence, project a safe cancel action and a clearly labelled confirmation action, then keep the decision logic in application code.',
  drawer:
    'Choose an edge that follows the task and viewport, keep long content scrollable and project native controls without coupling the component to an icon library.',
  sheet:
    'Use the sheet for complementary work rather than primary navigation, select its logical edge and edit the installed width locally for your product.',
  popover:
    'Project compact interactive content, bind open when coordinating application state and keep placement a presentational choice rather than a reading-order dependency.',
  'hover-card':
    'Use a native link as the trigger and keep the preview supplementary; edit delays and dimensions locally for the density of your product.',
  tooltip:
    'Keep content concise, project any focusable trigger and adjust delay or placement without replacing its accessible description relationship.',
  toast:
    'Inject the local store where events occur, mount one toaster near the application root and style tones through semantic tokens or local source.',
  command:
    'Keep command data in application state, customize matching keywords and connect activated items to real actions without importing a command engine.',
  'dropdown-menu':
    'Project native action buttons, bind open only when coordinating state and edit the local surface for groups, shortcuts or destructive treatments.',
  'context-menu':
    'Attach the trigger to the exact region it affects and project only actions that are also discoverable through ordinary interface controls.',
  menubar:
    'Use the persistent strip for a small stable command set and compose richer dropdowns separately when a top-level item needs subcommands.',
  'navigation-menu':
    'Project real router links or anchors, theme spacing locally and let destinations remain application-owned.',
  calendar:
    'Bind ISO strings to application state, constrain valid dates when the workflow requires it and tune cell size through the local custom property.',
  combobox:
    'Keep option data and filtering keywords application-owned, bind query when remote search is needed and edit the installed matching logic directly.',
  'date-picker':
    'Use the composed source as a starting point, bind its ISO value and customize display formatting without coupling Calendar to a date library.',
  questionnaire:
    'Define ordered questions as typed data, control active/answers for persistence and connect submitted output to application validation and transport.',
  select:
    'Use typed item data and controlled value for custom selection; prefer Native Select when platform-native interaction is sufficient.',
  field:
    'Keep label, help and error content explicit, then control layout through the field host. Nothing is hidden behind generated form metadata.',
  input:
    'Use native attributes and Angular Forms normally. Override height, border and focus tokens through classes or edit the installed directive stylesheet.',
  label:
    'Style the native label through ordinary classes or the local directive stylesheet; association remains the browser for/id contract.',
  'native-select':
    'Customize the native control without replacing platform interaction. Options, validation and Forms bindings remain ordinary Angular markup.',
  textarea:
    'Use native rows and sizing constraints or enable content-driven resizing. Typography, minimum height and validation treatment are local CSS.',
  card: 'Compose only the regions the design needs. Each primitive accepts consumer classes, making transparent, bordered or editorial cards straightforward.',
  separator:
    'Change color and thickness through local CSS or tokens. Orientation and whether the divider is semantic stay explicit inputs.',
  table:
    'Style native table primitives directly, add alignment classes per column and compose any data source or Angular control flow without a table engine.',
};

const consumerResponsibilities: Record<keyof typeof componentDocs, string> = {
  accordion:
    'Choose a headingLevel that follows the page outline and write labels that describe the hidden section.',
  'aspect-ratio':
    'Provide alternative text for meaningful images and avoid placing essential content in a cropped visual.',
  carousel:
    'Provide a concise region label and meaningful slide labels; do not auto-advance content without user controls.',
  collapsible:
    'Use a unique panelId when several disclosures share a page and keep the trigger label meaningful in both states.',
  direction:
    'Set direction from actual language/content context rather than using RTL as a visual mirroring shortcut.',
  empty:
    'Project a semantic heading and a native actionable element; do not communicate the empty state through the icon alone.',
  item: 'Use a native button or link for actions and expose disabled behavior semantically, not only visually.',
  resizable:
    'Give both panels meaningful content and ensure the configured min/max values keep that content usable.',
  'scroll-area':
    'Add a contextual accessible label when the scroll region is not obvious from surrounding content.',
  sidebar:
    'Provide descriptive navigation text, identify the current route and keep projected links keyboard reachable.',
  button:
    'Keep a visible label or provide an accessible name for icon-only actions; choose submit only inside the intended form.',
  'button-group':
    'Use one concise group label and only group actions that users understand as related.',
  toggle:
    'Provide a visible label or accessible name that describes what becomes active, not an ambiguous on/off state.',
  badge: 'Keep meaningful status text in the badge and do not rely on its color or icon alone.',
  alert:
    'Use assertive announcements only for urgent dynamic changes and keep the message concise enough to understand immediately.',
  progress:
    'Use a label that identifies the operation and update value only when measurable progress is available.',
  spinner:
    'Place the spinner near the affected region and avoid announcing several simultaneous loading statuses.',
  skeleton:
    'Apply busy state and a loading label to the containing region because the skeleton itself is intentionally decorative.',
  avatar:
    'Write alternative text that identifies the person or entity; use an empty alt only when the avatar is genuinely redundant.',
  attachment:
    'Make every projected action keyboard accessible and announce destructive consequences before removing a file.',
  marker:
    'Always include meaningful text because the dot color and position cannot carry status by themselves.',
  pagination:
    'Keep the current page synchronized with results and preserve focus when page content updates.',
  breadcrumb:
    'Keep the path concise, use real links for navigable ancestors and mark only the final location as current.',
  bubble:
    'Provide readable message text and accessible names for reaction controls; do not use alignment or color as the only speaker cue.',
  message:
    'Choose the surrounding log, feed or live-region semantics and ensure author, time and actions remain understandable without the visual.',
  trace:
    'Include visible state text for running, failed or pending steps because marker color and animation are only supporting cues.',
  checkbox:
    'Associate every checkbox with a visible label and explain the consequence when consent or destructive behavior is involved.',
  switch:
    'Use a persistent label that describes the setting, not the current on/off value, and avoid switches for deferred form submission.',
  'radio-group':
    'Provide a visible legend, share one name across choices and ensure one option is selected when the question is required.',
  'toggle-group':
    'Provide a concise group label and accessible names for icon-only items; keep selected values synchronized with application state.',
  'input-group':
    'Associate a visible label with the native control and give every embedded icon-only button an accessible name.',
  'input-otp':
    'Explain where the code was sent, allow password-manager/autofill behavior and surface validation outside the decorative slots.',
  slider:
    'Provide a visible label and expose the current value in nearby text when the numeric meaning is not otherwise obvious.',
  'message-scroller':
    'Use stable message ids, set aria-busy while a response streams and never enable following when it would override the reader’s position.',
  tabs: 'Give every tabs instance a unique id, use concise trigger labels and keep panels focused on one related view.',
  'code-block':
    'Provide an accurate language/title, cap very long output and ensure copy actions expose an accessible label.',
  chart:
    'Provide a native table or concise textual data alternative and never rely on color alone to distinguish series.',
  'data-table':
    'Use stable row keys, meaningful captions and formatted text values; announce remote loading and preserve selection intentionally across pages.',
  dialog:
    'Provide a concise title, set initialFocus for a predictable first control and avoid placing an entire application workflow inside one modal.',
  'alert-dialog':
    'Describe the irreversible consequence, make the safest action easy to find and never close the panel without recording the user’s explicit choice.',
  drawer:
    'Keep projected controls labelled, ensure content remains usable at small viewport heights and do not rely on the visual handle as an action.',
  sheet:
    'Provide a meaningful heading, keep keyboard focus order logical and avoid hiding essential page information behind the overlay.',
  popover:
    'Give the surface a meaningful label, keep focusable content in logical order and provide an explicit close path for longer tasks.',
  'hover-card':
    'Ensure the trigger still navigates to the complete information and never place essential or highly interactive content only in the preview.',
  tooltip:
    'Give icon-only triggers their own accessible name; use the tooltip for supporting explanation rather than the only label.',
  toast:
    'Keep messages concise, reserve error tone for urgent failure and ensure any action remains available elsewhere after automatic dismissal.',
  command:
    'Give commands unique ids and plain-language labels, keep disabled commands understandable and preserve an alternative path to every action.',
  'dropdown-menu':
    'Use native buttons for actions, links for navigation and concise labels that remain clear without icons or shortcuts.',
  'context-menu':
    'Provide every context action elsewhere in the interface because right click is not universally available or discoverable.',
  menubar:
    'Keep commands stable across screens and ensure each button action remains understandable to keyboard and screen-reader users.',
  'navigation-menu':
    'Mark the current destination with aria-current and keep link text meaningful outside its visual grouping.',
  calendar:
    'Provide a task-specific label, ensure disabled ranges are explained nearby and format the selected ISO value for the user elsewhere.',
  combobox:
    'Provide a visible label, keep option labels unique and expose remote loading or errors outside the suggestion list.',
  'date-picker':
    'Provide a visible field label and explain required formats or date constraints in associated help text.',
  questionnaire:
    'Write concise legends, make required/skippable status explicit and persist answers outside the component when users may resume later.',
  select:
    'Provide a visible label, keep choices concise and do not use the placeholder as the only field instruction.',
  field:
    'Pair for/id values and reference help or error ids from aria-describedby on the actual control.',
  input:
    'Associate a visible label and use autocomplete, inputmode and native types that match the requested data.',
  label:
    'Set for to the id of a labelable control and do not use the component as a generic text style.',
  'native-select':
    'Associate a label and make any placeholder option accurately describe an unselected required state.',
  textarea:
    'Associate a label and describe character limits or required formats through aria-describedby.',
  card: 'Add an article, region or form landmark only when the card content genuinely has that meaning.',
  separator: 'Keep decorative true unless the divider communicates a real structural boundary.',
  table:
    'Write a useful caption, set scope on header cells and avoid using a table for visual layout.',
};

@Component({
  standalone: true,
  imports: [
    RouterLink,
    AevkoAccordion,
    AevkoAspectRatio,
    AevkoButton,
    AevkoButtonGroup,
    AevkoToggle,
    AevkoBadge,
    AevkoAlert,
    AevkoProgress,
    AevkoSpinner,
    AevkoSkeleton,
    AevkoAvatar,
    AevkoAttachment,
    AevkoMarker,
    AevkoPagination,
    AevkoBreadcrumb,
    AevkoBreadcrumbItem,
    AevkoBubble,
    AevkoMessage,
    AevkoTrace,
    AevkoTraceItem,
    AevkoCheckbox,
    AevkoSwitch,
    AevkoRadioGroup,
    AevkoRadioGroupItem,
    AevkoToggleGroup,
    AevkoToggleGroupItem,
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
    AevkoCodeBlockCopy,
    AevkoChart,
    AevkoDataTable,
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
    AevkoCalendar,
    AevkoCombobox,
    AevkoDatePicker,
    AevkoQuestionnaire,
    AevkoSelect,
    AevkoCard,
    AevkoCardHeader,
    AevkoCardTitle,
    AevkoCardDescription,
    AevkoCardContent,
    AevkoCardFooter,
    AevkoCarousel,
    AevkoCarouselSlide,
    AevkoCollapsible,
    AevkoDirection,
    AevkoEmpty,
    AevkoField,
    AevkoFieldDescription,
    AevkoFieldLabel,
    AevkoInput,
    AevkoItem,
    AevkoLabel,
    AevkoNativeSelect,
    AevkoResizable,
    AevkoScrollArea,
    AevkoSeparator,
    AevkoSidebar,
    AevkoTextarea,
    AevkoTable,
    AevkoTableBody,
    AevkoTableCaption,
    AevkoTableCell,
    AevkoTableContainer,
    AevkoTableFooter,
    AevkoTableHead,
    AevkoTableHeader,
    AevkoTableRow,
    CodeEditor,
    LucideChevronLeft,
    LucideChevronRight,
    LucideFolderOpen,
    LucideMenu,
    LucidePackageOpen,
    LucidePlus,
    LucideSave,
  ],
  template: `
    @if (doc(); as current) {
      <article class="article page-narrow">
        <p class="eyebrow">Components / {{ current.title }}</p>
        <h1>{{ current.title }}</h1>
        <p class="lede">{{ current.description }}</p>
        <section class="component-example" aria-label="Interactive component example">
          <div class="component-preview">
            @switch (slug()) {
              @case ('accordion') {
                <aevko-accordion [items]="accordionItems" />
              }
              @case ('aspect-ratio') {
                <aevko-aspect-ratio ratio="16/9"
                  ><div class="demo-media">16 / 9</div></aevko-aspect-ratio
                >
              }
              @case ('button') {
                <div class="button-row">
                  <button aevkoButton>
                    <svg lucideSave aevkoButtonIconStart class="docs-icon" aria-hidden="true"></svg
                    >Save changes</button
                  ><button aevkoButton variant="outline">Cancel</button
                  ><button aevkoButton variant="accent">
                    <svg lucidePlus aevkoButtonIconStart class="docs-icon" aria-hidden="true"></svg
                    >Add item
                  </button>
                </div>
              }
              @case ('button-group') {
                <aevko-button-group label="Text alignment">
                  <button aevkoButton variant="outline">Left</button>
                  <button aevkoButton variant="outline">Center</button>
                  <button aevkoButton variant="outline">Right</button>
                </aevko-button-group>
              }
              @case ('toggle') {
                <button aevkoToggle variant="outline" aria-label="Bold text">Bold</button>
              }
              @case ('badge') {
                <div class="button-row">
                  <aevko-badge>Ready</aevko-badge>
                  <aevko-badge variant="muted">In review</aevko-badge>
                  <aevko-badge variant="outline">Draft</aevko-badge>
                </div>
              }
              @case ('alert') {
                <aevko-alert>
                  <strong aevkoAlertTitle>Changes saved</strong>
                  <span aevkoAlertDescription>Your project is up to date.</span>
                </aevko-alert>
              }
              @case ('progress') {
                <div class="progress-demo">
                  <span>Uploading project — 64%</span>
                  <aevko-progress label="Upload progress" [value]="64" />
                </div>
              }
              @case ('spinner') {
                <div class="button-row">
                  <aevko-spinner label="Saving changes" size="1.5rem" /> Saving changes
                </div>
              }
              @case ('skeleton') {
                <div
                  class="skeleton-demo"
                  role="status"
                  aria-busy="true"
                  aria-label="Loading project summary"
                >
                  <aevko-skeleton class="skeleton-avatar" />
                  <aevko-skeleton />
                  <aevko-skeleton class="skeleton-short" />
                </div>
              }
              @case ('avatar') {
                <div class="button-row">
                  <aevko-avatar alt="Ada Lovelace" fallback="AL" size="3rem" />
                  <span><strong>Ada Lovelace</strong><br /><small>Engineering</small></span>
                </div>
              }
              @case ('attachment') {
                <aevko-attachment name="project-brief.pdf" metadata="PDF · 2.4 MB">
                  <button aevkoAttachmentAction type="button">Download</button>
                </aevko-attachment>
              }
              @case ('marker') {
                <div class="button-row">
                  <aevko-marker>Active</aevko-marker>
                  <aevko-marker variant="muted">Queued</aevko-marker>
                  <aevko-marker variant="danger">Blocked</aevko-marker>
                </div>
              }
              @case ('pagination') {
                <aevko-pagination label="Project pages" [totalPages]="5" />
              }
              @case ('breadcrumb') {
                <aevko-breadcrumb label="Project path">
                  <aevko-breadcrumb-item><a href="#projects">Projects</a></aevko-breadcrumb-item>
                  <aevko-breadcrumb-item
                    ><a href="#design">Design systems</a></aevko-breadcrumb-item
                  >
                  <aevko-breadcrumb-item [current]="true">Aevko UI</aevko-breadcrumb-item>
                </aevko-breadcrumb>
              }
              @case ('bubble') {
                <div class="message-demo">
                  <aevko-bubble variant="muted">Can we ship the registry update?</aevko-bubble>
                  <aevko-bubble align="end"
                    >Yes — build and accessibility checks passed.
                    <button aevkoBubbleReactions type="button">Like · 2</button></aevko-bubble
                  >
                </div>
              }
              @case ('message') {
                <aevko-message>
                  <aevko-avatar aevkoMessageVisual alt="Ada Lovelace" fallback="AL" size="2.5rem" />
                  <strong aevkoMessageAuthor>Ada Lovelace</strong>
                  <time aevkoMessageMeta datetime="2026-10-29T10:42:00-03:00">10:42</time>
                  <aevko-bubble variant="muted">The registry build passed.</aevko-bubble>
                  <button aevkoMessageAction type="button">Reply</button>
                </aevko-message>
              }
              @case ('trace') {
                <aevko-trace label="Deployment trace">
                  <aevko-trace-item state="complete">
                    <strong aevkoTraceTitle>Build</strong><time aevkoTraceTime>10:40</time>
                    Completed successfully
                  </aevko-trace-item>
                  <aevko-trace-item state="running">
                    <strong aevkoTraceTitle>Deploy</strong><time aevkoTraceTime>10:42</time>
                    Running now
                  </aevko-trace-item>
                  <aevko-trace-item state="pending">
                    <strong aevkoTraceTitle>Verify</strong><span aevkoTraceTime>Pending</span>
                    Waiting for deployment
                  </aevko-trace-item>
                </aevko-trace>
              }
              @case ('checkbox') {
                <div class="control-stack">
                  <label class="control-row">
                    <input aevkoCheckbox type="checkbox" checked /> Accept terms and conditions
                  </label>
                  <small>Required before creating the workspace.</small>
                </div>
              }
              @case ('switch') {
                <label class="control-row">
                  <input aevkoSwitch type="checkbox" checked /> Enable project notifications
                </label>
              }
              @case ('radio-group') {
                <fieldset aevkoRadioGroup>
                  <legend>Interface density</legend>
                  <label class="control-row">
                    <input
                      aevkoRadioGroupItem
                      type="radio"
                      name="density"
                      value="default"
                      checked
                    />
                    Default
                  </label>
                  <label class="control-row">
                    <input aevkoRadioGroupItem type="radio" name="density" value="comfortable" />
                    Comfortable
                  </label>
                  <label class="control-row">
                    <input aevkoRadioGroupItem type="radio" name="density" value="compact" />
                    Compact
                  </label>
                </fieldset>
              }
              @case ('toggle-group') {
                <aevko-toggle-group label="Text alignment" type="single">
                  <button aevkoToggleGroupItem value="left">Left</button>
                  <button aevkoToggleGroupItem value="center">Center</button>
                  <button aevkoToggleGroupItem value="right">Right</button>
                </aevko-toggle-group>
              }
              @case ('input-group') {
                <div class="control-stack">
                  <label for="demo-website">Website</label>
                  <aevko-input-group>
                    <input aevkoInputGroupControl id="demo-website" placeholder="example.com" />
                    <aevko-input-group-addon>https://</aevko-input-group-addon>
                    <button aevkoInputGroupButton type="button">Copy</button>
                  </aevko-input-group>
                </div>
              }
              @case ('input-otp') {
                <div class="control-stack">
                  <span>Verification code</span>
                  <aevko-input-otp label="Verification code" [maxLength]="6" />
                  <small>Paste the six-character code sent to your email.</small>
                </div>
              }
              @case ('slider') {
                <div class="control-stack slider-demo">
                  <label for="demo-volume">Volume</label>
                  <input aevkoSlider id="demo-volume" type="range" min="0" max="100" value="64" />
                  <small>64%</small>
                </div>
              }
              @case ('message-scroller') {
                <aevko-message-scroller class="message-scroller-demo" label="Project conversation">
                  <aevko-message-scroller-item messageId="m1">
                    <aevko-bubble variant="muted">Can we ship the registry update?</aevko-bubble>
                  </aevko-message-scroller-item>
                  <aevko-message-scroller-item messageId="m2" [scrollAnchor]="true">
                    <aevko-bubble align="end">The verification suite is running.</aevko-bubble>
                  </aevko-message-scroller-item>
                  <aevko-message-scroller-item messageId="m3">
                    <aevko-bubble variant="muted">All consumer builds passed.</aevko-bubble>
                  </aevko-message-scroller-item>
                  <aevko-message-scroller-item messageId="m4">
                    <aevko-bubble align="end">Ready for review.</aevko-bubble>
                  </aevko-message-scroller-item>
                </aevko-message-scroller>
              }
              @case ('tabs') {
                <aevko-tabs label="Project views" id="project-tabs">
                  <aevko-tabs-list>
                    <button aevkoTabsTrigger value="overview">Overview</button>
                    <button aevkoTabsTrigger value="activity">Activity</button>
                    <button aevkoTabsTrigger value="settings">Settings</button>
                  </aevko-tabs-list>
                  <aevko-tabs-content value="overview"
                    >Key metrics and recent project activity.</aevko-tabs-content
                  >
                  <aevko-tabs-content value="activity"
                    >Changes from the last seven days.</aevko-tabs-content
                  >
                  <aevko-tabs-content value="settings">Workspace preferences.</aevko-tabs-content>
                </aevko-tabs>
              }
              @case ('code-block') {
                <aevko-code-block>
                  <aevko-code-block-header>
                    app.component.ts
                    <button aevkoCodeBlockCopy [value]="codeBlockDemo"></button>
                  </aevko-code-block-header>
                  <aevko-code-block-content
                    [code]="codeBlockDemo"
                    language="typescript"
                    [lineNumbers]="true"
                  />
                </aevko-code-block>
              }
              @case ('chart') {
                <aevko-chart
                  label="Monthly revenue"
                  description="January through April"
                  [series]="chartSeries"
                >
                  <svg
                    aevkoChartVisual
                    class="chart-demo"
                    viewBox="0 0 400 180"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      points="10,150 130,105 260,120 390,35"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                  </svg>
                  <table aevkoChartData class="chart-data">
                    <caption>
                      Monthly revenue values
                    </caption>
                    <tbody>
                      <tr>
                        <th scope="row">January</th>
                        <td>$12k</td>
                      </tr>
                      <tr>
                        <th scope="row">April</th>
                        <td>$24k</td>
                      </tr>
                    </tbody>
                  </table>
                </aevko-chart>
              }
              @case ('data-table') {
                <aevko-data-table
                  caption="Recent invoices"
                  [rows]="dataTableRows"
                  [columns]="dataTableColumns"
                  [rowKey]="invoiceKey"
                  [selectable]="true"
                />
              }
              @case ('dialog') {
                <aevko-dialog
                  title="Edit workspace"
                  description="Give your team a name it will recognize."
                  initialFocus="#dialog-name"
                >
                  <button aevkoDialogTrigger type="button">Edit workspace</button>
                  <label for="dialog-name">Workspace name</label>
                  <input id="dialog-name" value="Aevko Studio" />
                  <div class="button-row">
                    <button aevkoDialogClose type="button">Cancel</button
                    ><button aevkoDialogClose type="button">Save changes</button>
                  </div>
                </aevko-dialog>
              }
              @case ('alert-dialog') {
                <aevko-alert-dialog
                  title="Delete workspace?"
                  description="This permanently removes the workspace and its shared data."
                  initialFocus="#keep-workspace"
                >
                  <button aevkoAlertDialogTrigger type="button">Delete workspace</button>
                  <div class="button-row">
                    <button id="keep-workspace" aevkoAlertDialogClose type="button">
                      Keep workspace</button
                    ><button aevkoAlertDialogClose type="button">Delete workspace</button>
                  </div>
                </aevko-alert-dialog>
              }
              @case ('drawer') {
                <aevko-drawer
                  title="Project filters"
                  description="Narrow the projects shown in this workspace."
                >
                  <button aevkoDrawerTrigger type="button">Open filters</button>
                  <label><input type="checkbox" checked /> Active projects</label>
                  <div class="button-row">
                    <button aevkoDrawerClose type="button">Apply filters</button>
                  </div>
                </aevko-drawer>
              }
              @case ('sheet') {
                <aevko-sheet
                  title="Workspace settings"
                  description="Update details for this workspace."
                  side="right"
                  initialFocus="#sheet-name"
                >
                  <button aevkoSheetTrigger type="button">Open settings</button>
                  <label for="sheet-name">Workspace name</label
                  ><input id="sheet-name" value="Aevko Studio" />
                  <div class="button-row">
                    <button aevkoSheetClose type="button">Save changes</button>
                  </div>
                </aevko-sheet>
              }
              @case ('popover') {
                <aevko-popover label="Workspace options"
                  ><button aevkoPopoverTrigger type="button">Open options</button>
                  <div>
                    <strong>Workspace options</strong>
                    <p>Choose a compact preference.</p>
                    <button aevkoPopoverClose type="button">Done</button>
                  </div></aevko-popover
                >
              }
              @case ('hover-card') {
                <aevko-hover-card [delay]="0" [closeDelay]="0"
                  ><a aevkoHoverCardTrigger href="#maintainer">Ada Lovelace</a>
                  <div>
                    <strong>Ada Lovelace</strong>
                    <p>Maintainer of the analytical workspace.</p>
                  </div></aevko-hover-card
                >
              }
              @case ('tooltip') {
                <aevko-tooltip [delay]="0"
                  ><button aevkoTooltipTrigger type="button" aria-label="Save workspace">
                    Save</button
                  ><span>Save workspace</span></aevko-tooltip
                >
              }
              @case ('toast') {
                <button
                  type="button"
                  (click)="
                    toast.show('Workspace saved', {
                      description: 'Your changes are now available.',
                      tone: 'success',
                      duration: 0,
                    })
                  "
                >
                  Show toast</button
                ><aevko-toaster />
              }
              @case ('command') {
                <aevko-command label="Project commands" [items]="commandItems" />
              }
              @case ('dropdown-menu') {
                <aevko-dropdown-menu label="Account actions"
                  ><button aevkoDropdownMenuTrigger type="button">Open menu</button
                  ><button aevkoDropdownMenuItem type="button">Profile</button
                  ><button aevkoDropdownMenuItem type="button">Billing</button
                  ><button aevkoDropdownMenuItem type="button">
                    Sign out
                  </button></aevko-dropdown-menu
                >
              }
              @case ('context-menu') {
                <aevko-context-menu label="Canvas actions"
                  ><div aevkoContextMenuTrigger class="demo-box">Right click this project card</div>
                  <button aevkoContextMenuItem type="button">Duplicate</button
                  ><button aevkoContextMenuItem type="button">Archive</button></aevko-context-menu
                >
              }
              @case ('menubar') {
                <aevko-menubar label="Application menu"
                  ><button aevkoMenubarItem type="button">File</button
                  ><button aevkoMenubarItem type="button">Edit</button
                  ><button aevkoMenubarItem type="button">View</button></aevko-menubar
                >
              }
              @case ('navigation-menu') {
                <aevko-navigation-menu label="Primary"
                  ><a href="#docs">Docs</a><a href="#components">Components</a
                  ><a href="#themes">Themes</a></aevko-navigation-menu
                >
              }
              @case ('calendar') {
                <aevko-calendar label="Choose deployment date" month="2026-10" value="2026-10-30" />
              }
              @case ('combobox') {
                <aevko-combobox
                  label="Framework"
                  [items]="frameworks"
                  placeholder="Select a framework"
                />
              }
              @case ('date-picker') {
                <aevko-date-picker
                  label="Deployment date"
                  month="2026-10"
                  placeholder="Pick a deployment date"
                />
              }
              @case ('questionnaire') {
                <aevko-questionnaire label="Project brief" [items]="questions" />
              }
              @case ('select') {
                <aevko-select label="Theme" [items]="themes" placeholder="Select a theme" />
              }
              @case ('card') {
                <aevko-card class="custom-card"
                  ><aevko-card-header
                    ><aevko-card-title>Design system</aevko-card-title
                    ><aevko-card-description
                      >Local source, ready to adapt.</aevko-card-description
                    ></aevko-card-header
                  ><aevko-card-content
                    >Change tokens or edit the template directly.</aevko-card-content
                  ><aevko-card-footer>Updated today</aevko-card-footer></aevko-card
                >
              }
              @case ('carousel') {
                <aevko-carousel label="Project highlights"
                  ><svg
                    lucideChevronLeft
                    aevkoCarouselPreviousIcon
                    class="docs-icon"
                    aria-hidden="true"
                  ></svg
                  ><svg
                    lucideChevronRight
                    aevkoCarouselNextIcon
                    class="docs-icon"
                    aria-hidden="true"
                  ></svg
                  ><aevko-carousel-slide label="Slide 1 of 2"
                    ><div class="demo-media">Own your code</div></aevko-carousel-slide
                  ><aevko-carousel-slide label="Slide 2 of 2"
                    ><div class="demo-media">Accessible by default</div></aevko-carousel-slide
                  ></aevko-carousel
                >
              }
              @case ('collapsible') {
                <aevko-collapsible label="Project details"
                  ><svg
                    lucideChevronRight
                    aevkoCollapsibleIcon
                    class="docs-icon"
                    aria-hidden="true"
                  ></svg
                  >Local, editable Angular source.</aevko-collapsible
                >
              }
              @case ('direction') {
                <div aevkoDirection="rtl" class="demo-box">واجهة من اليمين إلى اليسار</div>
              }
              @case ('empty') {
                <aevko-empty
                  ><svg lucideFolderOpen aevkoEmptyIcon class="docs-icon" aria-hidden="true"></svg
                  ><strong aevkoEmptyTitle>No projects</strong
                  ><span aevkoEmptyDescription>Create one when you are ready.</span
                  ><button aevkoEmptyAction type="button">Create project</button></aevko-empty
                >
              }
              @case ('field') {
                <aevko-field>
                  <label aevkoFieldLabel for="demo-email">Email address</label>
                  <input
                    aevkoInput
                    id="demo-email"
                    type="email"
                    aria-describedby="demo-email-help"
                  />
                  <span aevkoFieldDescription id="demo-email-help"
                    >We only use this for project updates.</span
                  >
                </aevko-field>
              }
              @case ('input') {
                <label aevkoLabel for="demo-name">Project name</label>
                <input aevkoInput id="demo-name" placeholder="Aevko Studio" />
              }
              @case ('item') {
                <aevko-item variant="outline"
                  ><svg lucidePackageOpen aevkoItemIcon class="docs-icon" aria-hidden="true"></svg
                  ><strong aevkoItemTitle>Design system</strong
                  ><span aevkoItemDescription>Updated today</span
                  ><button aevkoItemAction type="button">Open</button></aevko-item
                >
              }
              @case ('label') {
                <label aevkoLabel for="demo-labelled">Workspace name</label>
                <input aevkoInput id="demo-labelled" value="Design system" />
              }
              @case ('native-select') {
                <label aevkoLabel for="demo-role">Role</label>
                <select aevkoNativeSelect id="demo-role">
                  <option>Designer</option>
                  <option>Developer</option>
                </select>
              }
              @case ('resizable') {
                <aevko-resizable
                  ><div aevkoResizableFirst class="demo-panel">Navigation</div>
                  <div aevkoResizableSecond class="demo-panel">Canvas</div></aevko-resizable
                >
              }
              @case ('scroll-area') {
                <aevko-scroll-area class="demo-scroll"
                  ><p>Native scrolling</p>
                  <p>Keyboard and touch</p>
                  <p>Visible focus</p>
                  <p>Optional scrollbar</p></aevko-scroll-area
                >
              }
              @case ('separator') {
                <div class="separator-demo">
                  <span>Before</span><aevko-separator /><span>After</span>
                </div>
              }
              @case ('sidebar') {
                <aevko-sidebar label="Demo navigation"
                  ><svg lucideMenu aevkoSidebarMenuIcon class="docs-icon" aria-hidden="true"></svg
                  ><svg
                    lucideChevronLeft
                    aevkoSidebarCollapseIcon
                    class="docs-icon"
                    aria-hidden="true"
                  ></svg
                  ><svg
                    lucideChevronRight
                    aevkoSidebarExpandIcon
                    class="docs-icon"
                    aria-hidden="true"
                  ></svg
                  ><strong aevkoSidebarHeader>Aevko</strong><a href="#overview">Overview</a
                  ><a href="#activity">Activity</a
                  ><small aevkoSidebarFooter>Workspace</small></aevko-sidebar
                >
              }
              @case ('textarea') {
                <label aevkoLabel for="demo-notes">Project notes</label>
                <textarea aevkoTextarea id="demo-notes" autoResize>Editable local source.</textarea>
              }
              @case ('table') {
                <div aevkoTableContainer label="Recent invoices">
                  <table aevkoTable>
                    <caption aevkoTableCaption>
                      A list of recent invoices.
                    </caption>
                    <thead aevkoTableHeader>
                      <tr aevkoTableRow>
                        <th aevkoTableHead scope="col">Invoice</th>
                        <th aevkoTableHead scope="col">Status</th>
                        <th aevkoTableHead scope="col">Method</th>
                        <th aevkoTableHead scope="col" class="amount">Amount</th>
                      </tr>
                    </thead>
                    <tbody aevkoTableBody>
                      @for (invoice of invoices; track invoice.id) {
                        <tr aevkoTableRow>
                          <td aevkoTableCell>{{ invoice.id }}</td>
                          <td aevkoTableCell>{{ invoice.status }}</td>
                          <td aevkoTableCell>{{ invoice.method }}</td>
                          <td aevkoTableCell class="amount">{{ invoice.amount }}</td>
                        </tr>
                      }
                    </tbody>
                    <tfoot aevkoTableFooter>
                      <tr aevkoTableRow>
                        <td aevkoTableCell colspan="3">Total</td>
                        <td aevkoTableCell class="amount">$2,500.00</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              }
            }
          </div>
          <div class="example-code">
            <aevko-code-editor
              [value]="current.code"
              language="html"
              filename="example.component.html"
              label="Angular component usage"
            />
          </div>
        </section>
        <h2>Installation</h2>
        <aevko-code-editor
          [value]="current.command"
          [packageCommand]="'add ' + slug() + ' --yes'"
          language="shell"
          filename="Terminal"
          label="Component installation command"
        />
        <section class="documentation-panel">
          <p class="eyebrow">Source ownership</p>
          <h2>Customization</h2>
          <p class="documentation-intro">{{ customizationNote() }}</p>
          <div class="guide-points">
            <div>
              <strong>Edit locally</strong>
              <span
                >The installed template and stylesheet are application code, not a black box.</span
              >
            </div>
            <div>
              <strong>Theme semantically</strong>
              <span
                >Override <code>--aevko-*</code> tokens or ordinary classes without
                <code>!important</code>.</span
              >
            </div>
            @if (hasProjectedSlots()) {
              <div>
                <strong>Compose freely</strong>
                <span>Slots accept native elements, SVG, images or Angular components.</span>
              </div>
            }
          </div>
        </section>
        <h2>API reference</h2>
        <div aevkoTableContainer [label]="current.title + ' API reference'" class="api-table-wrap">
          <table aevkoTable class="api-table">
            <thead aevkoTableHeader>
              <tr aevkoTableRow>
                <th aevkoTableHead scope="col">Property or slot</th>
                <th aevkoTableHead scope="col">Type</th>
                <th aevkoTableHead scope="col">Default</th>
                <th aevkoTableHead scope="col">Description</th>
              </tr>
            </thead>
            <tbody aevkoTableBody>
              @for (entry of apiRows(); track entry.name) {
                <tr aevkoTableRow>
                  <th aevkoTableHead scope="row">
                    <code>{{ entry.name }}</code>
                  </th>
                  <td aevkoTableCell>
                    <code>{{ entry.type }}</code>
                  </td>
                  <td aevkoTableCell>
                    <code>{{ entry.defaultValue }}</code>
                  </td>
                  <td aevkoTableCell>{{ entry.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <section class="documentation-panel accessibility-panel">
          <p class="eyebrow">Accessibility contract</p>
          <h2>Accessibility</h2>
          <div class="accessibility-grid">
            <div>
              <h3>Included behavior</h3>
              <ul class="documentation-list">
                @for (note of accessibilityNotes(); track note) {
                  <li>{{ note }}</li>
                }
              </ul>
            </div>
            <div>
              <h3>Your responsibility</h3>
              <p>{{ consumerResponsibility() }}</p>
            </div>
          </div>
        </section>
        <a class="text-link" routerLink="/components">Back to all components</a>
      </article>
    } @else {
      <section class="page-narrow section"><h1>Component not found</h1></section>
    }
  `,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly toast = inject(AevkoToastStore);
  protected readonly commandItems = [
    { id: 'new', label: 'Create project', description: 'Start a new workspace', shortcut: '⌘N' },
    {
      id: 'search',
      label: 'Search projects',
      description: 'Find an existing project',
      shortcut: '⌘K',
    },
    { id: 'settings', label: 'Open settings', description: 'Manage workspace preferences' },
  ];
  protected readonly frameworks = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ];
  protected readonly themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];
  protected readonly questions = [
    {
      name: 'scope',
      prompt: 'What should the agent build next?',
      description: 'Choose one direction.',
      required: true,
      choices: [
        { value: 'component', label: 'A component' },
        { value: 'feature', label: 'A complete feature' },
      ],
    },
    {
      name: 'checks',
      prompt: 'What should verification include?',
      multiple: true,
      skippable: true,
      choices: [
        { value: 'tests', label: 'Automated tests' },
        { value: 'a11y', label: 'Accessibility review' },
      ],
    },
  ];
  protected readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );
  protected readonly doc = computed(() => componentDocs[this.slug() as keyof typeof componentDocs]);
  protected readonly apiRows = computed(
    () => componentApi[this.slug() as keyof typeof componentApi] ?? [],
  );
  protected readonly hasProjectedSlots = computed(() =>
    this.apiRows().some((entry) => entry.type.includes('projected')),
  );
  protected readonly customizationNote = computed(
    () => customizationGuidance[this.slug() as keyof typeof customizationGuidance] ?? '',
  );
  protected readonly consumerResponsibility = computed(
    () => consumerResponsibilities[this.slug() as keyof typeof consumerResponsibilities] ?? '',
  );
  protected readonly accessibilityNotes = computed(() =>
    (this.doc()?.accessibility ?? '')
      .split('.')
      .map((note) => note.trim())
      .filter(Boolean)
      .map((note) => `${note}.`),
  );
  protected readonly accordionItems = [
    { id: 'ownership', label: 'Own your code', content: 'The source is installed in your app.' },
    {
      id: 'accessibility',
      label: 'Accessibility',
      content: 'Semantics and keyboard behavior are included.',
    },
  ];
  protected readonly invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
  ];
  protected readonly codeBlockDemo = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Aevko UI</h1>',
})
export class App {}`;
  protected readonly chartSeries = [{ key: 'revenue', label: 'Revenue' }];
  protected readonly dataTableRows = [
    { id: 'INV-001', customer: 'Olivia Martin', status: 'Paid', amount: '$240.00' },
    { id: 'INV-002', customer: 'Noah Williams', status: 'Pending', amount: '$190.00' },
    { id: 'INV-003', customer: 'Emma Wilson', status: 'Paid', amount: '$320.00' },
    { id: 'INV-004', customer: 'Liam Brown', status: 'Draft', amount: '$90.00' },
  ];
  protected readonly dataTableColumns = [
    {
      key: 'invoice',
      header: 'Invoice',
      value: (row: (typeof this.dataTableRows)[number]) => row.id,
      sortable: true,
    },
    {
      key: 'customer',
      header: 'Customer',
      value: (row: (typeof this.dataTableRows)[number]) => row.customer,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      value: (row: (typeof this.dataTableRows)[number]) => row.status,
    },
    {
      key: 'amount',
      header: 'Amount',
      value: (row: (typeof this.dataTableRows)[number]) => row.amount,
      align: 'end' as const,
    },
  ];
  protected readonly invoiceKey = (row: (typeof this.dataTableRows)[number]) => row.id;
}

@Component({
  standalone: true,
  imports: [CodeEditor],
  template: `<article class="article page-narrow">
    <p class="eyebrow">Documentation / Theming</p>
    <h1>A neutral scale with a precise job.</h1>
    <p class="lede">Monochrome semantic variables stay quiet so consumer brands can lead.</p>
    <div class="swatches large">
      <span class="black">#09090B</span><span class="graphite">#18181B</span
      ><span class="gray">#A1A1AA</span><span class="light-gray">#F4F4F5</span
      ><span class="white">#FFFFFF</span>
    </div>
    <h2>Semantic tokens</h2>
    <aevko-code-editor
      [value]="tokens"
      language="css"
      filename="styles.css"
      label="Aevko semantic tokens"
    />
    <h2>Dark mode</h2>
    <p>
      Apply <code>data-theme="dark"</code> to the document element and coordinate the initial SSR
      theme.
    </p>
    <h2>Shape and spacing</h2>
    <p>
      Commissioner, a 4 px rhythm, 16 px body copy, 24 px gaps, 44 px controls, square corners and a
      2 px neutral-gray focus outline.
    </p>
  </article>`,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingPage {
  protected readonly tokens = `:root {
  --aevko-background: #ffffff;
  --aevko-foreground: #09090b;
  --aevko-surface: #f4f4f5;
  --aevko-border: #e4e4e7;
  --aevko-focus: #a1a1aa;
  --aevko-radius: 0;
}`;
}

@Component({
  standalone: true,
  imports: [AevkoButton, CodeEditor, LucideExternalLink, LucideSave],
  template: `<article class="article page-narrow">
    <p class="eyebrow">Documentation / Icons</p>
    <h1>Icons are optional content.</h1>
    <p class="lede">
      Aevko uses Lucide in its own documentation, while installed components remain independent of
      every icon library.
    </p>
    <section class="icon-demo" aria-label="Button icon examples">
      <button aevkoButton>
        <svg lucideSave aevkoButtonIconStart class="docs-icon" aria-hidden="true"></svg>
        Save changes
      </button>
      <button aevkoButton variant="outline">Continue without icon</button>
      <a class="button-link" href="https://lucide.dev" target="_blank" rel="noreferrer">
        Lucide docs<svg lucideExternalLink class="docs-icon" aria-hidden="true"></svg>
      </a>
    </section>
    <h2>Static Lucide import</h2>
    <p>
      Install Lucide only in the application that renders it. Import each standalone icon directly
      for tree-shaking; do not register the complete collection.
    </p>
    <aevko-code-editor
      [value]="lucideTypeScript"
      language="typescript"
      filename="save-button.component.ts"
      label="Lucide standalone icon import"
    />
    <aevko-code-editor
      [value]="lucideTemplate"
      language="html"
      filename="save-button.component.html"
      label="Lucide icon projected into an Aevko button"
    />
    <h2>SVG or another library</h2>
    <p>
      Slot attributes describe placement, not implementation. The same slot accepts inline SVG,
      Tabler, Heroicons, an image or a custom Angular component.
    </p>
    <aevko-code-editor
      [value]="customSvg"
      language="html"
      filename="custom-icon.component.html"
      label="Custom SVG projected into an Aevko button"
    />
    <h2>Styling and accessibility</h2>
    <p>
      Documentation icons use 16 px, 1.75 stroke width, currentColor and inline alignment. Override
      size and color with Tailwind or your own class. Decorative icons stay aria-hidden; icon-only
      controls still need an accessible name.
    </p>
    <p>
      Running <code>npx aevko-ui@latest add button</code>, <code>dialog</code> or
      <code>sidebar</code> never installs <code>&#64;lucide/angular</code>.
    </p>
  </article>`,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsPage {
  protected readonly lucideTypeScript = `import { Component } from '@angular/core';
import { LucideSave } from '@lucide/angular';
import { AevkoButton } from './ui/button';

@Component({
  standalone: true,
  imports: [AevkoButton, LucideSave],
  templateUrl: './save-button.component.html',
})
export class SaveButtonComponent {}`;
  protected readonly lucideTemplate = `<button aevkoButton>
  <svg lucideSave aevkoButtonIconStart class="size-4" aria-hidden="true"></svg>
  Save changes
</button>`;
  protected readonly customSvg = `<button aevkoButton variant="outline">
  <svg aevkoButtonIconStart class="size-5 text-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="..." fill="currentColor" />
  </svg>
  Custom icon
</button>`;
}

@Component({
  standalone: true,
  imports: [CodeEditor],
  template: `<article class="article page-narrow">
    <p class="eyebrow">Documentation / CLI</p>
    <h1>Add source. Inspect changes. Stay in control.</h1>
    <p class="lede">The CLI manages source and is never a component runtime.</p>
    <h2>Commands</h2>
    <aevko-code-editor
      [value]="commands"
      language="shell"
      filename="Terminal"
      label="Aevko CLI commands"
    />
    <h2>Safe conflicts</h2>
    <p>
      Customized files stop with exit code 2. Use <code>--diff</code> to inspect and
      <code>--overwrite</code> only after review. <code>--yes</code> never implies overwrite.
    </p>
    <h2>Registry schema</h2>
    <p>
      Schema v1 declares files, compatibility and dependencies. HTTPS responses are size-limited and
      items carry a SHA-256 digest.
    </p>
  </article>`,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CliPage {
  protected readonly commands = `npx aevko-ui@latest init --dry-run
npx aevko-ui@latest add button card
npx aevko-ui@latest list
npx aevko-ui@latest diff button`;
}

@Component({
  standalone: true,
  template: `<article class="article page-narrow">
    <p class="eyebrow">Project</p>
    <h1>Contributing and changelog</h1>
    <p>
      Use the declared Node and pnpm versions. Component work must include registry metadata, docs,
      tests and an isolated consumer build.
    </p>
    <h2>Unreleased</h2>
    <p>
      Phase 0 foundation: Angular 22 workspace, registry schema, CLI and the first source-owned
      components.
    </p>
  </article>`,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContributingPage {}
