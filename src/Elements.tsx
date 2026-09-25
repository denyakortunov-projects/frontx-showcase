import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gears-frontx/ui-kit";
import {
  Activity,
  ArrowDownToLine,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Ellipsis,
  Filter,
  Layers,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import "./elements.css";

function Example({
  number,
  title,
  description,
  children,
  className = "",
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`elements-card ${className}`}>
      <header className="elements-card-head">
        <span className="elements-number">{number}</span>
        <div className="elements-card-copy">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      <div className="elements-stage">{children}</div>
    </article>
  );
}

export function Elements() {
  const [activeTab, setActiveTab] = useState("overview");
  const [score, setScore] = useState(64);
  const [notifications, setNotifications] = useState(true);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("weekly");
  const [name, setName] = useState("");
  const [note, setNote] = useState(
    "The updated components are ready for review.",
  );
  const [choice, setChoice] = useState("product");
  const [menuAction, setMenuAction] = useState("Choose an action");
  const [loaded, setLoaded] = useState(false);
  const [buttonAction, setButtonAction] = useState(
    "Primary, secondary, quiet, and icon-only actions",
  );
  const [invited, setInvited] = useState(false);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);
  const [accessEmail, setAccessEmail] = useState("");
  const [accessFeedback, setAccessFeedback] = useState(
    "Only invited people can view this space.",
  );
  const [reviewOpened, setReviewOpened] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filterChoices, setFilterChoices] = useState({
    products: true,
    team: false,
    comments: false,
  });
  const [tableQuery, setTableQuery] = useState("");
  const [tableAscending, setTableAscending] = useState(true);
  const activityRows = [
    {
      project: "Q3 launch plan",
      owner: "Maya",
      state: "On track",
      tone: "success" as const,
    },
    {
      project: "Component library",
      owner: "Jordan",
      state: "In review",
      tone: "warning" as const,
    },
    {
      project: "Research brief",
      owner: "Riley",
      state: "Updated",
      tone: "info" as const,
    },
  ]
    .filter((row) =>
      `${row.project} ${row.owner} ${row.state}`
        .toLowerCase()
        .includes(tableQuery.toLowerCase()),
    )
    .sort((a, b) =>
      tableAscending
        ? a.project.localeCompare(b.project)
        : b.project.localeCompare(a.project),
    );

  const handleCopyLink = async () => {
    const link = `${window.location.origin}${window.location.pathname}?page=elements`;
    try {
      await navigator.clipboard.writeText(link);
      setMenuAction("Showcase link copied");
    } catch {
      setMenuAction("Clipboard access is unavailable in this browser");
    }
  };

  const downloadMockExport = () => {
    const content = JSON.stringify(
      {
        source: "FrontX Showcase",
        report: "Q3 launch plan",
        rows: activityRows,
      },
      null,
      2,
    );
    const href = URL.createObjectURL(
      new Blob([content], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "frontx-showcase-report.json";
    anchor.click();
    URL.revokeObjectURL(href);
    setButtonAction("Synthetic report downloaded as JSON");
  };

  const selectedFilterSummary =
    [
      filterChoices.products && "Product updates",
      filterChoices.team && "Team activity",
      filterChoices.comments && "Comments",
    ]
      .filter(Boolean)
      .join(", ") || "No categories selected";

  const examples = [
    <Example
      number="01"
      title="Buttons"
      description="Clear action hierarchy, icon slots, and useful feedback."
    >
      <div className="elements-row">
        <Button
          onClick={() => setButtonAction("Report created in this local demo")}
          icon={<Plus size={15} />}
        >
          Create report
        </Button>
        <Button
          variant="secondary"
          onClick={() => setButtonAction("Showing report details")}
          icon={<ArrowUpRight size={15} />}
        >
          View details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadMockExport}
          icon={<ArrowDownToLine size={14} />}
        >
          Export JSON
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="More actions"
          onClick={() => setButtonAction("Additional demo actions selected")}
          icon={<Ellipsis size={18} />}
        />
      </div>
      <p className="elements-feedback" aria-live="polite">
        {buttonAction}
      </p>
    </Example>,
    <Example
      number="02"
      title="Status badges"
      description="Readable state labels with a restrained color signal."
    >
      <div className="elements-badge-list">
        <Badge className="elements-status-success" variant="success" dot>
          Published
        </Badge>
        <Badge className="elements-status-warning" variant="warning" dot>
          In review
        </Badge>
        <Badge className="elements-status-danger" variant="danger" dot>
          Action needed
        </Badge>
        <Badge className="elements-status-info" variant="info" dot>
          Synced
        </Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
      <div className="elements-badge-note">
        <span>5 active components</span>
        <span className="elements-trend">
          <Activity size={13} /> Updated just now
        </span>
      </div>
    </Example>,
    <Example
      number="03"
      title="Tabs"
      description="Compact navigation keeps the selected view easy to find."
      className="elements-tabs-example"
    >
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(String(value))}
      >
        <TabsList aria-label="Report views" variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">
            Activity <span className="elements-tab-count">8</span>
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="elements-tab-panel">
            <span className="elements-spark">
              <Sparkles size={16} />
            </span>
            <div>
              <strong>Everything is on track</strong>
              <span>Your workspace summary is up to date.</span>
            </div>
            <ArrowUpRight size={15} />
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <div className="elements-tab-panel">
            <span className="elements-spark">
              <Activity size={16} />
            </span>
            <div>
              <strong>8 recent updates</strong>
              <span>The latest changes are ready to review.</span>
            </div>
            <ArrowUpRight size={15} />
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="elements-tab-panel">
            <span className="elements-spark">
              <Settings2 size={16} />
            </span>
            <div>
              <strong>Workspace preferences</strong>
              <span>Choose how this space works for you.</span>
            </div>
            <ArrowUpRight size={15} />
          </div>
        </TabsContent>
      </Tabs>
    </Example>,
    <Example
      number="04"
      title="Avatar group"
      description="Show the people behind a shared workspace."
    >
      <div className="elements-avatar-layout">
        <AvatarGroup>
          <Avatar size="lg">
            <AvatarFallback tone="accent">AM</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback tone="success">JK</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback tone="warning">RL</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
        <div className="elements-avatar-copy">
          <strong>Design team</strong>
          <span>7 members · 3 online</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Users size={14} />}
          onClick={() => setInvited(true)}
          disabled={invited}
        >
          {invited ? "Added locally" : "Add member"}
        </Button>
      </div>
      <p className="elements-feedback" aria-live="polite">
        {invited ? "A sample teammate was added in this demo." : ""}
      </p>
    </Example>,
    <Example
      number="05"
      title="Accordion"
      description="Reveal details in place, without leaving the flow."
    >
      <Accordion className="elements-accordion" defaultValue={["scope"]}>
        <AccordionItem value="scope">
          <AccordionTrigger>What is included?</AccordionTrigger>
          <AccordionContent>
            Shared UI components, tokens, and interaction patterns for the
            product team.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="access">
          <AccordionTrigger>Who can access this?</AccordionTrigger>
          <AccordionContent>
            Workspace members with access to the project can view and
            contribute.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>,
    <Example
      number="06"
      title="Alert"
      description="Important updates are visible and specific."
    >
      <Alert className="elements-alert" variant="default">
        <Bell size={16} />
        <div>
          <AlertTitle>
            {reviewOpened ? "Review opened" : "Review requested"}
          </AlertTitle>
          <AlertDescription>
            {reviewOpened
              ? "The three pending changes are ready to inspect."
              : "Three changes are waiting for your feedback."}
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Open review"
          onClick={() => setReviewOpened(true)}
          icon={<ArrowUpRight size={15} />}
        />
      </Alert>
    </Example>,
    <Example
      number="07"
      title="Progress"
      description="A quick read on completion, with its value stated."
    >
      <div className="elements-progress-head">
        <span>Workspace setup</span>
        <strong>75%</strong>
      </div>
      <Progress value={75} aria-label="Workspace setup: 75% complete" />
      <div className="elements-progress-foot">
        <span>9 of 12 steps complete</span>
        <span>3 remaining</span>
      </div>
    </Example>,
    <Example
      number="08"
      title="Slider"
      description="Adjust a value directly and see the result."
    >
      <div className="elements-slider-head">
        <span>Alert threshold</span>
        <strong>{score}%</strong>
      </div>
      <Slider
        aria-label="Alert threshold"
        min={0}
        max={100}
        step={1}
        value={score}
        onValueChange={(value) =>
          setScore(Array.isArray(value) ? value[0] : value)
        }
      />
      <div className="elements-slider-scale">
        <span>Low</span>
        <span>High</span>
      </div>
    </Example>,
    <Example
      number="09"
      title="Switch"
      description="A binary preference with an explicit label."
    >
      <label className="elements-setting">
        <span className="elements-setting-icon">
          <Bell size={16} />
        </span>
        <span className="elements-setting-copy">
          <strong>Email notifications</strong>
          <small>Get a summary of important activity</small>
        </span>
        <Switch
          checked={notifications}
          onCheckedChange={setNotifications}
          aria-label="Email notifications"
        />
      </label>
      <p className="elements-feedback">
        Notifications are {notifications ? "on" : "off"}.
      </p>
    </Example>,
    <Example
      number="10"
      title="Checkbox"
      description="Select optional items in a task list."
    >
      <label className="elements-check-row">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <span>
          <strong>Notify teammates</strong>
          <small>Let the project group know when this is published.</small>
        </span>
      </label>
      <label className="elements-check-row">
        <Checkbox />
        <span>
          <strong>Include a summary</strong>
          <small>Add a short overview to the update.</small>
        </span>
      </label>
    </Example>,
    <Example
      number="11"
      title="Radio group"
      description="Choose one option from a small set."
    >
      <RadioGroup
        className="elements-radio-list"
        value={radio}
        onValueChange={(value) => setRadio(String(value))}
        aria-label="Report frequency"
      >
        <label className="elements-radio-option">
          <RadioGroupItem value="daily" />
          <span>Daily</span>
        </label>
        <label className="elements-radio-option">
          <RadioGroupItem value="weekly" />
          <span>Weekly</span>
          <small>Recommended</small>
        </label>
        <label className="elements-radio-option">
          <RadioGroupItem value="monthly" />
          <span>Monthly</span>
        </label>
      </RadioGroup>
    </Example>,
    <Example
      number="12"
      title="Input"
      description="A labelled field with a helpful leading icon."
    >
      <label className="elements-field">
        <span>Workspace name</span>
        <div className="elements-input-wrap">
          <Layers size={15} />
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Product design"
          />
        </div>
        <small>
          {name.length
            ? `${name.length} characters`
            : "Choose a name your team will recognize."}
        </small>
      </label>
    </Example>,
    <Example
      number="13"
      title="Textarea"
      description="A comfortable space for a short note."
    >
      <label className="elements-field">
        <span>Release note</span>
        <Textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={240}
          rows={3}
          placeholder="Share what changed…"
        />
        <small>{note.length} / 240 characters</small>
      </label>
    </Example>,
    <Example
      number="14"
      title="Select"
      description="A compact choice list that works with the keyboard."
    >
      <label className="elements-field">
        <span>Default landing page</span>
        <Select
          value={choice}
          onValueChange={(value) => setChoice(String(value))}
          items={[
            { value: "product", label: "Product overview" },
            { value: "activity", label: "Recent activity" },
            { value: "documents", label: "Documents" },
          ]}
        >
          <SelectTrigger aria-label="Default landing page">
            <SelectValue placeholder="Choose a page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="product">Product overview</SelectItem>
            <SelectItem value="activity">Recent activity</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
          </SelectContent>
        </Select>
        <small>Opens when you enter the workspace.</small>
      </label>
    </Example>,
    <Example
      number="15"
      title="Dropdown menu"
      description="Group related commands beside the thing they affect."
    >
      <div className="elements-menu-demo">
        <span className="elements-menu-icon">
          <Layers size={16} />
        </span>
        <span className="elements-menu-copy">
          <strong>Q3 launch plan</strong>
          <small>Updated 2 hours ago</small>
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                icon={<MoreHorizontal size={16} />}
                aria-label="Plan actions"
              />
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Plan actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopyLink}>
                Copy showcase link
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setMenuAction("Settings selected for the sample plan")
                }
              >
                Open settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setMenuAction("Sample plan archived in this demo")
                }
              >
                Archive plan
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="elements-feedback" aria-live="polite">
        {menuAction}
      </p>
    </Example>,
    <Example
      number="16"
      title="Dialog"
      description="Keep a focused decision in a contained overlay."
    >
      <div className="elements-dialog-demo">
        <span className="elements-dialog-icon">
          <LockKeyhole size={18} />
        </span>
        <span>
          <strong>Workspace access</strong>
          <small>{accessFeedback}</small>
        </span>
        <Dialog open={accessDialogOpen} onOpenChange={setAccessDialogOpen}>
          <DialogTrigger
            render={
              <Button variant="outline" size="sm">
                Manage
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Workspace access</DialogTitle>
              <DialogDescription>
                Save a local sample access entry. Nothing is sent or changed
                outside this demo.
              </DialogDescription>
            </DialogHeader>
            <form
              className="elements-dialog-content"
              onSubmit={(event) => {
                event.preventDefault();
                setAccessFeedback(`${accessEmail} added in this demo`);
                setAccessDialogOpen(false);
              }}
            >
              <label className="elements-field">
                <span>Email address</span>
                <Input
                  type="email"
                  value={accessEmail}
                  onChange={(event) => setAccessEmail(event.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </label>
              <Badge variant="secondary">Sample role · Editor</Badge>
              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setAccessDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save locally</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Example>,
    <Example
      number="17"
      title="Tooltip"
      description="Offer a little context at the point of use."
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                icon={<CircleHelp size={15} />}
              >
                About this metric
              </Button>
            }
          />
          <TooltipContent side="top">
            Active members who visited this week
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p className="elements-feedback">
        Hover, focus, or activate the control for context.
      </p>
    </Example>,
    <Example
      number="18"
      title="Popover"
      description="Show a small contextual panel without a full dialog."
    >
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm" icon={<Filter size={15} />}>
              Filters <ChevronDown size={14} />
            </Button>
          }
        />
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Filter activity</PopoverTitle>
            <PopoverDescription>
              {filtersApplied
                ? `Applied: ${selectedFilterSummary}.`
                : "Choose which updates to show."}
            </PopoverDescription>
          </PopoverHeader>
          <div className="elements-popover-options">
            <label>
              <Checkbox
                checked={filterChoices.products}
                onCheckedChange={(value) =>
                  setFilterChoices((current) => ({
                    ...current,
                    products: value === true,
                  }))
                }
              />{" "}
              Product updates
            </label>
            <label>
              <Checkbox
                checked={filterChoices.team}
                onCheckedChange={(value) =>
                  setFilterChoices((current) => ({
                    ...current,
                    team: value === true,
                  }))
                }
              />{" "}
              Team activity
            </label>
            <label>
              <Checkbox
                checked={filterChoices.comments}
                onCheckedChange={(value) =>
                  setFilterChoices((current) => ({
                    ...current,
                    comments: value === true,
                  }))
                }
              />{" "}
              Comments
            </label>
          </div>
          <Button size="sm" onClick={() => setFiltersApplied(true)}>
            {filtersApplied ? "Update filters" : "Apply filters"}
          </Button>
        </PopoverContent>
      </Popover>
    </Example>,
    <Example
      number="19"
      title="Skeleton"
      description="A calm loading preview that can resolve on demand."
    >
      {loaded ? (
        <div className="elements-loaded">
          <div className="elements-loaded-icon">
            <Check size={18} />
          </div>
          <div>
            <strong>Workspace overview</strong>
            <span>Your latest project summary is ready.</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setLoaded(false)}>
            Reload
          </Button>
        </div>
      ) : (
        <div className="elements-skeleton-layout">
          <Skeleton className="elements-skeleton-avatar" />
          <div className="elements-skeleton-copy">
            <Skeleton className="elements-skeleton-line" />
            <Skeleton className="elements-skeleton-short" />
          </div>
          <Skeleton className="elements-skeleton-block" />
        </div>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLoaded((value) => !value)}
      >
        {loaded ? "Show loading state" : "Load preview"}
      </Button>
    </Example>,
    <Example
      number="20"
      title="Table"
      description="Structured data stays readable and scannable."
    >
      <label className="elements-table-search">
        <Search size={14} />
        <Input
          aria-label="Search recent activity"
          value={tableQuery}
          onChange={(event) => setTableQuery(event.target.value)}
          placeholder="Search projects or owners"
        />
      </label>
      <Table
        label="Recent workspace activity"
        density="compact"
        className="elements-table"
      >
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                className="elements-sort-button"
                variant="ghost"
                size="sm"
                onClick={() => setTableAscending((value) => !value)}
                aria-label={`Sort projects ${tableAscending ? "descending" : "ascending"}`}
              >
                Project{" "}
                {tableAscending ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowUpDown size={12} />
                )}
              </Button>
            </TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activityRows.map((row) => (
            <TableRow key={row.project}>
              <TableCell>{row.project}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>
                <Badge
                  className={`elements-status-${row.tone}`}
                  variant={row.tone}
                  dot
                >
                  {row.state}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {activityRows.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>No matching activity.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Example>,
  ];

  return (
    <section className="elements-page" aria-label="Component examples">
      <div className="elements-intro">
        <div className="elements-intro-meta">
          <span>20 components</span>
          <span className="elements-meta-dot">·</span>
          <span>Interactive examples</span>
        </div>
      </div>
      <div className="elements-grid">
        {examples.map((example, index) => (
          <div className="elements-grid-item" key={index}>
            {example}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Elements;
