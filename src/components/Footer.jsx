const Footer = () => (
    <footer title="Footer" className="bg-dark text-light d-flex flex-column gap-2 justify-content-around align-items-center py-5 m-0">
        <p className="m-0 p-1">
            &copy; 2024 Pokédex Website. All rights reserved under <a href="https://github.com/PowerLevel9000/pokemon-dashboard-plus/blob/dev/LICENSE" target="_blank" rel="noopener noreferrer">
                GNU License.
            </a>
        </p>
        <a className="text-danger" href="https://www.buymeacoffee.com/adi8090808e" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="buy me coffee" />
        </a>
        <p className="m-0 p-1">Design by
            {' '}
            <a href="http://github.com/powerlevel9000" target="_blank" rel="noopener noreferrer">Adarsh Pathak</a>
        </p>
    </footer>
);

export default Footer;