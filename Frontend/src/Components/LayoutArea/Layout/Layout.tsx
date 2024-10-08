import "./Layout.css";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";

export function Layout(): JSX.Element {

    /* 
    Layout Design -
        * main layout rendered by the <Provider> in index.ts.
        * Layout component - is a flex element, taking 100vh of the screen,
          designed to let the nav take as much space as it can, and the content
          to take whats left.

        * main-content - takes exactly the amount left with flex-grow-1,
          to allow the navbar extension on small screens.
    */
    return (
        <div className="Layout">
			<nav className="header">
                <Menu />
            </nav>

            <main className="main-content">
                <Routing />
            </main>
        </div>
    );
}
