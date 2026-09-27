import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="app-root">
      <Header />
      <div className="app-shell">
        <Sidebar />
        <div className="main-col">
          <div className="page-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
