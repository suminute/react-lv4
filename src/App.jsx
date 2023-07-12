import { QueryClientProvider, QueryClient } from "react-query";
import "./App.css";
import Router from "./shared/Router";
import { useEffect } from "react";

const queryClient = new QueryClient();
function App() {
  useEffect(() => {
    if (localStorage.getItem("expirationTime")) {
      // const currentTime = new Date().toUTCString();
      // const expirationTime = localStorage.getItem("expirationTime");
      // const a = currentTime.split(" ")[4];
      // const b = expirationTime.split(" ")[4];
      // console.log(a);
      // console.log(b);
      // const remainTime = expirationTime - currentTime;
      // console.log(currentTime);
      // console.log(expirationTime);
      // console.log(remainTime);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
