import { socialLinks } from '../constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Términos y Condiciones</p>
        <p>|</p>
        <p>Política de Privacidad</p>
      </div>

      <div className="flex gap-3">
        {socialLinks.map(({ id, href, icon, name }) => (
          <a key={id} href={href} target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src={icon} alt={name} className="w-1/2 h-1/2" />
          </a>
        ))}
      </div>

      <p className="text-white-500">© {currentYear} Mariano Bonansea. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;