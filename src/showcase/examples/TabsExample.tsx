import { Tabs, TabsList, TabsTrigger, TabsContent } from '@gears-frontx/ui-kit';
import '@gears-frontx/ui-kit/theme.css';

export default function TabsExample({ disabled = false }: { disabled?: boolean }) {
  return <Tabs defaultValue="overview">
    <TabsList aria-label="Project views">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      <TabsTrigger value="settings" disabled={disabled}>Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">Your project overview.</TabsContent>
    <TabsContent value="activity">Three updates today.</TabsContent>
    <TabsContent value="settings">Project settings.</TabsContent>
  </Tabs>;
}
