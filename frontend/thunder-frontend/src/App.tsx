import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="grid place-items-center text-4xl h-screen bg-speedline">
            Vite is awesome !!
          </div>
      </ThemeProvider>
    </>
  );
}

export default App;
