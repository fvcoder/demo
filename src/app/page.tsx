import { Container } from "@/components/ui/container";

import { DemoList } from "./list";

export default function Home() {
  return (
    <Container className="space-y-4 py-4">
      <header className="">
        <h1 className="font-heading text-2xl font-semibold">Demo de fvcoder</h1>
        <p className="text-muted">Explora las funcionalidades disponibles en esta demo.</p>
      </header>
      <main>
        <DemoList />
      </main>
    </Container>
  );
}
