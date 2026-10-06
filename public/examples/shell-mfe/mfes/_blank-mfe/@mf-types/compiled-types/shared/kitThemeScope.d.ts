/**
 * Bridge between the host's theme identifier and the token scope
 * `@gears-frontx/ui-kit` selects on.
 *
 * Every kit-styled screen in this package needs the same mapping, so it lives
 * here rather than beside any one of them.
 */
/**
 * Map a host theme identifier onto the token scope `@gears-frontx/ui-kit`
 * understands.
 *
 * The kit scopes its tokens with `data-theme="light" | "dark"`, so a host
 * palette is matched to whichever of the two it is closer to — see
 * {@link DARK_HOST_THEMES} for why the dark side is an enumeration.
 *
 * An unrecognised identifier resolves to the light scope rather than to no
 * scope at all: an element carrying neither value inherits whatever the kit's
 * `prefers-color-scheme` fallback resolved on the shadow host, which is how a
 * screen ends up dark inside a light shell on a developer machine set to dark
 * mode.
 *
 * Two scopes is the whole resolution this bridge can offer. A host theme is a
 * full palette, not a light/dark bit — `dracula` maps to the kit's dark scope
 * and then renders in the kit's greys rather than Dracula's purples. Closing
 * that gap means unifying the two token grammars, a decision above this
 * template.
 *
 * @param hostTheme - Value of the host's shared theme property
 */
export declare function kitThemeScopeFor(hostTheme: string): 'light' | 'dark';
