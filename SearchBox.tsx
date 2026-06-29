type Props={onSearch?:()=>void}
export default function SearchBox({onSearch}:Props){
return(
<div className="mt-8 flex gap-3 max-w-3xl mx-auto">
<input className="flex-1 rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5 text-lg outline-none focus:border-violet-500" placeholder="Ex.: Quero trabalhar com Power BI"/>
<button onClick={onSearch} className="rounded-2xl bg-violet-600 hover:bg-violet-500 px-8 font-bold">Pesquisar</button>
</div>);
}