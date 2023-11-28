import NavBar from '../../Components/Navbar/NavBar';
import Pommodoro from '../../Components/Pommodoro';

function DashboardPage(){
    return(
        <div>
            <NavBar/>
            <h1>Hi Dashboard page</h1>
            <div>
                <p>To put Todo List component</p>
                <p>To put Todo NotePad component</p>
                <p>To put Todo Pommodoro component</p>
                <Pommodoro/>
            </div>
        </div>
    )
}
export default DashboardPage