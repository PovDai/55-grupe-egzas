import { Link, useNavigate } from "react-router";

import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { TitlePage } from "../../components/Title";

export function LogoutPage() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(UserContext);

    function handleLogoutClick() {
        logout();

        setTimeout(() => {
            navigate('/');
        }, 3000);
    }

    return (
        <main className="min-page-height">
            <TitlePage       title="Atsijungti" />
            <div className="container">
                <div className="row">
                    {
                        isLoggedIn
                            ? <div className="col-12">
                                <p>Ar tikrai norite atsijungti nuo sistemos?</p>
                                <button onClick={handleLogoutClick} className="btn btn-primary">Atsijungti</button>
                            </div>
                            : <div className="col-12">
                                <p>Jus jau esate atsijunge nuo sistemos!</p>
                                <Link to='/' className="btn btn-primary">Eiti į pradinį puslapį</Link>
                            </div>
                    }
                </div>
            </div>
        </main>
    );
}