import "./styles/App.css";
import ExpensesView from "./components/ExpensesView";
import Header from "./components/Header";
import ContextProvider from "./ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Header />
      <ExpensesView />
    </ContextProvider>
  );
}

export default App;
