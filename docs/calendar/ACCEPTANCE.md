# FrontX Calendar — приёмка реализации

Дата: 5 октября 2026. По структуре свежего [root acceptance template](../../../../docs/qa/future-base-ui-implementation/PIXEL_PERFECT_ACCEPTANCE_CONTRACT.md), адаптировано к существующему FrontX Showcase. Матрица локальной проверки; подробный отчёт: [QA record](../../qa/event-calendar/REPORT.md).

- Реализация: **locally verified**. User design acceptance: **awaiting review**.
- Working baseline: `67605262247b8ca418139f4aaccdd9fff1101d12`; повторно проверен перед P1. Источник существующего оформления — FrontX Showcase и установленный UI Kit `0.4.0-alpha.5`.
- Accepted unreleased delta: исходный дизайн-контракт из этой задачи как направление; новый runtime реализован по прямому запуску Дениса; визуальная приёмка ожидается. Нет нового утверждения визуальной приёмки на основании HEAD.
- Figma: **not selected**. Studio: не затронут, его rebuild и design-contract не требуются.
- Сохраняем: существующие страницы/данные/темы/компактность графиков и старые URL, кроме явно предложенной группировки навигации.
- Новая композиция использует UI Kit; фактические источники: `src/calendar/`, consumer `src/CalendarShowcase.tsx`, интеграция `src/main.tsx`. Импорты подтверждены сборкой и исходниками.
- Publication: **not requested / not deployed**.

## История и актуальная итерация

Матрица ниже относится к первому локальному кандидату (исходный fingerprint указан в `qa/event-calendar/source-manifest.json`). Обратная связь Дениса уточнила визуальное направление, порядок навигации и виды. Текущие изменения и свежая приёмка находятся в [VISUAL-REFRESH.md](VISUAL-REFRESH.md) и `qa/calendar-refresh/REPORT.md`; старые отчёты не выдаются за проверку изменённого кода.

## Обязательные сценарии

Статусы: planned → implemented → verified. У каждой verified-строки должны появиться точный source, команда или сценарий и путь к существующему отчёту/снимку. Дизайнерское отклонение требует записанного решения; его нельзя объявить принятым по усмотрению теста.

| ID | Проверка | Ожидаемый результат | Статус / evidence |
| --- | --- | --- | --- |
| SRC-01 | HEAD/status/чужие файлы | Сохранены исходные изменения; изменён только выделенный scope | verified — baseline.json + source-manifest.json; branch codex/frontx-event-calendar; root unrelated changes preserved |
| ENG-01 | Движок | Лицензия, точные версии, React, темы, zone/DST, размеры проверены в малом примере | verified — ENGINE-DECISION.md, engine-probe.json, model-report.txt and theme/size browser checks |
| CMP-01 | Компоненты | Реальные импорты FrontX и named compositions, без копий примитивов | verified — actual FrontX imports in src/calendar; build-report.txt; no node_modules or kit source edits |
| CMP-02 | Два экземпляра | Независимы по виду, дате, selection и размеру; shared data только явно | verified — browser-report.json: two instances / independent date; embedded.png |
| EVT-01 | New event | Заголовок, диапазон, зона, описание; валидная запись видна во всех видах | verified — browser-report.json: create, URL, cross-view identity; async-report.json |
| EVT-02 | Timed slot | Pointer/keyboard открывают один редактор с правильным временем | verified — browser-report.json: pointer time slot + keyboard timed slot |
| EVT-03 | All-day slot | Правильная дата и all-day; однодневное exclusive end не добавляет день | verified — pointer/keyboard All day and save in browser-report.json; model-report.txt exclusive end |
| EVT-04 | Просмотр / Edit | Разные события дают разные данные, Save меняет именно выбранное | verified — browser-report.json edit; accessibility-report.json correct overflow details + second save |
| EVT-05 | Cancel / Escape / outside | Нет silent save; dirty draft защищён; keep editing сохраняет поля | verified — browser-report.json Cancel/Escape; accessibility-report.json outside click protection |
| EVT-06 | Delete | Подтверждение с названием; отмена ничего не меняет; после удаления фокус виден | verified interactions — browser-report.json delete cancel/confirm/URL; accessibility-report.json: focus returns to Today after deletion |
| EVT-07 | Валидация | Пустой title и end ≤ start запрещены, ошибка у поля, draft сохранён | verified — browser-report.json blank title/negative duration, retained draft and field errors |
| EVT-08 | All-day ↔ timed | В черновике значения времени восстанавливаются; сохранённые модели не смешаны | verified — browser-report.json timed toggle; model-report.txt discriminated event model |
| VIEW-01 | Day/Week | Общая сетка; 30 минут, понедельник, полный день прокручивается | verified — engine configuration plus slot/browser paths, accessibility-report.json night + scroll restore |
| VIEW-02 | Agenda | Наследует диапазон day/week, same IDs и selected event | verified — browser-report.json agenda day range and same id |
| VIEW-03 | Compact | Читаемый текст/фокус, те же данные, без графикового scale/65% | verified — width screenshots, same typed events, compact CSS; no scale transform |
| VIEW-04 | Размеры | 1120×640, 640×640, 360×360, 280 px; внутренний scroll, нет overflow страницы | verified — browser-report.json widths 1120/640/360/280 and forced Week local overflow |
| VIEW-05 | Пять пересечений | Все события доступны, +N работает и с клавиатуры | verified — browser-report.json full five; accessibility-report.json Enter opens list / Discussion 5 details. Date list is explicit design adaptation. |
| TIME-01 | Ночь и длинное all-day | Сегменты через полночь ссылаются на один id; даты all-day не дрейфуют | verified — model-report.txt; accessibility-report.json two night segments / dates; browser all-day fixture |
| TIME-02 | Зоны | Display zone меняет отображение, не момент; source zone видна в деталях | verified — accessibility-report.json display UTC / source Singapore; model-report.txt zone preservation |
| TIME-03 | DST gap/fold | Несуществующее время отвергнуто, двусмысленное разрешается явно | verified — model-report.txt + browser-report.json real gap/fold editor paths |
| TIME-04 | Today/demo clock | Воспроизводимая дата и понятное действие Today; часы не расходятся с fixtures | verified — accessibility-report.json Today uses injected date; visible demo note |
| URL-01 | Deep link/reload | Дата, view, selection, density и fixture восстанавливаются | verified — browser-report.json direct reload / view / width / density fixtures |
| URL-02 | Back/Forward | Selection/диапазон/scroll сохранены; dirty editor не теряется | verified — browser-report.json Back/Forward; accessibility-report.json repeated Back / scroll across views. Host scroll cache also preserves route Back. |
| URL-03 | Невалидные параметры/id | Предсказуемый fallback/Event unavailable, без crash | verified — browser-report.json invalid date and unknown id |
| URL-04 | Смена страницы | Локальные правки живут в сессии; reload limitation объявлена честно | verified — browser-report.json edits survive route changes; visible reload-reset note |
| STATE-01 | Empty/loading/error | Различимые состояния, доступная навигация и recovery; синтетика обозначена | verified — browser-report.json states/retry; accessibility-report.json first event from empty |
| STATE-02 | Read-only / save error | Read-only без мутаций; ошибка сохранения оставляет draft и retry | verified — browser-report.json read-only/save failure; async-report.json reject/retry/pending guard |
| THEME-01 | 5 themes × 2 modes | Читаемы grid/event/selection/form/details; данные и draft не меняются | verified representative states — browser-report.json 5×2 grid/details/editor captures; token contrast report. No exhaustive screen-reader certification. |
| A11Y-01 | Keyboard-only | Все действия доступны, roving grid focus, без сотен Tab stops | verified representative flows — keyboard slots/events/overflow; labelled controls, no per-slot tab stops |
| A11Y-02 | Dialog/Sheet | Имена, focus containment, Escape, focus return | verified editor containment/Escape/details focus return — accessibility-report.json; imported Base UI dialogs |
| A11Y-03 | Контраст/zoom | WCAG AA для текста и значимых состояний; 200% zoom без потери действий | verified bounded checks — 50 text/selection/focus token pairs across 5×2; equivalent 200% layout viewport in accessibility-report.json. Full WCAG certification not claimed. |
| MOTION-01 | Normal/reduced | Открытие/закрытие без скачка; reduced motion не задерживает фокус | verified — core suite reduced motion, accessibility suite normal + reduced editor styles; captures inspected |
| NAV-01 | Новая навигация | 3 раздела; календарь виден, графики не доминируют его sidebar | verified — browser routes + same-size screenshots; three top-level groups |
| REG-01 | Старые страницы | gallery/widget/layouts/modularity/elements/themes/handoff доступны | verified — browser-report.json legacy routes |
| REG-02 | Legacy calendar | `page=widget&widget=calendar` остаётся Revenue pulse | verified — browser-report.json $74,000 Revenue pulse on legacy calendar route |
| REG-03 | Charts/density/themes | Затронутые existing QA проходят, данные и размеры сохранены | verified — regression-density/density-report.json 22; regression-palette/palette-modes-report.json 45 |
| BUILD-01 | TypeScript/build | `npm run build` проходит на финальном source | verified — build-report.txt, TypeScript + Vite; source-manifest.json matches final runtime |
| WEB-01 | Runtime/assets | Нет page errors и отсутствующих assets на проверяемых routes | verified — browser-report.json: zero page errors / HTTP errors across tested routes |
| VIS-01 | Before/after | Same-state baseline/after 1600×1000, намеренные изменения описаны | reviewed locally — baseline-*.png / after-*.png, 1600×1000; deliberate navigation changes. No pixel-perfect claim. |
| VIS-02 | Responsive | 1280×800, 1920×1200, live resize и узкие embedded containers | verified — browser-report.json 1280/1920/390; accessibility-report.json live resize retains draft |
| DOC-01 | Developer usage | Импорты/типы/examples соответствуют фактическому локальному API | verified by source/build inspection — React & contract tab, README, public/handoff; types authoritative |
| DOC-02 | Download/fingerprint | Archive содержит нужные calendar-файлы, без secrets/workspace; source совпадает | verified — archive-report.json; allowlisted source, exact fingerprint and SHA-256; local only |
| REVIEW-01 | Локальное ревью | Review route, доказательства и ограничения представлены пользователю | delivered for local review — ?page=event-calendar; user acceptance pending |

## Фактическая компонентная карта

| Группа | Источник | Варианты / взаимодействия | Consumers / evidence |
| --- | --- | --- | --- |
| Button/Tabs/Calendar/Popover | Installed FrontX UI Kit | Навигация даты/view, New event, состояния/keyboard | EventCalendar.tsx; browser-report.json |
| Field/Input/Textarea/Checkbox/Select | Installed FrontX UI Kit | Значение, ошибка, all-day, зона | EventEditor.tsx; browser-report.json / async-report.json |
| Dialog/Sheet/AlertDialog | Installed FrontX UI Kit | Create/edit/details/delete/discard, focus, reduced motion | EventCalendar.tsx + EventEditor.tsx + CalendarGrid.tsx; accessibility-report.json |
| Toolbar/TimeGrid/AllDayLane/EventItem/Agenda | Новые `src/calendar/` compositions | Day/Week/Agenda, Standard/Compact, hover/selection/focus/readonly | EventCalendar.tsx + CalendarGrid.tsx + calendar.css; width/theme captures |
| CalendarShowcase | Существующий runtime, новая страница | Полный пример, embedded, states, React usage | src/CalendarShowcase.tsx; browser-report.json |
| Site navigation/URL adapter | `src/main.tsx` и выделенные модули при необходимости | Old/new routes, Back, draft guard, theme | src/main.tsx + src/calendar/navigation.ts; Back and legacy route checks |

## Связный сценарий ревью

Components → Calendar → Week → создать событие в свободном слоте → открыть его → Edit → изменить время → Save → Day → Agenda → Compact → открыть то же событие → начать правку → Back → Keep editing → Cancel/Discard → вернуться к исходному виду → переключить тему → открыть компактный независимый пример.

Отдельно проверить all-day creation, Delete cancel/confirm, пустой диапазон и синтетическую ошибку. Выполнить основной путь с клавиатуры. После интеграции записать конкретные fixtures/URL, чтобы другой проверяющий мог повторить его без устных инструкций.

## Формат финального evidence

В `qa/event-calendar/`: source manifest / change list; build/model/browser reports; baseline/after screenshots; state+viewport+theme metadata; дата визуального просмотра; список исправлений и оставшихся ограничений. Проверки не должны перезаписывать старые release reports как будто это новая публикация.

Техническая готовность, пользовательское принятие дизайна и публичный выпуск — три отдельных статуса. Ни один из них не выводится автоматически из другого.
