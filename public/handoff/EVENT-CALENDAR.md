# Integrate EventCalendar

Status: source component for developer review, 5 October 2026. Not a published FrontX export or accepted platform API. No backend, permissions, external-calendar synchronization or real event service is included.

## Start here

1. Download `frontx-calendar-components.zip` from the Event calendar → Integration tab. Copy `calendar/` into your existing React app, preserving the directory. `calendar/index.ts` is the entry point. `calendar/examples/ControlledCalendar.tsx` is a compiling controlled-state recipe.
2. Use React 19. The tested versions are listed in `dependencies.json`: FrontX UI Kit 0.4.0-alpha.5, FullCalendar core/react/timegrid/daygrid/interaction/luxon3 6.1.21, Luxon 3.7.2, temporal-polyfill 1.0.5 and lucide-react 1.33.0. Install through your normal registry access; no credentials are part of this handoff. Keep all FullCalendar modules on the same version.
3. Once in your app entry import `@gears-frontx/ui-kit/theme.css`. Your normal FrontX theme tokens then apply. Calendar styling imports itself through EventCalendar.tsx. No Tailwind build or Showcase `style.css`, `main.tsx`, fixtures, URL adapter or navigation shell is required. Use a client-side component boundary in SSR frameworks; browser layout and interactions must run on the client.
4. Render the example inside a container with a defined width. Height defaults to 640px; widths below 620px adapt to a list. `density` changes spacing independently of width and height.
5. Replace the example's in-memory save/delete with your adapter and router guard. Do not copy the fixed example clock into a live product: omit `now` for current time, or supply a host clock.

```tsx
import '@gears-frontx/ui-kit/theme.css';
import { EventCalendar, type CalendarEvent, type CalendarPosition } from './calendar';

<EventCalendar
  events={events}
  position={position}
  onPositionChange={setPosition}
  onSave={saveEvent}
  onDelete={deleteEvent}
  timeZone="Asia/Singapore"
  height={640}
/>
```

The snippet uses host-owned variables; the accompanying ControlledCalendar.tsx defines them and can be compiled directly. The live Showcase uses this same component source.

## Ownership and event data

| Concern | Component | Consuming application |
| --- | --- | --- |
| Rendering | Day/Week/Month/Year, narrow list, editor/details, colour | Container, theme and initial position |
| Events | Displays the supplied array and validates editor input | Loading, storage, authorization, updates after successful mutation |
| Navigation | Requests position changes and exposes a dirty/pending guard | Router, URLs, Back/Forward; await guard before changing route/unmounting |
| Time | Displays instants in `timeZone`; explicit DST gap/fold validation | Valid instants/IANA zones, date-only fields, current clock |
| Extensions | `renderEventExtra(event)` in details/list | Product meaning and extra content |

Timed event: `{ id, title, allDay:false, start, end, timeZone, color?, description? }`. `start/end` are ISO instants with Z or numeric offset. All-day event: `{ id, title, allDay:true, startDate, endDate, color?, description? }`; dates are YYYY-MM-DD and endDate is EXCLUSIVE. The form shows an inclusive last day. Keep date-only values as dates, not UTC midnight instants.

Colours are `accent | blue | teal | violet | amber | rose`; optional defaults to the theme. They carry no product/status meaning. IDs must be unique and stable; new events start with a client UUID. If your backend replaces IDs, reconcile the event and `position.selectedId` together. No schema migration or server adapter is supplied.

Position: `{ date:'2026-10-05', view:'week', agendaSpan:'week', selectedId:null }`. Main views are day/week/month/year; agenda is retained for legacy consumers and narrow-list adaptation. `onPositionChange` must update controlled state.

## Mutations, guards and errors

`onSave(event)` and `onDelete(id)` may return void or Promise<void>. The component awaits and catches both callbacks internally. Update the host array on success. Throw/reject on failure; the editor retains its draft and shows the adapter error. Do not optimistically remove data without your own rollback. The component prevents duplicate submissions and guarded navigation during pending mutations. Supply safe, user-readable error messages.

Use a stable `registerNavigationGuard` callback (useCallback). Store the registered function in a ref; await it before your router changes location or unmounts the component. `false` means stay; `true` means the component permits leaving. The React example demonstrates this with Leave calendar. Full routing/Back integration remains your responsibility; Showcase navigation.ts is an optional reference, not part of the reusable component. A forced unmount cannot preserve a draft for you.

`readOnly` disables mutations. Omitting `onSave` disables create/edit; omitting `onDelete` disables delete. `state` is ready/loading/empty/error; provide `onRetry` for error recovery. Client read-only UI is not server authorization.

## Check before integrating into a product

- Compile against the pinned versions and verify CSS chunk handling. No Showcase globals should be needed.
- Exercise create/edit/delete and rejected/slow mutations with your adapter. Check stable IDs and selected entity after save/delete.
- Integrate and test dirty/pending routing, Back/Forward and forced navigation. Persist drafts separately if the product requires it.
- Test all-day exclusive end, overnight events and DST gap/fold in your supported zones.
- Test light/dark, keyboard/focus, 280/360/640px containers, read-only/error/loading and overlap access.
- English UI labels are currently fixed; `locale` only affects date formatting, with some Year captions still English. Full translation needs a future strings contract.
- Recurrence, drag/resize, invitations, resources, attachments, backend sync and platform permissions are intentionally outside this component.

Local isolated consumer evidence is in `qa/component-handoff/` of the full source archive. It proves a bounded integration without Showcase globals, not production readiness or platform-calendar approval.
