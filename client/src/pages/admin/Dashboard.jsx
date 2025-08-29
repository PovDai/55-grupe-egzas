import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
export function Dashboard() {

    const {email,role}=useContext(UserContext)

    return (
        <main>
            <div className="container">
                <div className="row col-12">
                        <h5>Sveiki atvyke į administravimo puslapy </h5>
                        <p>Esate prisijunge kaip: {role}</p>
                        <p>Jūsų prisijungimo email: {email}</p>
                    
                    </div>
            </div>
        </main>
    );
}

