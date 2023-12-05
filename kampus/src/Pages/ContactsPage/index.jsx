import NavBar from "../../Components/Navbar/NavBar";

function ContactsPage() {
  return (
    <div>
      <NavBar />
      <h1>Hi Contacts Page</h1>
      <div id="staff-member">
        <p>FirstName LastName</p>
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="staffPhoto"
          style={{ width: "100px" }}
        />
        <p>Contact/way to reach out</p>
      </div>
      <div id="staff-member">
        <p>FirstName LastName</p>
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="staffPhoto"
          style={{ width: "100px" }}
        />
        <p>Contact/way to reach out</p>
      </div>
      <div id="staff-member">
        <p>FirstName LastName</p>
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="staffPhoto"
          style={{ width: "100px" }}
        />
        <p>email</p>
      </div>
    </div>
  );
}

export default ContactsPage;
