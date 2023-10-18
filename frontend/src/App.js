// import "./App.css";

import Example from "./components/Example";
import Header from "./components/Header";
import Input from "./components/Input";

// function App() {
//   return (
//     <div className="App">
//       <h1>Aurora</h1>
//     </div>
//   );
// }

// export default App;

export default function App() {
  return (
    <div className="App bg-white pt-16 w-full h-screen">
      <Header />
      <div className="flex w-full h-screen justify-center">
        <Input />
      </div>
    </div>
  );
}
