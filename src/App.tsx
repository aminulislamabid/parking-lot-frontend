import { useState } from "react";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import Manager from "./view/page/manager/manager.page";
import User from "./view/page/user/user.page";

function App() {
  const savedMode = localStorage.getItem("mode");
  const [mode, setMode] = useState(savedMode || "user");

  const handleModeChange = (newMode: string) => {
    const mode = newMode === "user" ? "manager" : "user";
    setMode(mode);
    localStorage.setItem("mode", mode);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="container my-8">
        <div className="flex justify-between items-center">
          <Button
            className="font-semibold text-white"
            onClick={() => handleModeChange(mode)}
          >
            Switch to {mode === "user" ? "Manager" : "User"}
          </Button>
          <ModeToggle />
        </div>

        {mode === "user" ? <User /> : <Manager />}
      </main>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
