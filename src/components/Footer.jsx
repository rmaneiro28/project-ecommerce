import React from 'react'
import Instagram from "../assets/Instagram.svg";
import Location from "../assets/Location.svg";
import WhatsApp from "../assets/WhatsApp.svg";
import "./../components/__footer.scss";
export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">E-Commerce Oterventas. | © 2024.  <a href="https://rmaneiro.netlify.app/">Desarrollado por Rúbel Maneiro</a></p>
            <div className="footer-redes">
                <a className="footer-dir" href="https://maps.app.goo.gl/GkeYeFrtANz31Dov7" target="blank">
                    <img src={Location} alt="" />
                    <span>Av. Principal - La Urbina | Venezuela</span>
                </a>
                <a href="https://instagram.com/nike" target="blank">
                    <img src={Instagram} alt="" />
                    <span>@oterventas</span>
                </a>

                <a href="https://wa.me/+584166124494" target="blank">
                    <img src={WhatsApp} alt="" />
                    <span>+58 416 612 4494</span>
                </a>

            </div>
        </footer>
    )
}
