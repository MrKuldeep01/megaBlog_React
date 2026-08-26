import { Link } from "react-router-dom";
import { Container, Logo } from "../common";

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="font-semibold text-slate-800">Kuldeep Kumar</p>
              <p>&copy; {new Date().getFullYear()} Our Mini Media</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              className="hover:text-slate-800 transition-colors"
              to="https://github.com/MrKuldeep01/megaBlog_React"
              title="GitHub"
            >
              <i className="ri-github-fill text-lg"></i>
            </Link>
            <Link
              className="hover:text-slate-800 transition-colors"
              to="https://www.linkedin.com/in/kuldeep-kumar-a4b71a258/"
              title="LinkedIn"
            >
              <i className="ri-linkedin-box-fill text-lg"></i>
            </Link>
            <Link
              className="hover:text-slate-800 transition-colors"
              to="mailto:kkharoliya20@gmail.com"
              title="Email"
            >
              <i className="ri-mail-send-line text-lg"></i>
            </Link>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">Rohtak, Haryana, India</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
