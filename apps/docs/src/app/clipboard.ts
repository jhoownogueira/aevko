/** Copy text from a user action, retaining a fallback for restricted clipboard APIs. */
export async function copyDocumentationText(text: string): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* Try the synchronous browser fallback below. */
  }
  const previous = document.activeElement as HTMLElement | null;
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('aria-label', 'Text to copy');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
    previous?.focus();
  }
}
