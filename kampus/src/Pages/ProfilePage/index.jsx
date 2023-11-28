import NavBar from '../../Components/NavBar';

function ProfilePage(){
    return(
        <div>
            <NavBar/>
            <h1>Hi Profile Page</h1>
            <div>
                <div>
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Student Photo" style={{ width: '200px'}}/>
                    <div>
                        <h3>StudentName</h3>
                        <p>Student Cohort Year Campus</p>
                    </div>
                </div>
                <form>
                    <input type="string" name="firstName" placeholder="First Name"></input>
                    <input type="string" name="lastName" placeholder="Last Name"></input>
                    <input type="email" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="password"></input>
                    <input type="cohort" name="cohort" placeholder="Cohort" readOnly style={{ backgroundColor: 'Gainsboro'}}></input>
                    <input type="campus" name="campus" placeholder="Campus" readOnly style={{ backgroundColor: 'Gainsboro'}}></input>
                </form>
            </div>
        </div>
    )
}
export default ProfilePage