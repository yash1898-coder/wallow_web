import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./scss/main.scss"
import { BrowserRouter as Router } from "react-router-dom"
import { ScrollToTop } from "./components/ScrollToTop"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <ScrollToTop />
            <App />
        </Router>
    </QueryClientProvider>
)
