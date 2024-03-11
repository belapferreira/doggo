import { Header } from './components/Header';

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-200">
      <Header />

      <main className="mx-auto flex max-w-[1352px] flex-col gap-10 p-6 pb-10">
        <h1 className="text-center text-3xl font-bold">Doggo</h1>
      </main>
    </div>
  );
}

export default App;
