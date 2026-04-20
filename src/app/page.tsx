import { HeaderTitle } from "@/components/header";
import { Container } from "@/components/ui/container";

import { DemoList } from "./list";

export default function Home() {
  return (
    <Container className="space-y-4 py-4">
      <HeaderTitle title="Demo de fvcoder" subtitle="Explora las funcionalidades disponibles en esta demo." />
      <main>
        <DemoList />
      </main>
    </Container>
  );
}
