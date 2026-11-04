import { TestBed } from '@angular/core/testing';
import { AevkoPopover } from '../../../../registry/components/popover';
import { AevkoDropdownMenu } from '../../../../registry/components/dropdown-menu';
import { AevkoContextMenu } from '../../../../registry/components/context-menu';

for (const component of [AevkoPopover, AevkoDropdownMenu, AevkoContextMenu]) {
  describe(`${component.name} dismissal`, () => {
    it('keeps inside interactions open and dismisses outside pointer interactions', () => {
      const fixture = TestBed.createComponent<AevkoPopover | AevkoDropdownMenu | AevkoContextMenu>(
        component,
      );
      fixture.componentRef.setInput('label', 'Actions');
      fixture.componentInstance.open.set(true);
      fixture.detectChanges();
      fixture.nativeElement.dispatchEvent(new Event('pointerdown', { bubbles: true }));
      expect(fixture.componentInstance.open()).toBe(true);
      document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
      expect(fixture.componentInstance.open()).toBe(false);
      fixture.destroy();
    });
    it('dismisses when keyboard focus moves outside', () => {
      const fixture = TestBed.createComponent<AevkoPopover | AevkoDropdownMenu | AevkoContextMenu>(
        component,
      );
      fixture.componentRef.setInput('label', 'Actions');
      fixture.componentInstance.open.set(true);
      fixture.detectChanges();
      document.body.dispatchEvent(new Event('focusin', { bubbles: true }));
      expect(fixture.componentInstance.open()).toBe(false);
      fixture.destroy();
    });
  });
}
