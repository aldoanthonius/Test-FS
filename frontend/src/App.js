import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import AddArticle from "./components/AddArticle";
import EditArticle from "./components/EditArticle";
import Preview from "./components/Preview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/add" element={<AddArticle />} />
        <Route path="/edit/:id" element={<EditArticle />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;
