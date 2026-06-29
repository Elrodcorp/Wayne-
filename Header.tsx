export default function Header(){
return(
<header className="flex justify-between items-center py-6">
<div className="font-bold text-xl">Wayne</div>
<nav className="flex gap-6 text-slate-300">
<a>Pesquisar</a><a>Carreiras</a><a>Cursos</a>
</nav>
</header>);
}