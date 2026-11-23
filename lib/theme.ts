// Light/dark choice: stored in localStorage and applied as data-theme on <html>.
// No choice means the site follows the reader's system setting.

export const THEME_KEY = 'theme';

/** Runs in <head> before the page paints, so a saved theme never flashes the other one first. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
