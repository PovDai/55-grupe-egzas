import { useContext } from 'react'
import { TitlePage } from '../../components/Title'
import { UserContext } from '../../context/user/UserContext'
import { Link, useNavigate } from 'react-router';
import { LoginForm } from '../../components/forms/LoginForm';

export function LoginPage() {
    const { isLoggedIn } = useContext(UserContext);


    
    return (
        <>
            <TitlePage title="Prisijungti" />

      <div className="container">
                <div className="row">
                    {
                        isLoggedIn
                            ? <>
                                <p>Einamuoju metu prie sistemos prisijunge vartotojai negali prisijungti prie kitos paskyros. Noredami ta atlikti - atsijunkite nuo dabartines paskyros.</p>
                                <div className="d-flex gap-3">
                                    <Link to='/logout' className="btn btn-primary">Atsijungti</Link>
                                    or
                                    <Link to='/admin' className="btn btn-primary">Eiti i admin-dalis</Link>
                                </div>
                            </>
                            : <LoginForm />
                    }
                </div>
            </div>
    </>
    );
}
     