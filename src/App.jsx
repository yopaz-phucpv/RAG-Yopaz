import "./App.css"
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import { IndexRouter } from "./providers/RouteProvider";
import QueryProvider from "./providers/QueryProvider";
import { TemplateProvider } from "./providers/TemplateProvider/TemplateProvider";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <TemplateProvider>
            <IndexRouter />
          </TemplateProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;