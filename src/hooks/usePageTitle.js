/**
 * usePageTitle — sets the document <title> on mount.
 * Pattern: "Page Name · CreatorHQ"
 */
import { useEffect } from 'react';

export function usePageTitle(pageName) {
  useEffect(() => {
    const prev = document.title;
    document.title = pageName ? `${pageName} · CreatorHQ` : 'CreatorHQ — Your Creator Command Center';
    return () => { document.title = prev; };
  }, [pageName]);
}
