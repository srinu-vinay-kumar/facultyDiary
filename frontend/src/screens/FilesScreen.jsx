import { Link } from "react-router-dom";
import Header from "../components/Header";
import Files from "../components/Files/Files";
import FilesList from "../components/Files/FilesList";

const FilesScreen = () => {
  return (
    <>
      <Header />

      <h1>Store your Files here.</h1>

      <Link to="/files" exact={true}>
        Home
      </Link>
      <Link to="/list">Files List</Link>

      <Files />
      <FilesList />
    </>
  );
};

export default FilesScreen;
