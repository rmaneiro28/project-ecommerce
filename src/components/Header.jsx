import Location from "../assets/Location.svg";
import "./../components/__header.scss";
import Instagram from "../assets/Instagram.svg";
import WhatsApp from "../assets/WhatsApp.svg";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

export function Header() {
    return (
        <header className="header">
            <section className="header-main">
                <Link to="/">
                    <div className="header-main-logo">
                        <img src={Logo} alt="Oterventas" title="Oterventas" className="logo" />

                    </div>
                </Link>

                <div className="header-main-info">
                    <h1 className="header--main-info-title">
                        Oterventas
                    </h1>
                    <a className="header-main-info-location" href="https://maps.app.goo.gl/GkeYeFrtANz31Dov7" target="blank">
                        <img src={Location} alt="" />
                        <p>La Urbina</p>
                    </a>
                </div>
            </section>

            <section className="header-redes">
                <div className="instagram redes">
                    <a href="https://instagram.com/oterventas" target="blank">
                        <p>@oterventas  </p>
                        <img src={Instagram} alt="" />
                    </a>
                </div>
                <div className="whatsApp redes">
                    <a href="https://wa.me/+584166124494" target="blank">
                        <p>+58-416-612-4494</p>
                        <img src={WhatsApp} alt="" />
                    </a>
                </div>
            </section>
        </header>
    )
}