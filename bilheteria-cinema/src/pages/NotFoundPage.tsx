import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="px-6 py-24 flex flex-col items-center text-center">
      <span className="text-7xl font-bold text-red-600 mb-4">404</span>
      <h1 className="text-2xl font-bold mb-2">Página não encontrada</h1>
      <p className="text-gray-400 text-sm mb-8 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFoundPage;
