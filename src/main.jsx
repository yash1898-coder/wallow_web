import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./scss/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useSelector } from "react-redux";
import Store from "../src/components/Store/Index";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});



ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={Store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>
  </QueryClientProvider>
);
