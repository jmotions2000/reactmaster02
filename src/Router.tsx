import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}>
          Coins
        </Route>
        <Route path="/:coinId" element={<Coin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
//아래는 createBrowserRouter----

// import { createBrowserRouter } from "react-router-dom";
// import About from "./screens/About";
// import Home from "./screens/Home";
// import Root from "./Root";
// import NotFound from "./screens/NotFound";
// import User from "./screens/users/User";
// import Followers from "./screens/users/Followers";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "users/:userId",
//         element: <User />,
//         children: [
//           {
//             path: "followers",
//             element: <Followers />,
//           },
//         ],
//       },
//     ],
//     errorElement: <NotFound />,
//   },
// ]);

// export default router;
