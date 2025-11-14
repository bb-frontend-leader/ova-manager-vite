import { SignOut } from '../app';

export const Header = () => {
  return (
    <header className="w-full h-16 border-b-4 border-border bg-white flex justify-start items-center gap-4">
      <nav className="border-r-4 border-border h-full flex items-center px-3.5">
        <a href="/" className="border-2 border-black bg-main px-3 py-2 rounded-md text-xl font-bold flex items-center">
          <span className="hidden sm:inline">BOOKS&BOOKS</span>
          <span className="sm:hidden">B&B</span>
        </a>
      </nav>
      <div className="flex items-center justify-between gap-2 pr-2 w-full">
        <h1 className="text-2xl font-bold text-black" aria-label="120 OVAS 2023">
          <strong className="text-main">120</strong> OVAS 2023
        </h1>
        <SignOut />
      </div>
    </header>
  );
};
