import WayneLogo from '../assets/wayneLogo';
export default function Hero(){
return(
<section className="relative overflow-hidden rounded-[32px] border border-violet-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-12 shadow-2xl">
<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,#7c3aed,transparent_55%)]"/>
<div className="relative z-10 text-center">
<WayneLogo className="mx-auto w-28 text-white drop-shadow-[0_0_25px_#8b5cf6]" />
<h1 className="mt-6 text-6xl font-black tracking-tight">WAYNE</h1>
<p className="mt-4 text-slate-300 text-xl">Onde você quer chegar?</p>
</div>
</section>);
}