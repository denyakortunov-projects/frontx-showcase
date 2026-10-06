/**
 * UIKit Elements Categories
 *
 * The showcase covers `@gears-frontx/ui-kit`'s published surface and nothing
 * else: every element below maps to exactly one exported component, and the kit
 * exports no component that is missing here. An entry with no component behind
 * it would be a promise the template cannot keep — a reader copying this
 * scaffold takes the list as the inventory it is allowed to build from.
 */
export declare const CATEGORIES: {
    readonly layout: "layout";
    readonly navigation: "navigation";
    readonly forms: "forms";
    readonly actions: "actions";
    readonly feedback: "feedback";
    readonly dataDisplay: "data_display";
    readonly overlays: "overlays";
};
export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
/**
 * Mapping of categories to their elements.
 * Each element maps to an ID used in translation keys and DOM element IDs.
 */
export declare const CATEGORY_ELEMENTS: Record<Category, string[]>;
