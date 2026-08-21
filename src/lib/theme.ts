// Which routes render on the dark shell. The Header reads this to decide
// whether it is a white bar or a dark one, and the pages themselves read it to
// paint the viewport behind the layout's light body background. Keeping the
// list in one place stops the two from drifting when another page goes dark.
export const DARK_ROUTES = ["/", "/services"] as const;

export function isDarkRoute(path: string | null): boolean {
  return DARK_ROUTES.includes((path ?? "") as (typeof DARK_ROUTES)[number]);
}
